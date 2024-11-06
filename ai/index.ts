import { Hono } from "hono";
import { cors } from "hono/cors";

// utils
import { handleError, res } from "./util/response";

// endpoints
import aiRoutes from "./routes/ai";

const app = new Hono();

// add cors to all endpoints
app.use("*", cors());
app.onError(handleError);

// middleware to inject context
// app.use("*", async (c, next) => {
// 	await next();
// });

// routes
app.route("/ai", aiRoutes);
app.get('/', (c) => c.text('API is running!'))

// export default app;
export default {
    port: 3003,
    fetch: app.fetch, 
} 

// console.log('Running on http://localhost:3000');
