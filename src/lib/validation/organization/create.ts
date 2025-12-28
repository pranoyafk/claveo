import z from "zod";

export const createOrganizationSchema = z.object({
  organizationName: z.string().min(5),
  organizationSlug: z.string(),
});
