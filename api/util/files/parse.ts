export const removeComments = (string: string) => {
    return string.replace(/\/\/.*$/gm, '')    // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
};

export const fixJsonSyntax = (string: string) => {
    // Ensure property names are in double quotes
    return string.replace(/(\w+):/g, '"$1":');
  };

export function removeTrailingCommas(jsonString: string) {
    // Remove trailing commas from objects
    jsonString = jsonString.replace(/,(?=\s*[\}\]])/g, '');
    
    // Remove extra whitespace around curly braces and square brackets
    // jsonString = jsonString.replace(/\s*(\}|\])\s*/g, '$1');
    
    // Optional: Remove extra whitespace inside the JSON string
    // jsonString = jsonString.replace(/\s+(?=[\}\]\:])/g, '');
    
    return jsonString;
  }

export const parseJsonFile = async (path: string) => {
	const file = Bun.file(path); // BunFile
	let data = await file.text();
    data = fixJsonSyntax(removeComments(data));
    // data = removeTrailingCommas(data);
    console.log(data);
    return JSON.parse(data);
}

export const parsePkgJsonFile = async (dir: string) => {
	const pkg = await parseJsonFile(`${dir}/package.json`);
	const tsconfig = await parseJsonFile(`${dir}/tsconfig.json`);
    let obj = {
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
        ...pkg.dependencies,
    };
    return {
        packages: obj,
        tsconfig: tsconfig.paths,
    };

}