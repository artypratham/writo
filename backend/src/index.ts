import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { userRouter } from "../src/routes/userRouter";
import { blogRouter } from "../src/routes/blogRouter";
import { cors } from "hono/cors";


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use('/api/*' ,cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
