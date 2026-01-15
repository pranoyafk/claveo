import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware/auth.middleware";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import z from "zod";

export const getProjectsByOrganizationFn = createServerFn()
  .inputValidator(
    z.object({
      organizationSlug: z.string().min(1),
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

    if (!org) {
      throw new Error("Invalid organization slug passed.");
    }
    const projects = await db.query.projects.findMany({
      where: {
        organizationId: org.id,
      },
    });

    return projects;
  });

export const getProjectBySlugFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      projectSlug: z.string(),
      organizationSlug: z.string(),
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

    if (!org) {
      throw new Error("Invalid organization slug passed.");
    }

    const project = await db.query.projects.findFirst({
      where: {
        organizationId: org.id,
        slug: data.projectSlug,
      },
    });

    if (!project) throw new Error("Invalid Project Slug");
    return project;
  });
