import { Hono } from "hono";
import { env } from "hono/adapter";
import { Glob } from "bun";
import sharp from "sharp";
import { unlink, mkdir, access, readFile } from "node:fs/promises";
import config from "@config";
import { nanoid, customAlphabet } from "nanoid";
import JSZip from "jszip";

// utils
import { handleError, res, throwErr } from "@util/response";
import {
	getLastFolderName,
	getFileContents,
	getComponentContent,
} from "@util/files";
import { chatGPT } from "@util/models/chatGPT";

// import { groq } from "@util/models/groq";
// import { Glob } from "bun";
// import { extractTSXContent, getImports } from "@util/tsx";
// import { parseJsonFile, parsePkgJsonFile } from "@util/files/parse";

const routes = new Hono();

routes.get("/test", async (c) => {
	// const name = c.req.param("name");
	// const body = await c.req.json();
	return res(c, { msg: "hello world" });
});

routes.post("/list", async (c) => {
	let list = [];
	const glob = new Glob("*");
	// Scans the current working directory and each of its sub-directories recursively
	for await (const file of glob.scan("./data/photos")) {
		// console.log(file); // => "index.ts"
		list.push(file);
	}
	return res(c, { list });
});

// routes.post("/upload", async (c) => {
// 	const body = await c.req.parseBody();
// 	const { name, size, type } = body;
// 	const path = `./data/photos/${name}`;
// 	await Bun.write(path, body.file);
// 	return res(c);
// });

routes.post("/upload", async (c) => {
	const body = await c.req.parseBody();
	if (!body.project_id) return throwErr(c, "Must have project_id");
	const { name, size, type, project_id } = body;
	const path = `./data/photos/${project_id}/${name}`;
	await Bun.write(path, body.file);
	let matches = await dbFiles.getProjectFile(project_id, name);
	let file;
	console.log("matches", matches);
	if (matches.length == 0) {
		file = await dbFiles.insert({
			project_id: project_id,
			created_by: body.uid,
			path: path,
			name,
			size,
			type,
		});
		console.log("created file", name);
	} else {
		file = await dbFiles.update(matches[0].id, {
			project_id: project_id,
			created_by: body.uid,
			path: path,
			name,
			size,
			type,
		});
		console.log("updated file", name);
	}
	return res(c, { file });
});



routes.get("/get/:filename/:size", async (c) => {
	const filename = c.req.param("filename");
	const size = c.req.param("size");
	const path = `./data/photos/${filename}`;
	const cacheDir = `./data/cache/photos/${size}`;
	const cachePath = `${cacheDir}/${filename}.webp`;

	await mkdir(cacheDir, { recursive: true });

	// Check if the resized image already exists in the cache
	try {
		await access(cachePath);
		const cachedFile = Bun.file(cachePath);
		return new Response(cachedFile);
	} catch (err) {
		// File doesn't exist in cache, continue to resize
	}

	// If the original file does not exist, return a 404 error
	try {
		await access(path);
	} catch (err) {
		return new Response("File not found", { status: 404 });
	}

	if (size == "original") {
		let file = Bun.file(path);
		return new Response(file);
	}

	let file = Bun.file(path);
	if (file.type.startsWith("image")) {
		// Resize the image and convert it to webp format
		const resizedImageBuffer = await sharp(path)
			.resize(Number(size)) // Example dimensions, adjust as needed
			.webp()
			.toBuffer();

		// Store the resized image in the cache
		await Bun.write(cachePath, resizedImageBuffer);

		// Serve the resized image
		return new Response(resizedImageBuffer, {
			headers: { "Content-Type": "image/webp" },
		});
	} else {
		return new Response(file);
	}
});

routes.post("/update/:filename", async (c) => {
	const body = await c.req.json();
	const filename = c.req.param("filename");
	return res(c, { filename, body });
});

routes.post("/delete", async (c) => {
	const body = await c.req.json();

	// Map each filename to a promise and run in parallel using Promise.all
	const deletePromises = body.files.map(async (filename) => {
		const cacheDir350 = `./data/cache/photos/350/${filename}.webp`;
		const cacheDir1080 = `./data/cache/photos/1080/${filename}.webp`;
		const path = `./data/photos/${filename}`;
		try {
			// Run unlink for both original and cache files
			await unlink(path);
			await unlink(cacheDir350);
			await unlink(cacheDir1080);
		} catch (error) {
			// Handle errors, you could log them if necessary
			console.error(`Error deleting file ${filename}:`, error);
		}
	});

	// Wait for all deletions to complete
	await Promise.all(deletePromises);

	return res(c);
});

export default routes;
