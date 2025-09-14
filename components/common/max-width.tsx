// components/MaxWidthWrapper.tsx

import clsx from "clsx";
import type { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

export function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
