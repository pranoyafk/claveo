import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { projectsQueries } from "../queries";

export const useProject = () => {
  const params = useParams({
    from: "/app/$organizationSlug/$projectSlug",
  });
  const { data: project } = useSuspenseQuery(projectsQueries.bySlug(params));

  return project;
};
