import Image from "next/image";
import { cn } from "@/lib/cn";

// Muestra la captura desktop en pantallas >= sm y la mobile por debajo —
// nunca las dos a la vez, para no pedirle al visitante que descargue ambas.
export function ResponsiveShot({
  desktopSrc,
  mobileSrc,
  alt,
  priority = false,
  imgClassName = "h-auto w-full",
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  priority?: boolean;
  imgClassName?: string;
}) {
  return (
    <>
      <Image
        src={desktopSrc}
        alt={alt}
        width={1440}
        height={900}
        priority={priority}
        className={cn("hidden sm:block", imgClassName)}
      />
      <Image
        src={mobileSrc}
        alt={alt}
        width={390}
        height={1180}
        priority={priority}
        className={cn("sm:hidden", imgClassName)}
      />
    </>
  );
}
