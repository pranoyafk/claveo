type SiteLogoProps = {
  showText?: boolean;
};

export function SiteLogo({ showText = false }: SiteLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-primary">
        <span className="font-bold text-lg text-primary-foreground">C</span>
      </div>
      {showText && <span className="font-bold text-xl">Claveo</span>}
    </div>
  );
}
