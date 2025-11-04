"use client";
import { Toaster } from "../ui/sonner";
import { ThemeProvider } from "./themes";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster richColors />
    </ThemeProvider>
  );
}
