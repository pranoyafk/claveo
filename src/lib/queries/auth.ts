import { queryOptions } from "@tanstack/react-query";
import { getSessionFn } from "../services/get-session";

export const authQueries = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, "user"],
      queryFn: () => getSessionFn(),
      staleTime: 5000,
    }),
};
