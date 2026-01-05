import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { authMiddleware } from "@/lib/middleware/auth.middleware";
import { createProjectSchema } from "@/lib/validation/projects/create";
import { createServerFn } from "@tanstack/react-start";

export const createProjectFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(createProjectSchema)
  .handler(async ({ data }) => {
    const isProjectSlugExist = await db.query.projects.findFirst({
      where: {
        slug: data.slug,
      },
    });

    if (isProjectSlugExist) {
      throw new Error("Project slug already exists");
    }

    const [newProject] = await db.insert(projects).values({
      name: data.name,
      description: data.description,
      slug: data.slug,
      organizationId: data.organizationId,
    });

    if (!newProject) {
      throw new Error("Failed to create project");
    }

    return newProject;
  });
