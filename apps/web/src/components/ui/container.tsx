import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-content px-5 sm:px-10 lg:px-20", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[13px] font-bold uppercase tracking-[0.08em] text-brand-dark", className)}>
      {children}
    </p>
  );
}
