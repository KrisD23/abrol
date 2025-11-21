"use client";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GlassSurface from "../../components/GlassSurface";
import Silk from "../../components/Silk";

const TypingAnimation = dynamic(
  () => import("../../components/TypingAnimation"),
  { ssr: false }
);

import {
  HandHeart,
  Users,
  Lightbulb,
  Trophy,
  Building2,
  Heart,
  Award,
  Shield,
} from "lucide-react";

const aboutTypingTexts = [
  "We're Economic Guides for Private Enterprise.",
  "We're Your Financial Connection Firm.",
  "We're Economic Guides for Private Enterprise.",
];

// TypeScript interfaces
interface DetailItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ContentSection {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  details?: DetailItem[];
  values?: string[];
}

// Content sections that will fade in and out
const contentSections: ContentSection[] = [
  {
    id: "mission",
    icon: HandHeart,
    title: "Our Mission",
    content: "To simplify the complex financial world for family-owned businesses through deep connection, practical insight, and boutique-level care."
  },
  {
    id: "help",
    icon: Users,
    title: "Who We Help",
    content: "From first-generation entrepreneurs to legacy family businesses, Abrol Associates provides trusted accounting and advisory support across all stages of business.",
    details: [
      {
        icon: Lightbulb,
        title: "First-generation business owners",
        description: "Supporting entrepreneurs as they build their first business ventures with expert guidance and strategic planning.",
      },
      {
        icon: Trophy,
        title: "Second-generation successors",
        description: "Helping family business successors navigate transitions and growth while preserving family legacy.",
      },
      {
        icon: Building2,
        title: "Property and transport business families",
        description: "Specialized expertise for property development and transport companies with complex structural needs.",
      },
      {
        icon: Heart,
        title: "Private healthcare practitioners",
        description: "Tailored financial solutions for medical professionals and healthcare practice owners.",
      },
      {
        icon: Award,
        title: "Education & childcare operators",
        description: "Supporting education providers and childcare centers with industry-specific accounting expertise.",
      },
    ]
  },
  {
    id: "difference",
    icon: Award,
    title: "What Makes Us Different",
    content: "We don't just 'do your books' — we decode the economic landscape so you can make confident, strategic decisions. Through boutique-level care and deep understanding, we become your trusted financial partners."
  },
  {
    id: "values",
    icon: Shield,
    title: "Our Values",
    content: "We believe in integrity, insight, partnership, and precision in everything we do.",
    values: ["Integrity", "Insight", "Partnership", "Precision"]
  }
];

