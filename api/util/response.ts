import { HTTPException } from "hono/http-exception";

export const throwErr = (c:any, msg:any, statusCode?: number) => {
  let type = typeof msg;
  console.error(msg);
  return c.json(
    {
      success: false,
      msg,
      //   type,
    },
    statusCode ?? 500
  );
};

export const handleError = (err:any, c:any) => {
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
export const res = (c:any, obj?:any) => {
  if (obj) return c.json({ success: true, ...obj });
  return c.json({ success: true });
};
