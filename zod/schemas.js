import { z } from 'zod/v4';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])/;

export const userSchema = z
  .object({
    firstName: z.string('firstName must be a string').min(1, 'firstName is required'),
    lastName: z.string('lastName must be a string').min(1, 'lastName is required'),
    email: z.string('email must be a string').email(),
    password: z
      .string('password must be a string')
      .min(8, 'password must longer than 8')
      .max(512, 'password must not longer than 512')
      .regex(passwordRegex),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, { error: 'passwords donot matched' });

export const signInSchema = userSchema.omit({ firstName: true, lastName: true, confirmPassword: true });

export const postSchema = z.object({
  title: z.string('Title must be a string').min(1, 'Title is required'),
  image: z.string('Image must be a string').min(1, 'Image is required'),
  content: z.string('Content must be a string').min(1, 'Content is required')
  // author: z.string('Author must be a string').min(1, 'Author is required')
});
