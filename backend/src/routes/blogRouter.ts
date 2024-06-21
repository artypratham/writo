import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, jwt, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@arty_pratham/writo-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

//route to upload a blog
blogRouter.post("/", async (c) => {
  //get the body
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  const authorId = c.get("userId");

  //initialize prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
        //extractiojn of authorId happens in the middleware
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while uploading the blog " });
  }
});

//route to update a blog
blogRouter.put("/", async (c) => {
  //get the body
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }
  //initialize prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while uploading the blog " });
  }
});

//route to get blogs in bulk
// blogRouter.get("/bulk", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   try {
//     const blogs = await prisma.blog.findMany();

//     return c.json({ blogs });
//   } catch (error) {
//     console.log(error);
//     c.status(411);
//   }
// });

//tried pagination
blogRouter.get("/bulk", async (c) => {
  const body = await c.req.query();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const page = parseInt(c.req.query("page") || "1", 10);
  const limit = parseInt(c.req.query("limit") || "10", 10);
  const offset = (page - 1) * limit;
  try {
    // Fetch paginated results
    const blogs = await prisma.blog.findMany({
      skip: offset,
      take: limit,
    });

    // Get the total number of blogs
    const totalBlogs = await prisma.blog.count();

    // Return the paginated results along with pagination info
    return c.json({
      blogs,
      pagination: {
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Internal Server Error" });
  }
});

//route to get a specific blog
blogRouter.get("/:id", async (c) => {
  //get the body
  const id = await c.req.param("id");

  //initialize prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
        published: true,
      },
    });

    return c.json({ blog });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "error while getting the blog " });
  }
});
