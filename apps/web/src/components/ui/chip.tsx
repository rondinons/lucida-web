import { cn } from "@/lib/cn";

export function Chip({
  children,
  tone = "lavender",
  className,
}: {
  children: React.ReactNode;
  tone?: "lavender" | "mint";
  className?: string;
}) {
  const toneClasses =
    tone === "mint" ? "bg-brand-mint text-brand-forest" : "bg-brand-lavender text-brand-purple-dark";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-chip px-3 py-1 text-[13px] font-semibold",
        toneClasses,
        className,
      )}
    >
      {children}
    </span>
  );
}
