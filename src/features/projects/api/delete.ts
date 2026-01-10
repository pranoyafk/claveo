import { auth } from "@/lib/auth/config";
import { canDeleteProject } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { authMiddleware } from "@/lib/middleware/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, eq } from "drizzle-orm";
import z from "zod";

export const deleteProjectFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      organizationSlug: z.string().min(1),
      projectSlug: z.string().min(1),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const org = await auth.api.getFullOrganization({
      query: {
        organizationSlug: data.organizationSlug,
      },
      headers,
    });

    if (!org) throw new Error("Invalid organization slug.");

    const hasPerms = await canDeleteProject({ headers, organizationId: org.id });

    if (!hasPerms) throw new Error("You do not have permission to delete this project.");

    const project = await db.query.projects.findFirst({
      where: {
        slug: data.projectSlug,
        organizationId: org.id,
      },
    });

    if (!project) throw new Error("Invalid project slug.");

    await db.delete(projects).where(and(eq(projects.id, project.id), eq(projects.organizationId, org.id)));

    return {
      success: true,
    };
  });
