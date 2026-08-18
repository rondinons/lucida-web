import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 font-display", className)}
      aria-label="Lúcida — inicio"
    >
      <Image
        src="/brand/lucida-simbolo.svg"
        alt=""
        width={36}
        height={34}
        className="h-8 w-auto shrink-0"
        priority
      />
      <span className={cn("text-xl font-semibold", inverted ? "text-white" : "text-brand-ink")}>
        Lúcida
      </span>
    </Link>
  );
}
