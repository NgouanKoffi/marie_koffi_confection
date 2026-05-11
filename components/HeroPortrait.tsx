"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/app/[lang]/dictionaries";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroPortrait({ lang }: { lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(my, [0, 1], [4, -4]), {
    stiffness: 80,
    damping: 18,
  });
  const tiltY = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 80,
    damping: 18,
  });
  const marieX = useSpring(useTransform(mx, [0, 1], ["-2%", "2%"]), {
    stiffness: 60,
    damping: 20,
  });
  const marieY = useSpring(useTransform(my, [0, 1], ["-2%", "2%"]), {
    stiffness: 60,
    damping: 20,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full aspect-square max-w-[560px] [perspective:1500px]"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2, ease, delay: 0.2 }}
        className="absolute inset-[5%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
          className="absolute inset-0"
          style={{
            filter:
              "drop-shadow(0 30px 40px color-mix(in srgb, var(--accent) 35%, transparent))",
          }}
        >
          <Image
            src="/incrustation.png"
            alt=""
            fill
            sizes="(min-width: 768px) 35vw, 90vw"
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease, delay: 0.7 }}
          style={{ x: marieX, y: marieY }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full"
            style={{
              filter:
                "drop-shadow(0 50px 30px rgba(0,0,0,0.35)) drop-shadow(0 0 20px color-mix(in srgb, var(--accent) 30%, transparent))",
            }}
          >
            <Image
              src="/marie-cutout.png"
              alt="Marie Koffi"
              fill
              sizes="(min-width: 768px) 35vw, 90vw"
              className="object-contain object-bottom"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.6 }}
        className="absolute top-[6%] -right-2 md:-right-6 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 bg-[var(--card)] px-3 py-2 rounded-full ring-1 shadow-xl"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] pulse-dot" />
          <span className="font-mono text-[9px] tracking-widest uppercase">
            FW · 2026
          </span>
        </motion.div>
      </motion.div>

<motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 2 }}
        className="absolute top-[42%] -left-1 md:-left-4 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[var(--accent)] text-white shadow-xl"
        >
          <span className="font-display italic text-2xl font-light">✦</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: 2.1 }}
        className="absolute -bottom-2 right-[10%] z-20 pointer-events-none"
      >
        <motion.svg
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 md:w-20 md:h-20"
        >
          <defs>
            <path
              id="circlePath2"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
          </defs>
          <text
            fill="var(--fg)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.22em",
            }}
          >
            <textPath href="#circlePath2">
              SIGNATURE · MKC · ABIDJAN · CI ·
            </textPath>
          </text>
        </motion.svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[28%] right-[8%] w-2 h-2 rounded-full bg-[var(--accent)] pointer-events-none opacity-70 z-20"
      />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[35%] left-[12%] w-1.5 h-1.5 rounded-full bg-[var(--accent-soft)] pointer-events-none z-20"
      />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[12%] left-[28%] w-1 h-1 rounded-full bg-[var(--fg)] pointer-events-none opacity-50 z-20"
      />
    </div>
  );
}
