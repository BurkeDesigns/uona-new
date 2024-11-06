import chokidar from "chokidar";
import { debounce } from "@util/debounce";

// Path to the folder you want to watch
const folderPath = "./src/components/**/index.tsx";

// Initialize chokidar watcher
const watcher = chokidar.watch(folderPath, {
	ignored: [/(^|[\/\\])\../, /node_modules/, /^.*\/_.*$/], // ignore dotfiles, node_modules, and files starting with "_"
	persistent: true,
});

// Function to list all files in the directory
const listFiles = (path) => {
	// console.log(`File: ${path}`);
	let files = watcher.getWatched();
	let arr = [];
	let imports = [];
	let blocks = [];
	for (const key in files) {
		let name = key.split("/").pop();
		let path = key.split("/web/src/components/").pop();
		// console.log(name);
		if (!ignore[name]) {
			let exportSnippet = `export {default as ${name}} from '@components/${path}'`;
			arr.push(exportSnippet);
			imports.push(`import ${name} from '@components/${path}'`);
			blocks.push(name);
		}
	}
	let contents = arr.join("\n");
	Bun.write("./src/components/BlockMapper/_BlockList.tsx", contents);
	console.log("\x1b[32m", "Updated: ", "\x1b[0m", "_BlockList.tsx");

	Bun.write(
		"./src/components/BlockMapper/_BlockMap.tsx",
		`${imports.join("\n")}\n\nconst blockMap = {\n    ${blocks.join(",\n    ")}\n};\n\nexport default blockMap;`
	);
	console.log("\x1b[32m", "Updated: ", "\x1b[0m", "_BlockMap.tsx");
};

const callListFiles = debounce(listFiles, 50);

const ignore = {
	BlockMapper: true,
};

// Call listFiles on relevant events
watcher
	.on("add", callListFiles)
	.on("change", callListFiles)
	.on("unlink", callListFiles);

// Log any errors
watcher.on("error", (error) =>
	console.error(`Block Sync Watcher Error: ${error}`)
);
