import { Hono } from "hono";
// import { env } from "hono/adapter";
// import { Glob } from "bun";
import sharp from "sharp";
import { unlink, mkdir, access, readFile } from "node:fs/promises";
import { nanoid } from "nanoid";
import { $ } from "bun";
import Papa from "papaparse";

// utils
import { handleError, res, throwErr } from "@util/response";
import * as formResponses from "@util/db/form_responses";
import { pickRandom } from "@util/arr";
import * as dbFiles from "@util/db/files";

const routes = new Hono();

routes.get("/", async (c) => {
  return res(c, { msg: "hello world" });
});

routes.get("/test", async (c) => {
  return res(c, { msg: "hello world" });
});

routes.get("/files/:fileId/:size", async (c) => {
  const fileId = c.req.param("fileId");
  const size = c.req.param("size");

  // lookup file by id
  let fileData = await dbFiles.get(fileId);

  const path = fileData[0].path;
  const filename = path.split("/").pop();
  const cachePath = `/home/wesley/Documents/Data/UoNA/Files/Cache/${filename}`;
  // const cachePath = `${cacheDir}/${filename}`;

  await mkdir(cachePath, { recursive: true });

  // Check if the resized image already exists in the cache
  const file = Bun.file(path);
  const cachedFile = Bun.file(`${cachePath}/${size}`);

  // If the original file does not exist, return a 404 error
  try {
    switch (size) {
      case "original":
        return new Response(file);
      default:
        let cacheExists = await cachedFile.exists(); // boolean;

        console.log("cacheExists", cacheExists);

        if (cacheExists == false) {
          console.log(file, fileData[0].type.startsWith("image"));
          if (fileData[0].type.startsWith("image")) {
            // Resize the image and convert it to webp format
            const resizedImageBuffer = await sharp(path)
              .resize(Number(size)) // Example dimensions, adjust as needed
              .webp()
              .toBuffer();

            // Store the resized image in the cache
            await Bun.write(`${cachePath}/${size}`, resizedImageBuffer);

            // Serve the resized image
            return new Response(resizedImageBuffer, {
              headers: { "Content-Type": "image/webp" },
            });
          } else {
            return new Response(file);
          }
        }

        return new Response(cachedFile);
    }
  } catch (err) {
    return new Response("File not found", { status: 404 });
  }
});

routes.get("/export/csv", async (c) => {
  let all = await formResponses.allWithForm();

  let data = all.map((item) => {
    return {
      created_at: item.created_at,
      form: item.title,
      id: item.id,
      status: item.data.status,
      name: item.data.name,
      student_id: item.data.student_id,
      birthday: item.data.birthday,
      confirm_waiver: item.data.confirm_waiver,
    };
  });

  var csv = Papa.unparse(data);
  let d = new Date();
  // Set headers for CSV download
  c.header("Content-Type", "text/csv");
  c.header(
    "Content-Disposition",
    `attachment; filename="${d.toISOString()}-form-responces.csv"`
  );

  // Send CSV as the response
  return c.text(csv);
  // return res(c, { all });
});

routes.post("/list", async (c) => {
  let all = await formResponses.allWithForm();
  return res(c, { list: all });
});

routes.post("/get", async (c) => {
  const body = await c.req.json();
  let data;
  if (body.id) data = await formResponses.get(body.id);
  if (body.column)
    data = await formResponses.getByColumn(body.column, body.value);

  // console.log(data);
  const uploadPromises = data[0].data.uploaded_files.map(async (id) => {
    let fileData = await dbFiles.get(id);
    console.log("fileData", fileData);
    return fileData[0]; // Return the response to include in the promise array
  });
  let result = await Promise.all(uploadPromises);

  return res(c, {
    ...data[0],
    uploaded_files: result,
  });
});

// routes.post("/get/files", async (c) => {
//   const body = await c.req.json();
//   let data;
//   if (body.id) data = await formResponses.get(body.id);
//   let uploadedFiles = data[0].data.uploaded_files;

//   // uploadedFiles.map(async id=> {
//   //   let fileData = await dbFiles.get(fileId);
//   //   console.log();
//   // });

//   const uploadPromises = uploadedFiles.map(async (id) => {
//     let fileData = await dbFiles.get(fileId);
//     console.log("fileData", fileData);
//     return fileData[0]; // Return the response to include in the promise array
//   });
//   let result = await Promise.all(uploadPromises);

//   return res(c, { result });
// });

routes.post("/create", async (c) => {
  let body = await c.req.json();
  let data = await formResponses.insert(body);
  return res(c, { data });
});

routes.patch("/update", async (c) => {
  const body = await c.req.json();
  let data = await formResponses.update(body.id, body);
  return res(c, { data });
});
routes.post("/update", async (c) => {
  const body = await c.req.json();
  let data = await formResponses.update(body.id, body);
  return res(c, { data });
});

routes.post("/upload", async (c) => {
  const body = await c.req.parseBody();
  // if (!body.project_id) return throwErr(c, "Must have project_id");
  const { name, size, type, group, uid } = body;
  const fileId = nanoid();
  const path = `/home/wesley/Documents/Data/UoNA/Files/${fileId}`;
  await Bun.write(path, body.file);
  // let matches = await dbFiles.getProjectFile(project_id, name);
  let file = await dbFiles.insert({
    group,
    uid,
    path,
    name,
    size,
    type,
  });
  console.log("created file", name, fileId);
  return res(c, { file });
});

// routes.delete("/delete", async (c) => {
//   const body = await c.req.json();
//   let data = await formResponses.remove(body.id);
//   return res(c, { data });
// });

routes.delete("/delete", async (c) => {
  const body = await c.req.json();

  let data;
  if (body.id) data = await formResponses.get(body.id);
  if (body.column)
    data = await formResponses.getByColumn(body.column, body.value);

  if (data == null)
    return throwErr(c, "Unable to delete. Form response not found.");

  // console.log(data);
  if (data[0].data.uploaded_files.length > 0) {
    const uploadPromises = data[0].data.uploaded_files.map(async (id) => {
      let fileData = await dbFiles.get(id);
      return fileData[0]; // Return the response to include in the promise array
    });
    let uploadedFiles = await Promise.all(uploadPromises);

    const deletePromises = uploadedFiles.map(async (item) => {
      try {
        // delete cache files
        const path = item.path;
        const filename = path.split("/").pop();
        const cacheDir = `/home/wesley/Documents/Data/UoNA/Files/Cache/${filename}`;
        await $`rm -rf ${cacheDir}`;
        // delete original file
        await unlink(item.path);
        // delete database record
        await dbFiles.remove(item.id);
        return true;
      } catch (error) {
        return false;
      }
    });
    await Promise.all(deletePromises);
  }

  let deletedFormResponse = await formResponses.remove(body.id);

  return res(c, {});
});

export default routes;
