import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button text-[15px] font-semibold transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-cta text-brand-dark hover:bg-brand-cta-hover",
  secondary:
    "border border-brand-dark-border bg-transparent text-brand-dark hover:bg-brand-lavender",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-12 px-6",
  lg: "h-[52px] px-7 text-base",
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: StyleProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "default",
  className,
  children,
  href,
  ...props
}: StyleProps & React.ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}

export function TextLink({
  className,
  children,
  ...props
}: { className?: string; children: React.ReactNode } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-dark transition-colors duration-150 ease-out hover:text-brand-primary",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
