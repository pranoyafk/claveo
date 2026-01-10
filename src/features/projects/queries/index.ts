import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { getProjectsByOrganization } from "../api/get";
import { createProjectFn } from "../api/create";
import { deleteProjectFn } from "../api/delete";

export const projectsQueries = {
  all: ["projects"],
  byOrganization: (organizationSlug: string) =>
    queryOptions({
      queryKey: [...projectsQueries.all, "byOrganization", organizationSlug],
      queryFn: () => getProjectsByOrganization({ data: { organizationSlug } }),
      staleTime: 1000 * 60 * 5,
    }),
};

export const projectMutations = {
  create: mutationOptions({
    mutationKey: [...projectsQueries.all, "create"],
    mutationFn: createProjectFn,
  }),
  delete: mutationOptions({
    mutationKey: [...projectsQueries.all, "delete"],
    mutationFn: deleteProjectFn,
  }),
};
