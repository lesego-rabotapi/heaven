import Image from "next/image";
import { photo, type ImageKey } from "@/content/images";

type Props = {
  image: ImageKey;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Decorative duplicates (marquee copies) pass an empty alt. */
  alt?: string;
  /** CSS object-position, for crops that need a focal point. */
  focus?: string;
};

/** A photo that fills its (positioned, sized) parent. */
export function Photo({ image, sizes, priority, className, alt, focus }: Props) {
  const p = photo(image);
  return (
    <Image
      src={p.src}
      alt={alt ?? p.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: "cover", objectPosition: focus }}
      draggable={false}
    />
  );
}

/** A photo behind the pointed Gothic arch, the site's one recurring shape. */
export function ArchPhoto({
  className = "",
  children,
  ...rest
}: Props & { children?: React.ReactNode }) {
  return (
    <div className={`arch ${className}`}>
      <Photo {...rest} />
      {children}
    </div>
  );
}
