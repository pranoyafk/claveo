import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "./-components/HeroSection";

export const Route = createFileRoute("/_public/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
