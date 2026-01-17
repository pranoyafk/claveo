import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { authQueries } from "../queries";

export const useAuth = () => {
  const { data: authState } = useSuspenseQuery(authQueries.user());
  if (!authState) {
    throw redirect({
      to: "/",
    });
  }

  return {
    authState,
  };
};
