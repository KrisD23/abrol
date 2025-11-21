"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedIntroTextProps {
  texts: string[];
  interval?: number;
}

export default function AnimatedIntroText({
  texts,
  interval = 3000,
}: AnimatedIntroTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className="relative h-16 md:h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="text-white font-bold text-lg md:text-xl leading-relaxed text-center absolute inset-0 flex items-center justify-center"
        >
          {texts[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
