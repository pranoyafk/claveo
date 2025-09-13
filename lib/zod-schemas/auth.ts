import z from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export const SignInSchema = SignUpSchema.omit({
  name: true,
  confirmPassword: true,
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
