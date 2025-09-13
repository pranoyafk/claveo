import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

export type SessionType = (typeof authClient.$Infer.Session)["session"];
export type UserType = (typeof authClient.$Infer.Session)["user"];
