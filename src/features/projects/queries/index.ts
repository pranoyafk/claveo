import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createProjectFn } from "../api/create";
import { deleteProjectFn } from "../api/delete";
import { getProjectBySlugFn, getProjectsByOrganizationFn } from "../api/get";

export const projectsQueries = {
  all: ["projects"],
  byOrganization: (organizationSlug: string) =>
    queryOptions({
      queryKey: [...projectsQueries.all, "byOrganization", organizationSlug],
      queryFn: () => getProjectsByOrganizationFn({ data: { organizationSlug } }),
      staleTime: 1000 * 60 * 5,
    }),

  bySlug: (input: { projectSlug: string; organizationSlug: string }) =>
    queryOptions({
      queryKey: [...projectsQueries.all, input.organizationSlug, input.projectSlug],
      queryFn: () =>
        getProjectBySlugFn({
          data: input,
        }),
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
