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

export function HeaderBreadcrumb() {
  const matches = useMatches();
  const breadcrumbs = Array.from(
    new Map(
      matches
        .filter((m) => m.context.crumb)
        .map((m) => [
          m.pathname.endsWith("/") ? m.pathname.slice(0, -1) : m.pathname,
          { label: m.context.crumb, path: m.pathname },
        ]),
    ).values(),
  );

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
