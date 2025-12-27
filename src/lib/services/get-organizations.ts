import { createServerFn } from "@tanstack/react-start";
import { auth, User } from "../auth/config";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { generateRandomSuffix, slugify } from "@/utils/slugify";

async function createUniqueSlug(
  name: string,
  headers: Headers,
): Promise<string> {
  let candidateSlug = slugify(name);

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

async function createDefaultOrganization(headers: Headers, user: User) {
  const slug = await createUniqueSlug(user.name, headers);

  const newOrg = await auth.api.createOrganization({
    headers,
    body: {
      name: `Personal`,
      slug,
      userId: user.id,
    },
  });

  if (!newOrg) throw new Error("Failed to create an org.");
  return newOrg;
}

export const getOrganizationsFn = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  if (!session?.user) throw new Error("Unauthorized");
  const existingOrgs = await auth.api.listOrganizations({
    headers,
  });

  if (existingOrgs && existingOrgs.length > 0) {
    return existingOrgs;
  }

  const newOrg = await createDefaultOrganization(headers, session.user);

  return [newOrg];
});
