import { queryOptions } from "@tanstack/react-query";
import { ensureUserOrganizationsFn } from "../api/ensure-user-organizations";

export const organizationQueries = {
  all: ["organizations"] as const,
  list: () =>
    queryOptions({
      queryKey: [...organizationQueries.all, "list"],
      queryFn: () => ensureUserOrganizationsFn(),
      staleTime: 1000 * 60 * 5,
    }),
};
