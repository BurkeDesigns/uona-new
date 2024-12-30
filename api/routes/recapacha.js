import { Hono } from "hono";
import { getConnInfo } from "hono/bun";

// utils
import { handleError, res, throwErr } from "@util/response";
import { validateRecaptcha } from "@util/recapacha";

const routes = new Hono();

routes.post("/verify", async (c) => {
  const body = await c.req.json();
  let data = body;
  const conn = getConnInfo(c);
  data.ip = conn.remote.address;
  let isValid = await validateRecaptcha(data);
  return res(c, { isValid });
});

routes.get("/ip", async (c) => {
  let conn = getConnInfo(c);
  return res(c, { ...conn });
});

export default routes;
