import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth/server";

export async function middleware(req: NextRequest) {
  const getSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!getSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*"],
};
