import { Glob } from "bun";
import config from '@config'
import { getImports } from "./tsx";
import { generateFullPaths, hasDotInLastSegment, parsePkgJsonFile } from "./files/parse";

export function getLastFolderName(path:string) {
    const parts = path.split('/');
  
    // Work from the end of the array backwards
    let part;
    while (parts.length > 0) {
      part = parts.pop(); // Remove and get the last element
  
      // Check if the part is a file (contains a dot), if not, it's the last folder
      if (!part.includes('.')) {
        return part;
      }
    }
  
    return null; // Return null if no folder name is found
  }

export const getFileContents = async (path: string) =>{
  let file = await Bun.file(path);
  return await file.text();
}

export const fileExists = async (path: string) =>{
  let file = await Bun.file(path);
  let exists = await file.exists()
  if(exists) return path;
  return null;
}
export const tsFileExists = async (path: string) =>{
  if(hasDotInLastSegment(path)) return path;

  const files = await Promise.all([
    fileExists(`${path}.ts`),
    fileExists(`${path}/index.ts`),
    fileExists(`${path}.tsx`),
    fileExists(`${path}/index.tsx`),
  ]);
  // Find the first file that is not null
  const existingFile = files.find(file => file !== null);

  if (existingFile) return existingFile;
  return null; // Or handle the case where no file exists
}

export const getComponentContent = async (name:string) =>{
	const glob = new Glob("**/index.tsx");
	let components = {};
	for await (const file of glob.scan(config.projectDir)) {
		let name = getLastFolderName(file);
		components[name] = file;
	}
	let content = await getFileContents(`${config.projectDir}/${components[name]}`);
	return {content, path: `src/${components[name]}` };
}

export const listAllFiles = async () =>{
  let projectImports = await parsePkgJsonFile("../web");
  let projectImportSet = new Set(Object.keys(projectImports.packages));

  let components:any = {};

  const glob = new Glob("!node_modules/**");
  const globParent = new Glob("*");
  for await (const file of globParent.scan({
    cwd: '../web',
    dot: false,
    // followSymlinks: false,
    onlyFiles: true,
  })){
    if(file.startsWith("dist/") || file.startsWith("docs/")) {}else{
      // components.push(file);
      if(file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')){
        let content = await getFileContents(`../web/${file}`);
        let imports = await getImports(content);

        // // Generate and return the full paths as an array
      const fullPathImports = await generateFullPaths(
        `../web/${file}`,
        imports,
        projectImportSet,
        projectImports.tsconfigPaths
      );

        components[file] = {
          imports: fullPathImports,
          hash: `${Bun.hash(content)}`,
          // content: content
        };

      }
    }
  }
  // *[^node_modules,^dist]/**
  for await (const file of glob.scan({
    cwd: '../web',
    dot: false,
    // followSymlinks: false,
    onlyFiles: true,
  })) {
    if(file.startsWith("dist/") || file.startsWith("docs/")) {}else{
      // components.push(file);
      if(file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')){
        let content = await getFileContents(`../web/${file}`);
        let imports = await getImports(content);

        // // Generate and return the full paths as an array
      const fullPathImports = await generateFullPaths(
        `../web/${file}`,
        imports,
        projectImportSet,
        projectImports.tsconfigPaths
      );

        components[file] = {
          imports: fullPathImports,
          hash: `${Bun.hash(content)}`,
          // content: content
        };

      }
    }
  }

  return components;
	// let content = await getFileContents(`${config.projectDir}/${components[name]}`);
	// return {content, path: `src/${components[name]}` };
}