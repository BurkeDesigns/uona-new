import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { generateKeys, encrypt, sign, verify } from 'paseto-ts/v4';
import { authOnly } from "@util/auth";

// auth
// import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
// import Google from '@auth/core/providers/google'
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js"
import { getAuthConfig } from "@util/auth";

// utils
import { handleError, res, throwErr } from "./util/response";

// endpoints
// import photoRoutes from "./routes/photos";
import usersRoutes from "./routes/users";
import pagesRoutes from "./routes/pages";
import backupsRoutes from "./routes/backups";
import accessRoutes from "./routes/access";
import aiRoutes from "./routes/ai";
import recapachaRoutes from "./routes/recapacha";
import formResponseRoutes from "./routes/form_responses";
import Google from "@auth/core/providers/google";
import { $ } from "bun";
import { maxHeaderSize } from "node:http";

const app = new Hono();

// add auth 
// app.use(
//     '*',
//     initAuthConfig((c) => ({
//       secret: c.env.AUTH_SECRET,
//       providers: [
//         Google({
//           clientId: c.env.GOOGLE_CLIENT_ID,
//           clientSecret: c.env.GOOGLE_CLIENT_SECRET,
//         }),
//       ],
//     }))
// );

// API Routes
// app.use('/api/auth/*', authHandler())
// app.use('/api/*', verifyAuth())
// app.get('/api/protected', (c) => {
//     const auth = c.get('authUser')
//     return c.json(auth)
// })

app.use('*', bodyLimit({ maxSize: 10 * 1024 * 1024 })) // 10 MB limit

// add cors to all endpoints
app.use('*', cors({
  origin: (origin, callback) => {
      // console.log("ORIGIN", origin);
      return origin;
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization', 'token', 'publicKey', '*'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  credentials: true,
}));

app.options('*', (c) => {
  return c.text('', 204)
});

// error handling
// app.use(async (c, next) => {
//   await next()
//   if (c.error) {
//     // do something...
//     return throwErr(c, c.error);
//   }
// });
app.onError(handleError);

// app.use("*", initAuthConfig(getAuthConfig))
app.use('*', initAuthConfig((c) => ({
      secret: c.env.AUTH_SECRET,
      providers: [
        Google({
          clientId: c.env.GOOGLE_CLIENT_ID,
          clientSecret: c.env.GOOGLE_CLIENT_SECRET
        }),
      ],
      trustHost: true,
      // cookies:{
      //   sessionToken:{
      //     name: "__Host-next-auth.session-token",
      //     options: {
      //       httpOnly: true,
      //       sameSite: "lax",
      //       // path: "/",
      //       secure: true,
      //       // This is key:
      //       domain: ".uona.edu",
      //     },
      //   },
      //   callbackUrl: {
      //     name: "__Secure-next-auth.callback-url",
      //     options: {
      //       sameSite: "lax",
      //       //   path: "/",
      //       secure: true,
      //       domain: ".uona.edu",
      //     },
      //   },
      //   csrfToken: {
      //     name: "__Host-next-auth.csrf-token",
      //     options: {
      //       httpOnly: true,
      //       sameSite: "lax",
      //       //   path: "/",
      //       secure: true,
      //       domain: ".uona.edu",
      //     },
      //   },
      // }
    })));

app.use("/api/auth/*", authHandler())
app.use('/api/*', verifyAuth())

app.post('/api/protected', (c) => {
  const auth = c.get("authUser");
  console.log(auth);
  return res(c, {auth});
})

// auth middleware to inject context
app.use('/auth/*', authOnly);

// routes
// app.route("/photos", photoRoutes);
app.route("/users", usersRoutes);
app.route("/pages", pagesRoutes);
app.route("/backups", backupsRoutes);
app.route("/access", accessRoutes);
app.route("/auth/ai", aiRoutes);
app.route("/recapacha", recapachaRoutes);
app.route("/form-response", formResponseRoutes);

app.get('/', (c) => c.text('API is running!'))


app.get('/headers', (c) => {
    // Access the raw Headers object
    const headers = c.req.raw.headers;
  
    // Convert headers to an object
    const headersObject: Record<string, string> = {};
    headers.forEach((value, key) => {
      headersObject[key] = value;
    });
  
    // Return all headers as JSON
    return c.json(headersObject);
  });


app.get("/usage", async (c) => {
  let dataStorageUsed = await $`du -s /home/wesley/Documents/Data`;
  const dataSize = parseInt(dataStorageUsed.text().split("/")[0]);

  let websiteStorageUsed =
    await $`du -s /home/wesley/Documents/GitHub/uona-new`;
  const websiteSize = parseInt(websiteStorageUsed.text().split("/")[0]);
  return res(c, { allBytesUsed: (dataSize + websiteSize)*1000 });
});



app.post("/auth/test", authOnly, async (c) => {
  // const tokenData = c.get('tokenData');
  return res(c, {});
});

app.get("/token", async (c) => {
  const { secretKey, publicKey } = generateKeys('public');

  // create token
  const token = await sign(
      // secretKey = k4.secret.xxx..
      secretKey, // string | Uint8Array
      // payload = { sub: '1234567890', name: 'John Doe' }
      {
          email: 'wesley@burkedesigns.biz',
          exp: "1 hour"
      }, // Payload | string | Uint8Array
      {
          addExp: false, // to remove an expires time
      }
  );
  console.log('TOKEN', token);

  console.log('SECRET', secretKey);
  console.log('PUBLIC', publicKey);

  return res(c, {token, publicKey});
});

app.get("/token/verify", async (c) => {
  const { secretKey, publicKey } = generateKeys('public');

  console.log('SECRET', secretKey);
  console.log('PUBLIC', publicKey);
  // verify token
  const { payload, footer } = await verify(
      // publicKey = k4.public.xxx..
      publicKey, // string | Uint8Array
      // token = v4.public.xxx..
      token, // string | Uint8Array
  );
  return res(c, {});
});


// const { secretKey, publicKey } = generateKeys('public');

//     console.log('SECRET', secretKey);
//     console.log('PUBLIC', publicKey);

    

//     // verify token
//     const { payload, footer } = await verify(  
//         // publicKey = k4.public.xxx..
//         publicKey, // string | Uint8Array
//         // token = v4.public.xxx..
//         token, // string | Uint8Array
//     );

//     console.log('===============');
//     console.log('PAYLOAD', payload);
//     console.log('FOOTER', footer);

// export default app;
export default {
    port: Bun.env.PORT || 3006,
    // port: 3008,
    fetch: app.fetch, 
    maxRequestBodySize: 1024 * 1024 * 50, // your value here
}
