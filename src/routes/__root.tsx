import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getThemeServerFn } from "@/lib/theme";
import appCss from "@/styles.css?url";
import type { QueryClient } from "@tanstack/react-query";

interface Context {
  queryClient: QueryClient;
  crumb?: string;
}

export const Route = createRootRouteWithContext<Context>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  loader: () => getThemeServerFn(),
  shellComponent: RootDocument,
  notFoundComponent: () => <h1>Not Found</h1>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const theme = Route.useLoaderData();
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          {children}
          <Toaster />
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
