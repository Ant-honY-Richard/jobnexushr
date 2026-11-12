import { cn } from "@/lib/cn";
import { JN_LOGO_VECTOR } from "@/lib/jn-logo-vector";

type LogoProps = {
  className?: string;
  /** "dark" = logo for light backgrounds, "light" = logo for dark backgrounds */
  color?: "dark" | "light";
  /** Kept for API compatibility (the inline SVG needs no preloading). */
  priority?: boolean;
};

/**
 * Official Job Nexus HR logo as an inline vector (crisp at any size, no image request).
 * Paths: src/lib/jn-logo-vector.ts — ribbon + "JN" traced from the original artwork, banner text set
 * in Geist SemiBold outlines. Static copies: public/logo.svg, logo-light.svg (and PNG renders).
 * Size it from the parent, e.g. <div className="h-12"><Logo /></div>.
 */
export function Logo({ className, color = "dark" }: LogoProps) {
  return (
    <svg
      viewBox={JN_LOGO_VECTOR.viewBox}
      role="img"
      aria-label="Job Nexus HR"
      className={cn("h-full w-auto", className)}
    >
      <path fill="#0E956A" d={JN_LOGO_VECTOR.ribbon} />
      <path fill="#FFFFFF" d={JN_LOGO_VECTOR.text} />
      <path fill={color === "dark" ? "#15160E" : "#FAF9F7"} fillRule="evenodd" d={JN_LOGO_VECTOR.jn} />
    </svg>
  );
}
