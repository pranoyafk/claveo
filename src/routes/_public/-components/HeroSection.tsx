import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center overflow-hidden py-12 md:py-16 bg-background selection:bg-primary/20">
      <div className="container flex flex-col items-center px-4 md:px-6">
        {/* Version Badge */}
        <Link
          to="/changelog"
          className="group mb-6 inline-flex items-center justify-center rounded-full border border-border/40 bg-background/80 p-1 pr-3 text-sm backdrop-blur-md transition-all hover:border-primary/40 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary transition-colors group-hover:bg-primary/20">
            v3.0
          </span>
          <span className="mx-2 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            See the changelog
          </span>
          <IconArrowRight className="h-3 w-3 text-muted-foreground/70 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Main Heading */}
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
            <span className="text-muted-foreground/60 font-light tracking-tight">
              Show your{" "}
            </span>
            <span className="bg-linear-to-b from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent font-bold">
              Clients{" "}
            </span>
            <span className="text-muted-foreground/60 font-light tracking-tight">
              exactly{" "}
            </span>
            <br className="hidden md:block" />
            <span className="bg-linear-to-b from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent font-bold">
              what's happening.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-balance text-base text-muted-foreground md:text-lg font-normal leading-relaxed tracking-wide">
            Stop writing long update emails. Create a timeline, share the secure
            link, and give your clients instant clarity.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group h-11 min-w-full sm:min-w-35 rounded-full px-6 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95 md:h-12 md:min-w-40 md:text-base"
            >
              Start for free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group h-11 min-w-full sm:min-w-35 rounded-full border-border/50 bg-background/50 px-6 text-sm backdrop-blur-sm transition-all hover:bg-muted/50 hover:border-primary/20 active:scale-95 md:h-12 md:min-w-40 md:text-base"
            >
              View Demo
              <IconArrowRight className="ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
