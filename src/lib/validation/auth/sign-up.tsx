import z from "zod";

export const signUpSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  password: z.string().min(8),
});
