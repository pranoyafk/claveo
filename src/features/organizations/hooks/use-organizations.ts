import { useSuspenseQuery } from "@tanstack/react-query";
import { organizationQueries } from "../queries";

export const useOrganizations = () => {
  return useSuspenseQuery(organizationQueries.list());
};
