"use client";

import { createContext, type ReactNode, useContext } from "react";
import { authClient, type UserType } from "@/lib/auth/client";

const AuthContext = createContext<{ user: UserType | null } | null>(null);

function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Authenticated components must be used within Auth.Root");
  }
  return context;
}

interface RootProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function Root(props: RootProps) {
  const { data, isPending } = authClient.useSession();
  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
      }}
    >
      {isPending ? props?.fallback : props.children}
    </AuthContext.Provider>
  );
}

interface AuthenticatedProps {
  children: ((user: UserType) => ReactNode) | ReactNode;
}

export function Authenticated(props: AuthenticatedProps) {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  if (typeof props.children === "function") {
    return props.children(user);
  }

  return props.children;
}

interface UnauthenticatedProps {
  children: ReactNode;
}

export function Unauthenticated(props: UnauthenticatedProps) {
  const { user } = useUser();

  if (!user) {
    return props.children;
  }

  return null;
}

export const Auth = { Root, Authenticated, Unauthenticated };
