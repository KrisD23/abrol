"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NewHeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:20px_20px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Built on trust.{" "}
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Driven by connection.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Guiding business owners with clear financial insight and access to a
            network of trusted professionals.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Helping you make smart decisions today so your business grows
            stronger and your legacy thrives tomorrow.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span>Book a Consultation</span>
              <svg
                className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
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

            <Link
              href="/services"
              className="group inline-flex items-center justify-center px-10 py-5 border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:border-white/50 hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span>Explore Services</span>
              <svg
                className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="flex flex-col items-center">
          <p className="text-white/60 text-sm mb-4">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
