"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const badges = [
  { src: "/cpa.png", alt: "CPA Certified Public Accountant" },
  { src: "/xero.png", alt: "Xero Partner" },
  { src: "/tax.png", alt: "Tax Professional" },
  { src: "/xero2.png", alt: "Xero2" },
];

export default function BadgesSection() {
  return (
    <section className="backdrop-blur-xl bg-primary/60 py-12 px-4 md:px-8 border-y border-border/30 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center justify-center"
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={120}
                  height={120}
                  className={`object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 ${
                    badge.src === "/xero2.png" 
                      ? "w-36 h-36 md:w-40 md:h-40 lg:w-44 lg:h-44" 
                      : "w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                  }`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
