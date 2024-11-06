import { parse } from "@babel/parser";

export const getImports = async (content: string) => {
	const ast = parse(content, {
		sourceType: "module",
		plugins: ["typescript", "jsx"],
	});

	const imports = ast.program.body
		.filter((node: any) => node.type === "ImportDeclaration")
		.map((imp: any) => ({
			source: imp.source.value,
			specifiers: imp.specifiers.map((spec: any) => ({
				local: spec.local.name,
				imported: spec.imported?.name,
			})),
		}));

	return imports;
}

export function extractTSXContent(markdown: string) {
  // Define the regular expression to match code blocks for specific languages
  const regex = /```(typescript|tsx|ts|jsx|js|javascript)\s+([\s\S]*?)```/g;
  
  let matches;
  let result = "";  // Initialize an empty string to accumulate the content
  let found = false;  // Flag to check if any matches are found

  // Use a while loop to find all matches
  while ((matches = regex.exec(markdown)) !== null) {
    found = true;  // Set flag to true if any match is found
    // Append the content inside the code block to the result string
    result += matches[2] + "\n"; // Add a newline for separation between blocks
  }

  // Return the original markdown if no code blocks were found, else return the extracted content
  return found ? result.trim() : markdown;
}