export default function AboutPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedModalCard, setSelectedModalCard] = useState<DetailItem | null>(null);

  const handleNext = () => {
    setCurrentSectionIndex((currentSectionIndex + 1) % contentSections.length);
  };

  const handlePrevious = () => {
    setCurrentSectionIndex((currentSectionIndex - 1 + contentSections.length) % contentSections.length);
  };

  const openModal = (detail: DetailItem) => {
    setSelectedModalCard(detail);
  };

  const closeModal = () => {
    setSelectedModalCard(null);
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />

      {/* Fixed Hero Section */}
      <div className="fixed inset-0 z-0">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/about.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60"></div>

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 md:px-0">
          {/* Centered Title */}
          <motion.h1
            className="text-3xl md:text-6xl lg:text-7xl font-bold font-bebas-neue leading-tight tracking-wide text-black mb-3 md:mb-4 text-center px-2"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ABOUT ABROL ASSOCIATES
          </motion.h1>

          {/* Subtitle with Typing Animation */}
          <motion.h2
            className="text-base md:text-2xl text-white font-bebas-neue mb-6 md:mb-10 text-center min-h-[2em] md:min-h-[2.5em] px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            More Than Accountants —{" "}
            <TypingAnimation
              texts={aboutTypingTexts}
              className="text-white font-light inline font-bebas-neue"
              typingSpeed={60}
              deletingSpeed={30}
              pauseTime={4000}
            />
          </motion.h2>

          {/* Three Cards Row */}
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch px-2">
            {[
              "Founded by Paras Abrol, a CPA with over two decades of industry experience, Abrol Associates exists to elevate the experience of financial management for family businesses. We don't just 'do your books' — we decode the economic landscape so you can make confident, strategic decisions",
              "At Abrol Associates, we believe the best financial relationships are built on connection, not complexity.",
              "Abrol Associates is not just an accounting firm. We are your strategic partners, economic advisors, and private wealth allies. Through deep connection, practical insight, and boutique-level care, we help family businesses navigate complexity and achieve financial clarity.",
            ].map((text, idx) => (
              <motion.div
                key={idx}
                className="flex-1 min-w-[200px] md:min-w-[260px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassSurface
                  className="p-4 md:p-8 flex flex-col justify-center items-center text-center h-full"
                  borderRadius={20}
                  blur={16}
                  backgroundOpacity={0.3}
                  hoverable={true}
                >
                  <p className="text-sm md:text-lg lg:text-xl whitespace-pre-line !text-white">
                    {text}
                  </p>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer to push content sections down */}
      <div className="h-screen"></div>
      
      {/* Content Section - 100vh height with navigation - Scroll Stack */}
      <div className="relative z-10 h-screen bg-card text-foreground">
        {/* Silk Background */}
        <div className="absolute inset-0 w-full h-full">
          <Silk
            speed={5}
            scale={1}
            color="#2F2F32"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        
        {/* Content with navigation buttons */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="p-4 md:p-8 lg:p-16 max-w-6xl mx-2 md:mx-4 w-full">
            {/* Navigation Controls - Centered at bottom */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 z-20">
              {/* Navigation Buttons */}
              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Section indicators */}
              <div className="flex gap-2">
                {contentSections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSectionIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSectionIndex 
                        ? 'bg-white' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {(() => {
                const section = contentSections[currentSectionIndex];
                return (
                  <motion.div
                    key={section.id}
                    className="flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.95 }}
                    transition={{ 
                      duration: 0.7, 
                      ease: "easeInOut",
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.6 }
                    }}
                  >
                    {/* Header and Content Layout - Special layout only for "Who We Help" */}
                    {section.id === "help" ? (
                      <>
                        {/* Mobile Layout - Keep original centered layout */}
                        <div className="md:hidden flex flex-col items-center justify-center mb-6">
                          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                            <section.icon className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl font-bebas-neue text-black text-center">
                            {section.title}
                          </h2>
                        </div>

                        <p className="md:hidden text-base text-black/80 mb-6 max-w-4xl leading-relaxed text-center px-2">
                          {section.content}
                        </p>

                        {/* Desktop Layout - Left-aligned heading with right-pushed content for "Who We Help" only */}
                        <div className="hidden md:flex items-start mb-8">
                          <div className="flex items-center flex-shrink-0 mr-12">
                            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mr-6">
                              <section.icon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bebas-neue text-black">
                              {section.title}
                            </h2>
                          </div>
                          
                          <div className="flex-1 ml-8">
                            <p className="text-lg lg:text-xl text-black/80 leading-relaxed max-w-2xl">
                              {section.content}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Default Layout for all other sections */}
                        <div className="flex flex-col md:flex-row items-center justify-center mb-6 md:mb-8">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                            <section.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          </div>
                          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bebas-neue text-black text-center md:text-left">
                            {section.title}
                          </h2>
                        </div>

                        <p className="text-base md:text-lg lg:text-xl text-black/80 mb-6 md:mb-8 max-w-4xl leading-relaxed text-center md:text-left px-2 md:px-0">
                          {section.content}
                        </p>
                      </>
                    )}

                    {/* Render details for "Who We Help" section */}
                    {section.details && (
                      <>
                        {/* Desktop Version - Grid Cards with 5th card in 3rd column */}
                        <div className="hidden md:block max-w-6xl px-2 md:px-0">
                          <div className="grid grid-cols-3 gap-6">
                            {/* First Row - 3 cards */}
                            {section.details.slice(0, 3).map((detail: DetailItem, idx: number) => (
                              <motion.div
                                key={idx}
                                className="group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                              >
                                <GlassSurface
                                  className="p-6 h-full"
                                  borderRadius={12}
                                  blur={16}
                                  backgroundOpacity={0.1}
                                  hoverable={true}
                                >
                                  <div className="flex flex-col h-full">
                                    <div className="w-10 h-10 mb-4 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                      <detail.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-black text-base mb-3 font-medium leading-tight">
                                      {detail.title}
                                    </h4>
                                    <p className="text-black/70 text-sm leading-relaxed mt-auto">
                                      {detail.description}
                                    </p>
                                  </div>
                                </GlassSurface>
                              </motion.div>
                            ))}
                            
                            {/* Second Row - 4th card in 1st column, 5th card in 3rd column */}
                            {section.details.length > 3 && (() => {
                              const FourthIcon = section.details[3].icon;
                              return (
                                <motion.div
                                  className="group"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, delay: 3 * 0.1 }}
                                >
                                  <GlassSurface
                                    className="p-6 h-full"
                                    borderRadius={12}
                                    blur={16}
                                    backgroundOpacity={0.1}
                                    hoverable={true}
                                  >
                                    <div className="flex flex-col h-full">
                                      <div className="w-10 h-10 mb-4 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                        <FourthIcon className="w-5 h-5 text-white" />
                                      </div>
                                      <h4 className="text-black text-base mb-3 font-medium leading-tight">
                                        {section.details[3].title}
                                      </h4>
                                      <p className="text-black/70 text-sm leading-relaxed mt-auto">
                                        {section.details[3].description}
                                      </p>
                                    </div>
                                  </GlassSurface>
                                </motion.div>
                              );
                            })()}
                            
                            {/* Empty middle column in second row */}
                            <div></div>
                            
                            {/* 5th card in 3rd column */}
                            {section.details.length > 4 && (() => {
                              const FifthIcon = section.details[4].icon;
                              return (
                                <motion.div
                                  className="group"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, delay: 4 * 0.1 }}
                                >
                                  <GlassSurface
                                    className="p-6 h-full"
                                    borderRadius={12}
                                    blur={16}
                                    backgroundOpacity={0.1}
                                    hoverable={true}
                                  >
                                    <div className="flex flex-col h-full">
                                      <div className="w-10 h-10 mb-4 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                        <FifthIcon className="w-5 h-5 text-white" />
                                      </div>
                                      <h4 className="text-black text-base mb-3 font-medium leading-tight">
                                        {section.details[4].title}
                                      </h4>
                                      <p className="text-black/70 text-sm leading-relaxed mt-auto">
                                        {section.details[4].description}
                                      </p>
                                    </div>
                                  </GlassSurface>
                                </motion.div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Mobile Version - Numbered List */}
                        <div className="md:hidden max-w-4xl px-4">
                          <div className="space-y-3">
                            {section.details.map((detail: DetailItem, idx: number) => (
                              <motion.div
                                key={idx}
                                className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 cursor-pointer hover:bg-white/15 transition-all duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                onClick={() => openModal(detail)}
                              >
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                  <span className="text-white text-sm font-bold">{idx + 1}</span>
                                </div>
                                <span className="text-black font-medium text-left">{detail.title}</span>
                                <svg className="w-5 h-5 text-black/60 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Render values for "Our Values" section */}
                    {section.values && (
                      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {section.values.map((value: string, idx: number) => (
                          <motion.div
                            key={value}
                            className="text-center group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                          >
                            <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border-4 border-transparent group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300">
                              <span className="text-black text-xl font-bold">{value[0]}</span>
                            </div>
                            <h4 className="text-black/70 text-lg group-hover:text-primary transition-colors duration-300">
                              {value}
                            </h4>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <Footer />
      </div>

      {/* Mobile Modal for Who We Help Details */}
      <AnimatePresence>
        {selectedModalCard && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GlassSurface
                className="p-6"
                borderRadius={16}
                blur={16}
                backgroundOpacity={0.15}
                hoverable={false}
              >
                <div className="flex flex-col h-full">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 shadow-lg">
                        <selectedModalCard.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-black leading-tight">
                        {selectedModalCard.title}
                      </h3>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors ml-2 flex-shrink-0"
                    >
                      <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="mt-2">
                    <p className="text-black/70 leading-relaxed text-base">
                      {selectedModalCard.description}
                    </p>
                  </div>
                </div>
              </GlassSurface>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
