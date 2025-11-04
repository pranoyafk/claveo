import type { ReactNode } from "react";
import { SiteLogo } from "@/components/shared/site-logo";
import { Separator } from "@/components/ui/separator";

type AuthPageProps = {
  children: ReactNode;
};

export function AuthPage({ children }: AuthPageProps) {
  return (
    <main className="flex min-h-svh items-center justify-center">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <SiteLogo showText />
          {children}
        </div>
      </div>
    </main>
  );
}

type AuthPageHeaderProps = {
  children: ReactNode;
};

export function AuthPageHeader({ children }: AuthPageHeaderProps) {
  return <div className="mt-6 space-y-2">{children}</div>;
}

type AuthPageTitleProps = {
  children: ReactNode;
};

export function AuthPageTitle({ children }: AuthPageTitleProps) {
  return <h1 className="mt-6 font-semibold text-foreground text-lg">{children}</h1>;
}

type AuthPageDescriptionProps = {
  children: ReactNode;
};

export function AuthPageDescription({ children }: AuthPageDescriptionProps) {
  return <p className="mt-2 text-muted-foreground text-sm">{children}</p>;
}

type AuthPageButtonGroupProps = {
  children: ReactNode;
};

export function AuthPageButtonGroup({ children }: AuthPageButtonGroupProps) {
  return (
    <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">{children}</div>
  );
}

export function AuthPageDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">or</span>
      </div>
    </div>
  );
}

type AuthPageContentProps = {
  children: ReactNode;
};

export function AuthPageContent({ children }: AuthPageContentProps) {
  return <div className="mt-6">{children}</div>;
}

type AuthPageFooterProps = {
  children: ReactNode;
};

export function AuthPageFooter({ children }: AuthPageFooterProps) {
  return <div className="mt-6">{children}</div>;
}
