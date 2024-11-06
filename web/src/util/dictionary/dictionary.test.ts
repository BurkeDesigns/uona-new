// import { describe, expect, test } from "bun:test";
// import { dictionary } from "@util/dictionary";

// describe("Dictionary utility", () => {
//   test("returns correct translation for valid locale and text", () => {
//     // Replace 'hola' with the actual translation in your 'es' dictionary
//     expect(dictionary('es', 'hello')).toBe('hola');
//     expect(dictionary('fr', 'hello')).toBe('Bonjour');
//   });

//   test("returns text for invalid locale", () => {
//     const inputText = 'hello';
//     const result = dictionary('de', inputText); // 'de' not defined
//     expect(result).toBe(inputText);
//   });

//   test("returns text for valid locale but missing translation", () => {
//     const inputText = 'goodbye';
//     const result = dictionary('es', inputText); // Assuming 'goodbye' not in 'es'
//     expect(result).toBe(inputText);
//   });

//   test("converts numeric text input to string for translation", () => {
//     expect(dictionary('fr', 123)).toBe('123');
//   });
// });
