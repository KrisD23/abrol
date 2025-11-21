"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Business Accounting & Compliance",
    description:
      "Reliable, accurate and timely reporting that keeps your business on track.",
    icon: "📊",
  },
  {
    title: "Strategic Advisory",
    description:
      "Clear financial insight that helps you plan, grow and make confident decisions.",
    icon: "📈",
  },
  {
    title: "Financial Connections",
    description:
      "Access to trusted professionals across legal, finance, operations and wealth management.",
    icon: "🤝",
  },
  {
    title: "Wealth & Legacy Planning",
    description:
      "Forward-thinking structures and strategies to protect what you are building.",
    icon: "🏛️",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 homepage-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Services Overview
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Supporting every stage of your business journey.
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From foundational accounting to high level financial strategy and
            curated professional connections, we offer comprehensive guidance
            built around your goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-6">{service.icon}</div>

              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Services
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
