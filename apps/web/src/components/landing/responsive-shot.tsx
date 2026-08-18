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
  desktopWidth = 1440,
  desktopHeight = 900,
  mobileWidth = 390,
  mobileHeight = 1180,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  priority?: boolean;
  imgClassName?: string;
  desktopWidth?: number;
  desktopHeight?: number;
  mobileWidth?: number;
  mobileHeight?: number;
}) {
  return (
    <>
      <Image
        src={desktopSrc}
        alt={alt}
        width={desktopWidth}
        height={desktopHeight}
        priority={priority}
        className={cn("hidden sm:block", imgClassName)}
      />
      <Image
        src={mobileSrc}
        alt={alt}
        width={mobileWidth}
        height={mobileHeight}
        priority={priority}
        className={cn("sm:hidden", imgClassName)}
      />
    </>
  );
}
