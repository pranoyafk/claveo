import Link from "next/link";

type Size = "sm" | "md" | "lg";

interface ClaveoLogoProps {
  href?: string;
  size?: Size;
  className?: string;
  compact?: boolean; // icon only when true
  ariaLabel?: string;
}

const sizeMap: Record<Size, string> = {
  sm: "w-6 h-6 text-sm",
  md: "w-8 h-8 text-lg",
  lg: "w-10 h-10 text-xl",
};

export function ClaveoLogo({
  href = "/",
  size = "md",
  className = "",
  compact = false,
  ariaLabel = "Claveo — home",
}: ClaveoLogoProps) {
  const sizeClasses = sizeMap[size];

  return (
    <Link href={href} aria-label={ariaLabel} className={`inline-flex items-center gap-3 font-medium ${className}`}>
      {/* Icon wrapper */}
      <div
        className={`flex items-center justify-center rounded-md ${sizeClasses} shrink-0 shadow-sm bg-primary text-primary-foreground`}
        aria-hidden="true"
      >
        {/* Monogram SVG: stylized C that can scale nicely */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-3/4 h-3/4"
          role="img"
          aria-hidden="true"
        >
          {/* Outer thick C */}
          <path
            d="M70 30 A30 30 0 1 0 70 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Full wordmark — hide when compact */}
      {!compact && <span className="select-none text-foreground leading-tight">Claveo</span>}
    </Link>
  );
}
