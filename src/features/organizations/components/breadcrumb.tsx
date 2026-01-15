import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useMatches } from "@tanstack/react-router";
import { Fragment } from "react";

type ResolvedBreadcrumbItem = {
  path: string;
  label: string;
};

export function HeaderBreadcrumb() {
  const matches = useMatches();
  const breadcrumbs: ResolvedBreadcrumbItem[] = matches.flatMap((match) => {
    const staticData = match.staticData;
    if (!staticData.breadcrumb) return [];

    const breadcrumbValue =
      typeof staticData.breadcrumb === "function" ? staticData.breadcrumb(match) : staticData.breadcrumb;

    const items = Array.isArray(breadcrumbValue) ? breadcrumbValue : [breadcrumbValue];
    return items.map((item) => ({
      label: item,
      path: match.pathname,
    }));
  });
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLastCrumb = index === breadcrumbs.length - 1;
          if (!isLastCrumb)
            return (
              <Fragment key={crumb.path}>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to={crumb.path} />}>{crumb.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          return (
            <BreadcrumbItem key={crumb.path}>
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
