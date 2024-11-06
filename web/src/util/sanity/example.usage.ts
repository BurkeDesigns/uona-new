import { fakeDataFromSchema } from "@util/sanity";

// Example usage
const mySanitySchema = {
    name: 'ExampleSchema',
    title: 'Example Schema',
    type: 'document',
    fields: [
        { name: 'title', type: 'string' },
        { name: 'age', type: 'number' },
        { name: 'isActive', type: 'boolean' },
        { name: 'createdAt', type: 'date' },
        { name: 'tags', type: 'array' },
        { name: 'metadata', type: 'object' },
        // Add more fields as necessary
    ]
};

const fakeData = fakeDataFromSchema(mySanitySchema);
console.log(fakeData);