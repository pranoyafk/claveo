import { queryOptions } from "@tanstack/react-query";
import { getSessionFn } from "../services/get-session";
import { getOrganizationsFn } from "../services/get-organizations";

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
      queryFn: () => getOrganizationsFn(),
      staleTime: 1000 * 60 * 5,
    }),
};
