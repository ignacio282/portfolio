import Image from "next/image";
import { cn } from "@/lib/cn";

const mediaRadius = {
  none: "rounded-none",
  sm: "rounded-[12px]",
  md: "rounded-[16px]",
  lg: "rounded-[20px]"
};

export function MediaFrame({
  src,
  alt,
  className,
  imageClassName,
  fit = "cover",
  radius = "sm",
  transparent = false,
  priority = false,
  sizes = "(max-width: 768px) 92vw, 560px"
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fit?: "cover" | "contain";
  radius?: keyof typeof mediaRadius;
  transparent?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("media-frame", transparent && "bg-transparent", mediaRadius[radius], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(fit === "cover" ? "object-cover" : "object-contain", imageClassName)}
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}
