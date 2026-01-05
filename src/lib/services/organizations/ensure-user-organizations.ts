import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth/config";
import { authMiddleware } from "@/lib/middleware/auth.middleware";
import { generateRandomSuffix, slugify } from "@/utils/slugify";

async function createUniqueSlug(name: string, headers: Headers): Promise<string> {
  const candidateSlug = slugify(name);
  try {
    await auth.api.checkOrganizationSlug({
      body: {
        slug: candidateSlug,
      },
      headers,
    });
    return candidateSlug;
  } catch {
    return slugify(`${candidateSlug}-${generateRandomSuffix()}`);
  }
}

export const ensureUserOrganizationsFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const headers = getRequestHeaders();
    const existingOrgs = await auth.api.listOrganizations({
      headers,
    });

    if (existingOrgs.length > 0) {
      return existingOrgs;
    }
    const slug = await createUniqueSlug(context.session.user.name, headers);
    const newOrg = await auth.api.createOrganization({
      headers,
      body: {
        name: `Personal`,
        slug,
        userId: context.session.user.id,
      },
    });

    if (!newOrg) throw new Error("Failed to create an org.");
    return [newOrg];
  });
