import Image from "next/image";
import { photo, type ImageKey } from "@/content/images";
import { cn } from "@/lib/utils";

type Props = {
  image: ImageKey;
  sizes: string;
  priority?: boolean;
  /** object-position, e.g. "50% 30%" */
  focus?: string;
  /** Pass "" for a decorative repeat of a photo described elsewhere. */
  alt?: string;
  className?: string;
};

/** A photo that fills its (sized) parent. */
export function Photo({ image, sizes, priority, focus, alt, className }: Props) {
  const p = photo(image);
  return (
    <Image
      className={cn("photo", className)}
      src={p.src}
      width={p.width}
      height={p.height}
      alt={alt ?? p.alt}
      sizes={sizes}
      priority={priority}
      draggable={false}
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}

/** A photo set in a pointed Gothic arch, the shape of the church's own door. */
export function ArchPhoto({ className, ...props }: Props) {
  return (
    <div className={cn("arch", className)}>
      <Photo {...props} />
    </div>
  );
}
