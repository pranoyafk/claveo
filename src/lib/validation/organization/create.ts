import z from "zod";

export const createOrganizationSchema = z.object({
  organizationName: z
    .string()
    .min(5)
    .regex(/^[a-zA-Z0-9 ]+$/, { message: "No special characters allowed" }),
  organizationSlug: z.string().regex(/^[a-zA-Z0-9]+$/, {
    message: "Only alphanumeric characters allowed",
  }),
});
