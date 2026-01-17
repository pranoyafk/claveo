import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect, useParams } from "@tanstack/react-router";
import { organizationQueries } from "../queries";

export const useActiveOrganization = () => {
  const params = useParams({
    from: "/app/$organizationSlug",
  });
  const { data: organizations } = useSuspenseQuery(organizationQueries.list());
  const activeOrg = organizations.find((org) => org.slug === params.organizationSlug);

  if (!activeOrg) {
    throw redirect({
      to: "/app",
    });
  }

  return activeOrg;
};
