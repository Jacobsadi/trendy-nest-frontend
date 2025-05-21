"use client";

import React, { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react"; // Assuming framer-motion

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
  /** Horizontal padding added to the calculated width of the text */
  textWidthPadding?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
  textWidthPadding = 20, // Reduced from 30, can be adjusted
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLDivElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + textWidthPadding;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex, words, textWidthPadding]); // Added words & textWidthPadding

  useEffect(() => {
    if (words.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  useEffect(() => {
    // Ensure initial width is calculated on mount and when words/padding change
    updateWidthForWord();
  }, [words, textWidthPadding]); // Re-calculate if words or padding prop changes

  if (words.length === 0) {
    return null;
  }

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }} // e.g., 0.35s if animationDuration is 700
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center font-bold text-black dark:text-white",
        "text-4xl md:text-5xl lg:text-6xl", // Applied new text sizes
        "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        "dark:[background:linear-gradient(to_bottom,#374151,#1f2937)]",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]",
        className
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000, // e.g., 0.7s
          ease: "easeInOut",
        }}
        // Added tracking-normal here to reset letter spacing.
        // Use tracking-tight or tracking-tighter if you need less space.
        className={cn("inline-block tracking-normal", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block whitespace-nowrap">
          {" "}
          {/* Added whitespace-nowrap */}
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={`${words[currentWordIndex]}-letter-${index}-${id}`}
              initial={{
                opacity: 0,
                filter: "blur(8px)", // Slightly reduced blur for sharpness with smaller text
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.025, // Slightly increased delay for clarity
                duration: animationDuration / 1600, // Adjusted duration
                ease: "easeOut",
              }}
              className="inline-block" // Explicitly inline-block for consistent behavior
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
