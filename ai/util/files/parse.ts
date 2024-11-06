import { tsFileExists } from '@util/files';
import * as path from 'path';
import stripJsonComments from 'strip-json-comments';

export const removeComments = (string: string) => {
    return string.replace(/\/\/.*$/gm, '')    // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
};

export function removeTrailingCommas(jsonString: string) {
    // Remove trailing commas from objects
    jsonString = jsonString.replace(/,(?=\s*[\}\]])/g, '');
    return jsonString;
  }

export const parseJsonFile = async (path: string) => {
	const file = Bun.file(path); // BunFile
	let data = await file.text();
    data = stripJsonComments(data);
    data = removeTrailingCommas(data);
    return JSON.parse(data);
}

export function hasDotInLastSegment(filePath: string): boolean {
    // Regex to match the last segment after the last '/' and check if it contains a '.'
    const regex = /\/([^\/]+)\.[^\/]+$/;
  
    // Test if the regex matches
    return regex.test(filePath);
  }

// Function to resolve path aliases
export async function resolvePath(startingPath: string, source: string, tsconfigPaths: object): string {
     // Get the directory of the startingPath
     const basePath = path.dirname(startingPath);

     // Handle relative paths
     if (source.startsWith('.') || source.startsWith('..')) {
         let newPath = path.resolve(basePath, source);
         let rootPath = import.meta.dir.split('ai')[0];
        //  console.log(rootPath);
         // Trim the path to start from "src"
        if(newPath.startsWith(rootPath)) newPath = newPath.slice(rootPath.length);
        newPath = await tsFileExists(`../web/${newPath}`) || newPath;
        return newPath.replace('../web/', '').replace('web/', '');
     }
     // Resolve aliases
    for (const [alias, paths] of Object.entries(tsconfigPaths)) {
        const aliasPattern = alias.replace('*', '(.*)');
        const regex = new RegExp(`^${aliasPattern}$`);
        const match = source.match(regex);
        
        if (match) {
            let resolvedPath = paths[0].replace('*', match[1] || '');
            resolvedPath = await tsFileExists(`../web/${resolvedPath}`) || resolvedPath;
            return resolvedPath.replace('../web/', '').replace('web/', '');
        }
    }
    return source;
}
  

// Function to generate full paths for imports
export async function generateFullPaths(startingPath: string, imports: any[], packageDependencies: Set<string>, tsconfigPaths: object): string[] {
    const uniquePaths = new Set<string>();

    for (const imp of imports) {
        if (!packageDependencies.has(imp.source)) {
            const fullPath = await resolvePath(startingPath, imp.source, tsconfigPaths);
            uniquePaths.add(fullPath);
        }
    }

    return Array.from(uniquePaths);
}

export const parsePkgJsonFile = async (dir: string) => {
    // Run both parseJsonFile tasks in parallel
    const [pkg, tsconfig] = await Promise.all([
        parseJsonFile(`${dir}/package.json`),
        parseJsonFile(`${dir}/tsconfig.json`)
    ]);

    // Combine dependencies from package.json
    const obj = {
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
        ...pkg.dependencies,
    };

    // Return the combined packages and tsconfig paths
    return {
        packages: obj,
        tsconfigPaths: tsconfig.compilerOptions.paths,
    };
};