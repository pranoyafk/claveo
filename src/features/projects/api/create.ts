import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { authMiddleware } from "@/lib/middleware/auth.middleware";
import { createProjectSchema } from "@/features/projects/schemas/create";
import { canCreateProject } from "@/lib/auth/utils";

export const createProjectFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(createProjectSchema)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const hasPerms = await canCreateProject({ headers: headers, organizationId: data.organizationId });
    if (!hasPerms) {
      throw new Error("You do not have permission to create a project");
    }
    const isProjectSlugExist = await db.query.projects.findFirst({
      where: {
        organizationId: data.organizationId,
        slug: data.slug,
      },
    });

    if (isProjectSlugExist) {
      throw new Error("Project slug already exists");
    }

    const [newProject] = await db
      .insert(projects)
      .values({
        name: data.name,
        description: data.description,
        slug: data.slug,
        organizationId: data.organizationId,
      })
      .returning();

    return newProject;
  });
