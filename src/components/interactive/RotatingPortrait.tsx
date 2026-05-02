"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Portrait = {
  src: string;
  alt: string;
  treatment?: string;
  caption?: string;
};

export function RotatingPortrait({
  portraits,
  intervalMs = 6000,
}: {
  portraits: readonly Portrait[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause the rotation when scrolled out of view to avoid wasted timers/repaints.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (portraits.length < 2 || paused || !visible) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % portraits.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [portraits.length, paused, visible, intervalMs]);

  const current = portraits[index];

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden rounded-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current.src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 380px"
            priority={index === 0}
            className={cn("object-cover", current.treatment)}
          />
          <div className="portrait-vignette absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {current.caption && (
        <div className="absolute bottom-3 left-3 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          {current.caption}
        </div>
      )}

      {portraits.length > 1 && (
        <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
          {portraits.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show portrait ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-white/85" : "w-1.5 bg-white/35 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
