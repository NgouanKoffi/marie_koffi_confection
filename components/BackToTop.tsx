"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [scrolled, setScrolled] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function check() {
      setLocked(document.body.style.overflow === "hidden");
    }
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => obs.disconnect();
  }, []);

  const show = scrolled && !locked;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="back to top"
          className="fixed bottom-6 right-6 z-[80] w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md border transition hover:scale-110"
          style={{
            background: "color-mix(in srgb, var(--fg) 90%, transparent)",
            color: "var(--bg)",
            borderColor: "var(--line)",
          }}
        >
          <ArrowUp size={20} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
