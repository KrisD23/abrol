"use client";

import { useState, useEffect } from "react";

interface MultiLineTypingAnimationProps {
  textSets: Array<[string, string]>; // Array of [line1, line2, line3]
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  isMobile?: boolean;
  loop?: boolean;
}

const MultiLineTypingAnimation = ({
  textSets,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 3000,
  isMobile = false,
  loop = false,
}: MultiLineTypingAnimationProps) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaitingToDelete, setIsWaitingToDelete] = useState(false);

  const currentSet = textSets[currentSetIndex];

  useEffect(() => {
    if (isWaitingToDelete) {
      const timeout = setTimeout(() => {
        setIsWaitingToDelete(false);
        setIsDeleting(true);
        setCurrentLineIndex(2); // Start deleting from the last line
        setCurrentText(completedLines[2] || "");
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    const targetText = currentSet[currentLineIndex] || "";

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < targetText.length) {
            setCurrentText(targetText.slice(0, currentText.length + 1));
          } else {
            // Finished typing current line
            const newCompletedLines = [...completedLines];
            newCompletedLines[currentLineIndex] = targetText;
            setCompletedLines(newCompletedLines);

            if (currentLineIndex < 2) {
              // Move to next line
              setCurrentLineIndex(currentLineIndex + 1);
              setCurrentText("");
            } else {
              // All lines completed
              if (loop) {
                // Wait then start deleting
                setIsWaitingToDelete(true);
              }
              // If not looping, just stay completed
            }
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Finished deleting current line, update completed lines
            const newCompletedLines = [...completedLines];
            newCompletedLines[currentLineIndex] = "";
            setCompletedLines(newCompletedLines);

            if (currentLineIndex > 0) {
              // Move to previous line for deletion
              setCurrentLineIndex(currentLineIndex - 1);
              setCurrentText(newCompletedLines[currentLineIndex - 1] || "");
            } else {
              // All lines deleted, move to next text set
              setIsDeleting(false);
              setCurrentSetIndex((prev) => (prev + 1) % textSets.length);
              setCurrentLineIndex(0);
              setCurrentText("");
              setCompletedLines([]);
            }
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentLineIndex,
    currentSetIndex,
    isDeleting,
    isWaitingToDelete,
    textSets,
    completedLines,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    currentSet,
    loop,
  ]);

  return (
    <>
      {/* First Line */}
      <div className="mb-2 min-h-[1.2em]">
        <span className={`whitespace-nowrap block font-bebas-neue font-bold ${className}`}>
          {currentLineIndex === 0 ? currentText : completedLines[0] || ""}
          {currentLineIndex === 0 && <span className="animate-pulse">|</span>}
        </span>
      </div>

      {/* Second Line */}
      <div className="mb-2 min-h-[1.2em]">
        <span className={`whitespace-nowrap block font-bebas-neue font-bold ${className}`}>
          {currentLineIndex === 1 ? currentText : completedLines[1] || ""}
          {(currentLineIndex === 1 ||
            (currentLineIndex > 1 && completedLines[1] && !loop)) && (
            <span className="animate-pulse duration-1000"> |</span>
          )}
        </span>
      </div>

      {/* Third Line */}
      <div className="min-h-[1.2em]">
        <span className={`whitespace-nowrap block font-bebas-neue font-bold ${className}`}>
          {currentLineIndex === 2 ? currentText : completedLines[2] || ""}
          {currentLineIndex === 2 && !isWaitingToDelete && loop && (
            <span className="animate-pulse">|</span>
          )}
        </span>
      </div>
    </>
  );
};

export default MultiLineTypingAnimation;
