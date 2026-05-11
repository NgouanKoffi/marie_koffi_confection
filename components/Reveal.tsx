"use client";

import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  y = 30,
  duration = 1,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ClipReveal({
  children,
  delay = 0,
  className = "",
  direction = "bottom",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "bottom" | "top" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const initial =
    direction === "bottom"
      ? "inset(0 0 100% 0)"
      : direction === "top"
      ? "inset(100% 0 0 0)"
      : direction === "left"
      ? "inset(0 100% 0 0)"
      : "inset(0 0 0 100%)";

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: initial }}
      animate={inView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: initial }}
      transition={{ duration: 1.3, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  children,
  amount = 60,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: -amount }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 1.4, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({
  text,
  delay = 0,
  stagger = 0.04,
  className = "",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.25em]"
        >
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
