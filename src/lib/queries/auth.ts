import { queryOptions } from "@tanstack/react-query";
import { getSessionFn } from "../services/get-session";
import { ensureUserOrganizationsFn } from "../services/organizations/ensure-user-organizations";

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
