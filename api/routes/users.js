import { Hono } from "hono";
// import { env } from "hono/adapter";
// import { Glob } from "bun";
// import sharp from "sharp";
// import { unlink, mkdir, access, readFile } from "node:fs/promises";
// import { nanoid } from "nanoid";

// utils
import { handleError, res, throwErr } from "@util/response";
import * as users from "@util/db/users";
import { pickRandom } from "@util/arr";

const routes = new Hono();

routes.get("/test", async (c) => {
  return res(c, { msg: "hello world" });
});

routes.post("/list", async (c) => {
  let allUsers = await users.all();
  return res(c, { users: allUsers });
});

routes.post("/info", async (c) => {
  const body = await c.req.json();
  let user = await users.getByEmail(body.email);
  return res(c, { ...user[0] });
});

routes.post("/get", async (c) => {
  const body = await c.req.json();
  let user = await users.get(body.id);
  return res(c, { ...user[0] });
});

routes.post("/create", async (c) => {
  let body = await c.req.json();

  let photos = [
    "/assets/photos/images (1).jpeg",
    "/assets/photos/images (2).jpeg",
    "/assets/photos/images (3).jpeg",
    "/assets/photos/images (4).jpeg",
    "/assets/photos/images (5).jpeg",
    "/assets/photos/images (6).jpeg",
    "/assets/photos/images (7).jpeg",
    "/assets/photos/images (8).jpeg",
  ];

  body.image = pickRandom(photos);
  let user = await users.insert(body);
  return res(c, { user });
});

routes.patch("/update", async (c) => {
  const body = await c.req.json();
  let user = await users.update(body.id, body);
  return res(c, { user });
});
routes.post("/update", async (c) => {
  const body = await c.req.json();
  let user = await users.update(body.id, body);
  return res(c, { user });
});

routes.delete("/delete", async (c) => {
  const body = await c.req.json();
  let user = await users.remove(body.id);
  return res(c, { user });
});

routes.get("/get/profile/image/:url", async (c) => {
  const url = c.req.param("url");
  const decodedUrl = decodeURIComponent(url);

  try {
    const imageResponse = await fetch(decodedUrl);

    // Ensure fetch was successful
    if (!imageResponse.ok) {
      return new Response("Error fetching image", { status: 500 });
    }

    // Return the fetched image with appropriate headers
    const contentType =
      imageResponse.headers.get("content-type") || "application/octet-stream";
    return new Response(imageResponse.body, {
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    return new Response("Error occurred while fetching image", {
      status: 500,
    });
  }
});

export default routes;
