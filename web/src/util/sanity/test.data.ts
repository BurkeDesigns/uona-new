import {
    randomString,
    randomNumber,
    randomBoolean,
    randomDate
} from '@util/random'

export default function fakeDataFromSchema(schema) {
    const fakeData = {};
    schema.fields.forEach(field => {
        fakeData[field.name] = fakeDataFromField(field);
    });
    return fakeData;
}

export function fakeDataFromField(field) {
    switch (field.type) {
        case 'string':
            return randomString();
        case 'number':
            return randomNumber();
        case 'boolean':
            return randomBoolean();
        case 'date':
            return randomDate();
        case 'array':
            // For simplicity, generating an array of random strings. Modify as needed.
            return [randomString(), randomString()];
        case 'object':
            // Returns a simple object with random string. Modify as needed for complex objects.
            return { key: randomString() };
        // Add more cases for other types as necessary
        default:
            return null;
    }
}