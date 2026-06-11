"use client";

import { useEffect, useRef, useState } from "react";

// Scroll-in reveal. Wraps a block and fades + rises it into view the
// first time it crosses the viewport, then disconnects. Motion obeys
// the impeccable rules: opacity + transform only (never layout
// properties), an ease-out-expo curve, no bounce. Honors
// prefers-reduced-motion by showing content immediately with no
// transition.
//
// `delay` staggers siblings (e.g. header then cards). `className`
// passes through so a section can use Reveal AS its inner layout
// container without adding an extra wrapper div.

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion users get the content immediately, no animation.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // Fire a touch before the block is fully in view so it is
      // settling as the user arrives, not popping after.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`terrain-reveal ${shown ? "terrain-reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
