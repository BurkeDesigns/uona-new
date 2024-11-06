// // writing bun tests -> https://bun.sh/docs/test/writing
// import { test, expect, describe, mock } from "bun:test";
// import { toUrlParams, post, get } from "@util/fetch";

// describe("Fetch utility", () => {
//     // Testing toUrlParams function
//     test("converts object to URL parameters", () => {
//         const params = { name: "John", age: 30 };
//         const expectedOutput = "name=John&age=30";
//         expect(toUrlParams(params)).toBe(expectedOutput);
//     })
  
//     // Testing post function (this is a simplified example)
//     test("sends a POST request", async () => {
//         let data = { name: "John" };
//         const res = await post("https://postman-echo.com/post", data);
//         expect(res.data).toEqual(data);
//     })

//     // Testing get function (this is a simplified example)
//     test("sends a GET request", async () => {
//         const res = await get("https://postman-echo.com/get?foo=bar");
//         expect(res.args.foo).toEqual("bar");
//     })

// })