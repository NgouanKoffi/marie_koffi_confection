"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import SmartImage from "./SmartImage";

type Image = { src: string; alt: string };

export default function ProductGallery({ images }: { images: Image[] }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => setZoomed(false), []);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!zoomed) return;
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
  }, [zoomed, close, prev, next]);

  const current = images[active];

  return (
    <>
      <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4">
        <div className="flex flex-col gap-2 max-h-[700px] overflow-y-auto no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => setActive(idx)}
              aria-label={`view ${idx + 1}`}
              aria-current={idx === active ? "true" : undefined}
              className={`relative aspect-[3/4] overflow-hidden transition ${
                idx === active
                  ? "ring-2 ring-[var(--accent)] opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <SmartImage
                wrapperClassName="w-full h-full"
                src={img.src}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => setZoomed(true)}
          aria-label="zoom"
          className="group relative block aspect-[3/4] w-full overflow-hidden cursor-zoom-in bg-[var(--paper)]"
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SmartImage
              wrapperClassName="w-full h-full"
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
              priority={active === 0}
            />
          </motion.div>
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <ZoomIn size={14} />
          </div>
          <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-white bg-black/40 backdrop-blur px-2 py-1">
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
          {images.length > 1 && (
            <>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prev();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    prev();
                  }
                }}
                aria-label="previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 text-black opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <ChevronLeft size={16} />
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  next();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    next();
                  }
                }}
                aria-label="next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 text-black opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <ChevronRight size={16} />
              </span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl"
            onClick={close}
          >
            <div
              className="absolute top-0 inset-x-0 z-30 px-4 sm:px-10 py-4 flex items-center justify-between text-white gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-[10px] tracking-widest">
                {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                onClick={close}
                aria-label="close"
                className="p-2 hover:rotate-90 transition duration-500"
              >
                <X size={22} />
              </button>
            </div>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 pt-14 pb-20 px-2 sm:px-16"
            >
              <SmartImage
                wrapperClassName="w-full h-full"
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="prev"
                  className="absolute z-40 left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition backdrop-blur-md"
                >
                  <ChevronLeft size={28} strokeWidth={1.5} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="next"
                  className="absolute z-40 right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition backdrop-blur-md"
                >
                  <ChevronRight size={28} strokeWidth={1.5} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
