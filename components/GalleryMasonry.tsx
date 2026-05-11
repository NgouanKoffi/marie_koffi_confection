"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryImages } from "@/lib/images";

export default function GalleryMasonry() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );
  const next = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i + 1) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="masonry">
        {galleryImages.map((img, idx) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (idx % 8) * 0.04 }}
            onClick={() => setActive(idx)}
            className="relative w-full block overflow-hidden group hover-zoom"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={1000}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 48vw, 95vw"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-white/90 opacity-0 group-hover:opacity-100 transition duration-500">
              {String(idx + 1).padStart(2, "0")} / {galleryImages.length}
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white opacity-0 group-hover:opacity-100 transition duration-500">
              <span className="font-display italic text-base">
                Look n°{String(idx + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] tracking-widest">→</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[var(--fg)]/97 backdrop-blur-2xl"
            onClick={close}
          >
            <div className="absolute top-0 inset-x-0 z-10 px-6 sm:px-10 py-5 flex items-center justify-between text-[var(--cream)]">
              <span className="font-mono text-[10px] tracking-widest">
                MARIE KOFFI CONFECTION · LOOKBOOK
              </span>
              <span className="font-mono text-[10px] tracking-widest">
                {String(active + 1).padStart(2, "0")} / {galleryImages.length}
              </span>
              <button
                onClick={close}
                aria-label="close"
                className="p-2 hover:rotate-90 transition duration-500"
              >
                <X size={20} />
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="prev"
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 text-[var(--cream)] hover:text-[var(--accent-soft)] transition"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="next"
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 text-[var(--cream)] hover:text-[var(--accent-soft)] transition"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 flex items-center justify-center px-12 sm:px-20 py-20"
            >
              <div className="relative w-full max-w-5xl h-full">
                <Image
                  src={galleryImages[active].src}
                  alt={galleryImages[active].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            <div className="absolute bottom-6 inset-x-0 text-center text-[var(--cream)]/70">
              <span className="font-display italic text-2xl">
                Look n°{String(active + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
