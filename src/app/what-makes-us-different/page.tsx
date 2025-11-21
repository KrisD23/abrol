"use client";
import React from "react";

import { motion } from "framer-motion";
import GlassSurface from "../../components/GlassSurface";
import {
  Users,
  Building2,
  Heart,
  Award,
  // Zap,
  MessageCircle,
  Target,
  Eye,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Threads from "@/components/Threads";

const page = () => {
  return (
    <>
      <Navbar />
      {/* Threads Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Threads
          amplitude={2.8}
          distance={0.4}
          enableMouseInteraction={false}
        />
      </div>
      {/* What Makes Us Different Section */}
      <div className="relative z-10 py-16 px-4 md:px-8 overflow-hidden pt-32 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                What Makes Us Different
              </h3>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-black/50 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Melbournes first Financial Connection Firm — merging compliance,
              strategy, and boutique private client care to deliver clarity
              beyond the numbers.
            </motion.p>
          </motion.div>
          {/* Key Differentiators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Building2,
                title:
                  "Deep understanding of intergenerational business dynamics",
                description:
                  "We specialize in family-owned businesses and understand the unique challenges they face.",
              },
              {
                icon: MessageCircle,
                title: "Straight-talking advice grounded in experience",
                description:
                  "Clear, honest communication backed by decades of real-world experience.",
              },
              {
                icon: Users,
                title:
                  "Multi-disciplinary team: accountants, advisors, tax agents",
                description:
                  "Complete expertise under one roof for comprehensive financial solutions.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.13,
                  ease: "easeOut",
                }}
                className="group hover:scale-105 hover:-translate-y-2 transition-all duration-500"
              >
                <GlassSurface
                  className="p-8 h-full"
                  borderRadius={12}
                  blur={16}
                  backgroundOpacity={0.08}
                  hoverable={true}
                  textColor="text-white"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 mb-6 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/80 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h4 className="text-white text-lg mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 mt-auto">
                      {item.description}
                    </p>
                  </div>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
          {/* Competitive Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                text: "Melbourne's original Financial Connection Firm",
                icon: Award,
              },
              {
                text: "Holistic advice across tax, business, and legacy",
                icon: Target,
              },
              { text: "Boutique service with Big Four insight", icon: Eye },
              { text: "Multi-generational focus", icon: Heart },
            ].map((difference, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.11,
                  ease: "easeOut",
                }}
                className="text-center group hover:scale-110 hover:-translate-y-1 transition-all duration-500"
              >
                <GlassSurface
                  className="p-6"
                  borderRadius={12}
                  blur={16}
                  backgroundOpacity={0.08}
                  hoverable={true}
                  textColor="text-white"
                >
                  <div className="w-12 h-6 mx-auto mb-4 bg-transparent rounded-full flex items-center justify-center group-hover:bg-primary/80 group-hover:scale-125 transition-all duration-300">
                    <difference.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-white/70 ml-5 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {difference.text}
                  </p>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
          {/* Vision Section - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <div className="bg-white/500 p-8 rounded-2xl border-2 border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group hover:scale-105 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/80 group-hover:scale-110 transition-all duration-300">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-black group-hover:text-black transition-colors duration-300">
                  Our Vision
                </h4>
              </div>
              <p className="text-black/50 text-base md:text-lg leading-relaxed group-hover:text-foreground transition-colors duration-300">
                A world where family-owned businesses are not only compliant,
                but competitive, thriving, and multi-generational.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
};

export default page;
