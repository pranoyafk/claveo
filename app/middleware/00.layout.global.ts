export default defineNuxtRouteMiddleware(async (to) => {
  const routeStart = to.path;
  const isNavigatingToDashboardPage = routeStart.startsWith("/dashboard");
  const isNavigatingToAuthPage = routeStart.startsWith("/auth");

  if (isNavigatingToDashboardPage) {
    setPageLayout("dashboard");
  } else if (isNavigatingToAuthPage) {
    setPageLayout("auth");
  }
});
