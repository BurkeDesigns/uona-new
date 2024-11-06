// import { describe, expect, test } from "bun:test";
// import { randomString, randomNumber, randomBoolean, randomDate } from "@util/random";

// describe("Random utility", () => {
//   test("randomString returns a string", () => {
//     expect(typeof randomString()).toBe("string");
//   });

//   test("randomNumber returns a number between 0 and 99", () => {
//     const num = randomNumber();
//     expect(num).toBeGreaterThanOrEqual(0);
//     expect(num).toBeLessThan(100);
//   });

//   test("randomBoolean returns a boolean", () => {
//     expect(typeof randomBoolean()).toBe("boolean");
//   });

//   test("randomDate returns a valid date string", () => {
//     const date = randomDate();
//     const dateObj = new Date(date);
//     expect(dateObj instanceof Date && !isNaN(dateObj.valueOf())).toBeTruthy();
//   });
// });
