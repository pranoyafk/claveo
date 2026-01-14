import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Page({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("space-y-10 max-w-360 mx-auto", className)} {...props}>
      {props.children}
    </section>
  );
}

export function PageHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=page-description]:grid-rows-[auto_auto]",
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export function PageTitle({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-lg font-semibold", className)} {...props}>
      {props.children}
    </h1>
  );
}
export function PageDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p data-slot="page-description" className={cn("text-muted-foreground text-sm", className)} {...props}>
      {props.children}
    </p>
  );
}
export function PageAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="page-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end my-auto", className)}
      {...props}
    >
      {props.children}
    </div>
  );
}

export function PageContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn(className)} {...props}>
      {props.children}
    </div>
  );
}
