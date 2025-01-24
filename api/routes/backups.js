import { Hono } from "hono";

// utils
import { handleError, res, throwErr } from "@util/response";
import { backupDatabase, listBackups, db_backup } from "../scripts/backup_db";
import { $ } from "bun";
import { authOnly } from "@util/auth";

const routes = new Hono();

routes.get("/test", async (c) => {
  return res(c, { msg: "hello world" });
});

routes.get("/list", authOnly, async (c) => {
  let backups = await listBackups();
  return res(c, { backups });
});

routes.post("/create", authOnly, async (c) => {
  let backup = await backupDatabase();
  return res(c, { backup });
});

export default routes;
