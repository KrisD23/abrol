"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlassSurface from "@/components/GlassSurface";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:20px_20px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Built on trust. <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Driven by connection.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Guiding business owners with clear financial insight and access to a
            network of trusted professionals.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Helping you make smart decisions today so your business grows
            stronger and your legacy thrives tomorrow.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/contact">
              <GlassSurface
                className="px-8 py-4 cursor-pointer text-center sm:text-left"
                borderRadius={12}
                blur={20}
                backgroundOpacity={0.1}
                hoverable
                textColor="text-white"
              >
                <span className="text-lg font-semibold">
                  Book a Consultation
                </span>
              </GlassSurface>
            </Link>

            <Link href="/services">
              <GlassSurface
                className="px-8 py-4 cursor-pointer text-center sm:text-left border border-white/20"
                borderRadius={12}
                blur={20}
                backgroundOpacity={0.05}
                hoverable
                textColor="text-white"
              >
                <span className="text-lg font-semibold">Explore Services</span>
              </GlassSurface>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
