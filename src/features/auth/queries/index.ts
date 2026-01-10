import { queryOptions } from "@tanstack/react-query";
import { getSessionFn } from "../api/get-session";

export const authQueries = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, "user"],
      queryFn: () => getSessionFn(),
      staleTime: 1000 * 60 * 5,
    }),
};
