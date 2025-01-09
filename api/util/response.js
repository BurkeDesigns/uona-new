import { HTTPException } from "hono/http-exception";

export const throwErr = (c, msg) => {
  let type = typeof msg;
  console.error(msg);
  return c.json(
    {
      success: false,
      msg,
      //   type,
    },
    500
  );
};

export const handleError = (err, c) => {
  let type = typeof err;
  let error = `${err}`;
  if (err instanceof HTTPException) return err.getResponse();
  console.error(error);
  return c.json(
    {
      success: false,
      msg: error,
      //   type,
    },
    500
  );
};
export const res = (c, obj) => {
  if (obj) return c.json({ success: true, ...obj });
  return c.json({ success: true });
};
