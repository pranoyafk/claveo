import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import z from "zod";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db";
import { authMiddleware } from "@/lib/middleware/auth.middleware";

export const getProjectsByOrganization = createServerFn()
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
