import Image from "next/image";

// A phone-framed app screenshot: dark device bezel + the rounded screen.
// No bezel image needed; the frame is a rounded padded surface.
export function AppPhone({
  src,
  alt,
  className = "",
  width = "min(300px, 78vw)",
}: {
  src: string;
  alt: string;
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={`rounded-[2.6rem] bg-primary p-[6px] shadow-[0_30px_70px_-20px_rgba(9,5,3,0.45)] ${className}`}
      style={{ width }}
    >
      <Image
        src={src}
        alt={alt}
        width={640}
        height={1391}
        className="block h-auto w-full rounded-[2.15rem]"
        priority={false}
      />
    </div>
  );
}
