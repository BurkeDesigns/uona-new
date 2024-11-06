// import { describe, expect, test } from "bun:test";
// import { debounce } from "@util/debounce";

// describe("Debounce utility", () => {
//   test("debounce delays function execution", done => {
//     let counter = 0;
//     const increment = () => counter += 1;
//     const debouncedIncrement = debounce(increment, 100); // 100ms delay

//     debouncedIncrement();
//     debouncedIncrement();
//     debouncedIncrement();

//     // Initially, the counter should not have incremented yet
//     expect(counter).toBe(0);

//     // After 150ms, the counter should have incremented only once
//     setTimeout(() => {
//       expect(counter).toBe(1);
//       done();
//     }, 150);
//   });
// });
