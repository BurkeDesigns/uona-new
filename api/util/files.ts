import { Glob } from "bun";
import config from '@config'

export function getLastFolderName(path:string) {
    const parts = path.split('/');
  
    // Work from the end of the array backwards
    let part:any;
    while (parts.length > 0) {
      part = parts.pop(); // Remove and get the last element
  
      // Check if the part is a file (contains a dot), if not, it's the last folder
      if (!part.includes('.')) {
        return part;
      }
    }
  
    return null; // Return null if no folder name is found
  }

export const getFileContents = async (path:string) =>{
  let file = await Bun.file(path);
  return await file.text();
}

export const getComponentContent = async (name:string) =>{
	const glob = new Glob("**/index.tsx");
	let components:any = {};
	for await (const file of glob.scan(config.projectDir)) {
		let name = getLastFolderName(file);
		components[name] = file;
	}
	let content = await getFileContents(`${config.projectDir}/${components[name]}`);
	return content;
}