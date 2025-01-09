import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun"; // Import the serveStatic from your favorite runtime
import { handler as ssrHandler } from "../web/dist/server/entry.mjs"; // Import the handler from the built project

// auth
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js"
import { getAuthConfig } from "@util/auth";
import Google from "@auth/core/providers/google";

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

// add cors to all endpoints
// app.use('*', cors({
//   origin: (origin, callback) => {
// 	  // console.log("ORIGIN", origin);
// 	  return origin;
//   },
//   allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   allowHeaders: ['Content-Type', 'Authorization', '*'],
//   credentials: true,
// }));

// app.options('*', (c) => {
// return c.text('', 204)
// });

app.get('/test', (c) => {
	return res(c, {});
});

app.onError(handleError);

// app.use("*", initAuthConfig(getAuthConfig))
app.use('*', initAuthConfig((c) => ({
	prefix: '/api/auth',
	secret: Bun.env.AUTH_SECRET,
	providers: [
		Google({
			clientId: Bun.env.GOOGLE_CLIENT_ID,
			clientSecret: Bun.env.GOOGLE_CLIENT_SECRET
		}),
	],
	trustHost: true,
})));

app.use("/api/auth/*", authHandler())
app.use('/api/*', verifyAuth())

app.get('/api/protected', (c) => {
  const auth = c.get("authUser");
  console.log(auth);
  return res(c, {auth});
});

// API protected routes
// app.route("/photos", photoRoutes);
app.route("/users", usersRoutes);
app.route("/pages", pagesRoutes);
app.route("/backups", backupsRoutes);
app.route("/access", accessRoutes);
app.route("/ai", aiRoutes);

// public routes
app.route("/recapacha", recapachaRoutes);
app.route("/form-response", formResponseRoutes);


// Astro app
app.use("/*", serveStatic({ root: "../web/dist/client/" })); // Serve the static files
app.use(ssrHandler); // Use the SSR handler
app.use((ctx) => ssrHandler(ctx)); // Use the SSR handler 

// Start the server as inidicated by the runtime in the hono documentation
console.log("Server is running on http://localhost:4321");
export default {
	fetch: app.fetch,
	// port: process.env.PORT ?? 3000,
	port: 4321,
};