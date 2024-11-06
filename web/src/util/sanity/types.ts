export type SanityField = {
    name: string;
    type: string;
    // Include other common properties of Sanity fields as needed
};

export type SanitySchema = {
    name: string;
    title: string;
    type: string;
    fields: SanityField[];
    // Include other common properties of Sanity schemas as needed
};

export default function schemaToType(schema: SanitySchema): string {
    if (schema.type !== 'document' && schema.type !== 'object') throw new Error('Unsupported schema type. Only "document" and "object" are supported.');

    const fields = schema.fields.map(field => {
        // Map Sanity field types to TypeScript types
        let tsType: string;
        switch (field.type) {
            case 'string':
                tsType = 'string';
                break;
            case 'number':
                tsType = 'number';
                break;
            case 'boolean':
                tsType = 'boolean';
                break;
            case 'array':
                tsType = 'any[]'; // You may need to handle array item types more specifically
                break;
            case 'object':
                tsType = 'Record<string, any>'; // Simplified, may need more specific handling
                break;
            // Add more cases as necessary for different field types
            default:
                tsType = 'any';
        }
        return `${field.name}: ${tsType};`;
    });

    return `type ${schema.name} = {\n  ${fields.join('\n  ')}\n};`;
}