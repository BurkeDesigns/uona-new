import { Hono } from "hono";
import { env } from "hono/adapter";
import config from "@config";
// import { nanoid, customAlphabet } from "nanoid";
// utils
import { handleError, res, throwErr } from "@util/response";
import {
  getLastFolderName,
  getFileContents,
  getComponentContent,
} from "@util/files";
import { chatGPT } from "@util/models/chatGPT";
// import { groq } from "@util/models/groq";
// import { Glob } from "bun";
// import { extractTSXContent, getImports } from "@util/tsx";
// import { parseJsonFile, parsePkgJsonFile } from "@util/files/parse";
import { authOnly } from "@util/auth";

const routes = new Hono();

routes.post("/chat", authOnly, async (c) => {
  const body = await c.req.json();
  const chat = await chatGPT({
    model: "gpt-4o-mini",
    prompt: body.prompt || "hi",
  });
  return res(c, { msg: chat });
});

export default routes;
