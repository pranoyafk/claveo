import { auth } from "@/lib/auth/config";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const getSessionFn = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const sessionData = await auth.api.getSession({ headers });

  return sessionData;
});
