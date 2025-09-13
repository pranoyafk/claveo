import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <p className="text-lg text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
