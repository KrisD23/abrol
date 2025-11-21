"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassSurface from "./GlassSurface";

interface StatItem {
  number: number;
  suffix?: string;
  label: string;
  prefix?: string;
}

interface StatsCounterProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  {
    number: 5000,
    suffix: "+",
    label: "Clients Served Successfully",
    prefix: "",
  },
  {
    number: 50,
    suffix: "+",
    label: "Years Combined Experience",
    prefix: "",
  },
  {
    number: 50,
    suffix: "M+",
    label: "Assets Under Management",
    prefix: "$",
  },
  {
    number: 98,
    suffix: "%",
    label: "Client Satisfaction Rate",
    prefix: "",
  },
];

const AnimatedCounter = ({
  targetNumber,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  targetNumber: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const increment = targetNumber / (duration / 50); // Update every 50ms
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isInView, targetNumber, duration]);

  const formatNumber = (num: number) => {
    // Don't format if we have custom suffixes like 'M+'
    if (suffix.includes("M") || suffix.includes("K")) {
      return num.toString();
    }

    if (num >= 1000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1);
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="font-bold">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default function StatsCounter({
  stats = defaultStats,
}: StatsCounterProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px" });

  return (
    <div
      ref={containerRef}
      className="bg-background text-foreground py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary font-heading">
            Our <span className="text-primary">Impact</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Numbers that speak to our commitment and success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <GlassSurface
                className="p-8 h-full"
                borderRadius={16}
                blur={12}
                backgroundOpacity={0.08}
                hoverable={true}
                textColor="text-white"
              >
                <div className="flex flex-col items-center justify-center h-full min-h-[160px]">
                  <div className="text-4xl md:text-5xl lg:text-6xl text-primary mb-6 font-bold">
                    <AnimatedCounter
                      targetNumber={stat.number}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      duration={2000 + index * 200} // Stagger the animations slightly
                    />
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base lg:text-lg font-medium uppercase tracking-wide text-center leading-tight">
                    {stat.label}
                  </p>
                </div>
              </GlassSurface>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
          }
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto max-w-2xl"
        />
      </div>
    </div>
  );
}
