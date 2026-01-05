import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(50, "Project name cannot exceed 50 characters").trim(),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(60, "Slug cannot exceed 60 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, numbers, and hyphens only"),

  description: z.string().max(500, "Description cannot exceed 500 characters").trim().optional(),
  organizationId: z.string().min(1, "Organization ID is required").max(50, "Organization ID cannot exceed 50 characters").trim(),
});
