import type { ReactNode } from "react";

export default function DashboardLayout(
  props: Readonly<{ children: ReactNode }>,
) {
  return props.children;
}
