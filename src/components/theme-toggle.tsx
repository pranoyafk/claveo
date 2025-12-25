import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="ghost"
      size="icon-sm"
      className={className}
    >
      {theme === "dark" && <IconSun className="size-4" />}
      {theme === "light" && (
        <IconMoon className="size-4 text-muted-foreground" />
      )}
    </Button>
  );
}
