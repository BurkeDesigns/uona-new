// import { describe, expect, test } from "bun:test";
// import { fakeDataFromSchema } from "@util/sanity";
// import { fakeDataFromField } from "@util/sanity/test.data";

// describe("Sanity test data utility", () => {
// 	test("fakeDataFromSchema generates correct data structure", () => {
// 		const schema = {
// 			fields: [
// 				{ name: "name", type: "string" },
// 				{ name: "age", type: "number" },
// 				{ name: "isActive", type: "boolean" },
// 				{ name: "birthday", type: "date" },
// 				{ name: "tags", type: "array" },
// 				{ name: "profile", type: "object" },
// 			],
// 		};
// 		const data = fakeDataFromSchema(schema);
// 		expect(typeof data.name).toBe("string");
// 		expect(typeof data.age).toBe("number");
// 		expect(typeof data.isActive).toBe("boolean");
// 		expect(new Date(data.birthday).toString()).not.toBe("Invalid Date");
// 		expect(Array.isArray(data.tags)).toBe(true);
// 		expect(typeof data.profile).toBe("object");
// 	});

// 	test("fakeDataFromField generates data based on field type", () => {
// 		expect(typeof fakeDataFromField({ type: "string" })).toBe("string");
// 		expect(typeof fakeDataFromField({ type: "number" })).toBe("number");
// 		expect(typeof fakeDataFromField({ type: "boolean" })).toBe("boolean");
// 		expect(
// 			new Date(fakeDataFromField({ type: "date" })).toString()
// 		).not.toBe("Invalid Date");
// 		expect(Array.isArray(fakeDataFromField({ type: "array" }))).toBe(true);
// 		expect(typeof fakeDataFromField({ type: "object" })).toBe("object");
// 	});
// });
