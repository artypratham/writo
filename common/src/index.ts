import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});

//type inference in zod
export type SignupInput = z.infer<typeof signupInput>;
//type inference of signin Input in zod
export type SigninInput = z.infer<typeof signinInput>;
//type inference of createInputBLog in zod
export type CreateInputBlog = z.infer<typeof createBlogInput>;
//type inference of updateInputBLog in zod
export type UpdateInputBlog = z.infer<typeof updateBlogInput>;
