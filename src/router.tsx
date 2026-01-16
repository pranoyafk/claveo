import { createRouter, type AnyRouteMatch } from "@tanstack/react-router";

// Import the generated route tree
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    context: {
      queryClient,
    },
    Wrap: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};

type BreadcrumbValue = string | string[] | ((match: AnyRouteMatch) => string | string[]);

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
