"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Trusted Advice",
    description:
      "Expert guidance that brings structure, transparency and confidence to every financial decision.",
  },
  {
    title: "Connected Expertise",
    description:
      "We bring the right people into the room so your business can move faster with fewer obstacles.",
  },
  {
    title: "Long Term Focus",
    description:
      "Strategies that support sustainable growth, protect wealth and strengthen your future legacy.",
  },
];

export default function WhatMakesUsDifferent() {
  return (
    <section className="py-20 bg-black homepage-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Makes Us Different
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            More than accounting. A network designed to grow your business.
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We support business owners who want more than compliance. You gain
            clarity, confidence and the right connections to move forward with
            purpose.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>

              <h3 className="text-xl font-bold mb-4 text-white">
                {feature.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
