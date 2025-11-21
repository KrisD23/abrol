"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ScrollStackCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface ScrollStackProps {
  cards: ScrollStackCard[];
}

const ScrollStack = ({ cards }: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative">
      {cards.map((card, index) => {
        const targetScale = 1 - (cards.length - index) * 0.05;
        const isEven = index % 2 === 0; // 0, 2, 4... (first, third, fifth...) = true (image right)

        return (
          <Card
            key={card.id}
            card={card}
            index={index}
            targetScale={targetScale}
            range={[index * 0.25, 1]}
            progress={scrollYProgress}
            isEven={isEven}
          />
        );
      })}
      {/* Add spacing at the end for mobile */}
      <div className="lg:hidden h-32"></div>
    </div>
  );
};

interface CardProps {
  card: ScrollStackCard;
  index: number;
  targetScale: number;
  range: [number, number];
  progress: MotionValue<number>;
  isEven: boolean;
}

const Card = ({
  card,
  index,
  targetScale,
  range,
  progress,
  isEven,
}: CardProps) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-20 flex items-center  justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(20px + ${index * 25}px)`,
        }}
        className="relative w-full"
      >
        <div
          className="relative overflow-hidden bg-primary"
          style={{
            minHeight: "500px",
            borderRadius: "0px",
          }}
        >
          {/* Mobile Layout - Stacked */}
          <div className="lg:hidden relative z-10 space-y-8">
            {/* Content */}
            <div className="flex flex-col justify-center p-6 bg-background">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-black leading-tight mb-4 font-heading">
                    {card.title}
                  </h3>
                  <h4 className="text-lg font-semibold text-black/80 mb-6 font-heading">
                    {card.subtitle}
                  </h4>
                </div>

                <p className="text-primary-foreground/70 text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 w-full">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:grid relative z-10 grid-cols-2 h-full min-h-[500px]">
            {/* Content Side */}
            <div
              className={`flex flex-col justify-center p-16 bg-background ${
                isEven ? "order-1" : "order-2"
              }`}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-6xl font-bold text-black leading-tight mb-4 font-heading">
                    {card.title}
                  </h3>
                  <h4 className="text-3xl font-semibold text-black/80 mb-6 font-heading">
                    {card.subtitle}
                  </h4>
                </div>

                <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-xl">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div
              className={`relative flex items-center justify-center p-0 ${
                isEven ? "order-2" : "order-1"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollStack;
