import { Hono } from "hono";
import { cors } from "hono/cors";

// auth
// import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
// import Google from '@auth/core/providers/google'

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

// add cors to all endpoints
app.use("*", cors({
    origin: (origin, c) => {
        // console.log("ORIGIN", origin);
        return origin;
    },
    credentials: true,
}));

app.onError(handleError);

// middleware to inject context
// app.use("*", async (c, next) => {
// 	await next();
// });

// routes
// app.route("/photos", photoRoutes);
app.route("/users", usersRoutes);
app.route("/pages", pagesRoutes);
app.route("/backups", backupsRoutes);
app.route("/access", accessRoutes);
app.route("/ai", aiRoutes);
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


// export default app;
export default {
    port: Bun.env.PORT || 3006,
    // port: 3008,
    fetch: app.fetch, 
}
