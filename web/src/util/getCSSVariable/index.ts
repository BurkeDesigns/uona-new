// Function to get CSS variable value
export const getCSSVariableValue = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};