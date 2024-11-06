import { Hono } from "hono";
import { env } from "hono/adapter";
import config from "@config";
// import { nanoid, customAlphabet } from "nanoid";
// utils
import { handleError, res, throwErr } from "@util/response";
import {
	getLastFolderName,
	getFileContents,
	getComponentContent,
} from "@util/files";
import { chatGPT } from "@util/models/chatGPT";
import { groq } from "@util/models/groq";
import { Glob } from "bun";
import { extractTSXContent, getImports } from "@util/tsx";
import { parseJsonFile, parsePkgJsonFile } from "@util/files/parse";

const routes = new Hono();

routes.post("/chat", async (c) => {
	const body = await c.req.json();
	const chat = await chatGPT({
		prompt: body.prompt || "hi",
	});
	return res(c, { msg: chat });
});

routes.get("/test", async (c) => {
	const chat = await chatGPT({
		prompt: "hi",
	});
	return res(c, { msg: chat });
});

routes.get("/components/paths", async (c) => {
	const glob = new Glob("**/index.tsx");
	let components = {};
	for await (const file of glob.scan("../web/src")) {
		let name = getLastFolderName(file);
		components[name] = file;
	}
	return res(c, { components });
});

routes.get("/components/:name", async (c) => {
	const name = c.req.param("name");
	let content = await getComponentContent(name);
	return res(c, { content });
});

routes.post("/components/:name/fix", async (c) => {
	const body = await c.req.json();
	const name = c.req.param("name");
	if (body.error == null) return throwErr("Error message missing");
	let componentContent = await getComponentContent(name);
	const chat = await groq({
		prompt: `
		Fix the provided error that needs to be fixed. Explain how I can fix it, think step by step.

		Error that needs to be fixed:
		${body.error}
		
		Component code for "${name}":
		${componentContent}
		
		Props sent to the component:
		${body.props || "null"}
		`,
	});
	return res(c, { msg: chat });
});

routes.post("/components/:name/applyfix", async (c) => {
	const body = await c.req.json();
	const name = c.req.param("name");
	if (body.error == null) return throwErr("Error message missing");

	const glob = new Glob("**/index.tsx");
	let components = {};
	for await (const file of glob.scan("../web/src")) {
		let name = getLastFolderName(file);
		components[name] = file;
	}

	let componentContent = await getComponentContent(name);
	const chat = await groq({
		prompt: `
		Fix the provided error that needs to be fixed. Only provide all of the new component code in tsx with the fixes applied. make sure to have the correct imports. no explainations. Only code directly.

		Error that needs to be fixed:
		${body.error}
		
		Component code for "${name}":
		${componentContent}
		
		Props sent to the component:
		${body.props || "null"}

		Suggested steps to fix:
		${body.fixSteps}
		`,
	});
	Bun.write(
		`${config.projectDir}/${components[name]}`,
		extractTSXContent(chat)
	);
	return res(c, { msg: chat });
});

routes.get("/components/:name/imports", async (c) => {
	const name = c.req.param("name");
	let content = await getComponentContent(name);
	let imports = await getImports(content);
	return res(c, { imports });
});

// routes.get("/import/file", async (c) => {
// 	const module = await import("@components/Link");
// 	console.log(module);
// 	return res(c, {});
// });

routes.get("/test/parse", async (c) => {
	let test = await parsePkgJsonFile(".");
	console.log(test);
	return res(c, { test });
});

export default routes;
