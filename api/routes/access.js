import { Hono } from "hono";
// import { env } from "hono/adapter";
// import { Glob } from "bun";
// import sharp from "sharp";
// import { unlink, mkdir, access, readFile } from "node:fs/promises";
// import { nanoid } from "nanoid";

// utils
import { handleError, res, throwErr } from "@util/response";
import * as access from "@util/db/access";
import { pickRandom } from "@util/arr";
import { authOnly } from "@util/auth";

const routes = new Hono();

routes.get("/test", async (c) => {
  return res(c, { msg: "hello world" });
});

routes.post("/list", authOnly, async (c) => {
  let allAccess = await access.all();
  return res(c, { access: allAccess });
});

routes.post("/info", authOnly, async (c) => {
  const body = await c.req.json();
  let access = await access.getByEmail(body.email);
  return res(c, { ...access[0] });
});

routes.post("/get", authOnly, async (c) => {
  const body = await c.req.json();
  let list = await access.get(body);
  return res(c, { access: list });
});

routes.post("/create", authOnly, async (c) => {
  let body = await c.req.json();
  let newEntry = await access.insert(body);
  return res(c, { access: newEntry });
});

routes.patch("/update", authOnly, async (c) => {
  const body = await c.req.json();
  let access = await access.update(body.id, body);
  return res(c, { access });
});
routes.post("/update", authOnly, async (c) => {
  const body = await c.req.json();
  let access = await access.update(body.id, body);
  return res(c, { access });
});

routes.delete("/delete", authOnly, async (c) => {
  const body = await c.req.json();
  let removed = await access.remove(body);
  return res(c, { access: removed });
});

export default routes;
