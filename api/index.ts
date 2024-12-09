import { Hono } from "hono";
import { cors } from "hono/cors";

// utils
import { handleError, res } from "./util/response";

// endpoints
// import photoRoutes from "./routes/photos";
import usersRoutes from "./routes/users";
import pagesRoutes from "./routes/pages";
import backupsRoutes from "./routes/backups";
import accessRoutes from "./routes/access";

const app = new Hono();

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

app.get('/', (c) => c.text('API is running!'))


// export default app;
export default {
    port: Bun.env.PORT || 3008,
    fetch: app.fetch, 
}
