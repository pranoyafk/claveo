import { type Icon, IconBriefcase, IconDashboard, IconLifebuoy, IconSend } from "@tabler/icons-react";

export interface INavigationItem {
  title: string;
  href: __next_route_internal_types__.RouteImpl<string>;
  icon: Icon;
  disabled: boolean;
}
export interface INavigationGroup {
  title: string;
  items: INavigationItem[];
}

export interface INavigationConfig {
  primary: INavigationGroup[];
  secondary: INavigationItem[];
}

/**
 * Primary navigation groups for the main sidebar
 */
const PRIMARY_NAVIGATION: INavigationGroup[] = [
  {
    title: "Platform",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: IconDashboard,
        disabled: false,
      },
      {
        title: "Projects",
        href: "/dashboard/projects",
        icon: IconBriefcase,
        disabled: false,
      },
    ],
  },
];

/**
 * Secondary navigation items (usually in footer of sidebar)
 */
const SECONDARY_NAVIGATION: INavigationItem[] = [
  {
    title: "Support",
    href: "#",
    icon: IconLifebuoy,
    disabled: false,
  },
  {
    title: "Feedback",
    href: "/",
    icon: IconSend,
    disabled: false,
  },
];

export const navigationConfig: INavigationConfig = {
  primary: PRIMARY_NAVIGATION,
  secondary: SECONDARY_NAVIGATION,
} as const;
