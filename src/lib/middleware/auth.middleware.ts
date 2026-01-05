import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { auth } from "../auth/config";

export const authMiddleware = createMiddleware().server(async ({ request, next }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw redirect({
      to: "/sign-in",
    });
  }

  return next({
    context: {
      session,
    },
  });
});
