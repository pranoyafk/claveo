import { getSessionFn } from "@/lib/services/auth/get-session";
import { ensureUserOrganizationsFn } from "@/lib/services/organizations/ensure-user-organizations";
import { queryOptions } from "@tanstack/react-query";

export const authQueries = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, "user"],
      queryFn: () => getSessionFn(),
      staleTime: 1000 * 60 * 5,
    }),

  organizations: () =>
    queryOptions({
      queryKey: [...authQueries.all, "organizations"],
      queryFn: () => ensureUserOrganizationsFn(),
      staleTime: 1000 * 60 * 5,
    }),
};
