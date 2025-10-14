// src/components/ui/blur-text.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  delay?: number;
  animateBy?: "words" | "letters";
}

const BlurText = ({
  text,
  className,
  variant,
  duration = 1,
  delay = 0,
  animateBy = "words",
}: BlurTextProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  const MotionText = ({ children }: { children: React.ReactNode }) => (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{
        duration,
        ease: "easeOut",
      }}
      variants={combinedVariants}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (animateBy === "words") {
    const words = text.split(" ");
    return (
      <div className={cn("font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]", className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            transition={{
              duration,
              delay: delay + i * 0.2,
              ease: "easeOut",
            }}
            variants={combinedVariants}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  }

  if (animateBy === "letters") {
    const letters = text.split("");
    return (
      <div className={cn("font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]", className)}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            transition={{
              duration,
              delay: delay + i * 0.05,
              ease: "easeOut",
            }}
            variants={combinedVariants}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      variants={combinedVariants}
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className
      )}
    >
      {text}
    </motion.div>
  );
};

export default BlurText;