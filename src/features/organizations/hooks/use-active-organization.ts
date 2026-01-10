import { useRouteContext } from "@tanstack/react-router";

export const useActiveOrganization = () => {
  const { activeOrg } = useRouteContext({
    from: "/app/$organizationSlug",
  });

  return activeOrg;
};
