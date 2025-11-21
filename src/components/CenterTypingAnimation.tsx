"use client";

import { useState, useEffect } from "react";

interface CenterTypingAnimationProps {
  text: string;
  className?: string;
  typingSpeed?: number;
}

const CenterTypingAnimation = ({
  text,
  className = "",
  typingSpeed = 150,
}: CenterTypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, typingSpeed]);

  return (
    <div className={`text-center ${className}`}>
      <span className="inline-block">
        {displayedText}
        {!isComplete && <span className="animate-pulse">|</span>}
      </span>
    </div>
  );
};

export default CenterTypingAnimation;