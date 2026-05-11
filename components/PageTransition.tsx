"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={`overlay-${pathname}`}
        initial={{ scaleY: 1, originY: 1 }}
        animate={{ scaleY: 0, originY: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="fixed inset-0 z-[90] pointer-events-none"
        style={{ background: "var(--fg)" }}
      />
      <motion.div
        key={`content-${pathname}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
