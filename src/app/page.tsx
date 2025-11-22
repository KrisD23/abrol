"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import BlurText from "@/components/BlurText";

import NoticeScroller from "@/components/NoticeScroller";
import SimpleTestimonials from "@/components/SimpleTestimonials";

import GlassSurface from "@/components/GlassSurface";
import MultiLineTypingAnimation from "@/components/MultiLineTypingAnimation";

// Import new homepage components
import {
  NewHeroSection,
  WhatMakesUsDifferent,
  ServicesOverview,
  ConnectorElement,
  AboutSection,
} from "@/components/homepage";

// Simple typing text for the hero
const homeTypingTexts: Array<[string, string]> = [
  ["WHERE PRECISION", "MEETS PROSPERITY"],
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileNavState, setMobileNavState] = useState(false);

  // Plain hero image (no slideshow/video)
  const heroImage = "/railway.jpg";

  // Intro animation sequence
  useEffect(() => {
    if (!showIntro) return;
    const t1 = setTimeout(() => setIntroStep(1), 1000);
    const t2 = setTimeout(() => setIntroStep(2), 2000);
    const t3 = setTimeout(() => setIntroStep(3), 3500);
    const t4 = setTimeout(() => setIntroStep(4), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [showIntro]);

  // Mobile detection
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Wheel event handler for animation trigger - only for hero section
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default and handle custom scroll if we're in the hero section
      if (scrollProgress < 0.4) {
        e.preventDefault();
        setScrollProgress((prev) => {
          const newProgress = prev + (e.deltaY > 0 ? 0.1 : -0.1);
          return Math.max(0, Math.min(0.4, newProgress)); // Cap at 0.4
        });
      }
      // If scrollProgress is at max (0.4), allow normal scrolling to other sections
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollProgress]);

  const contentOpacity = scrollProgress < 0.15 ? 1 - scrollProgress / 0.15 : 0;
  const contentY = scrollProgress < 0.15 ? -(scrollProgress / 0.15) * 50 : -50;
  const typingY = scrollProgress < 0.15 ? -(scrollProgress / 0.15) * 30 : -30;

  const navOpacity =
    scrollProgress > 0.3 ? Math.min((scrollProgress - 0.3) / 0.1, 1) : 0;
  const navY =
    scrollProgress > 0.3 ? 50 - ((scrollProgress - 0.3) / 0.1) * 50 : 50;

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: 1,
              backgroundColor:
                introStep >= 4 ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)",
            }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ pointerEvents: introStep >= 4 ? "none" : "auto" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: introStep >= 2 ? 1 : 0,
                y: introStep >= 2 ? 0 : -20,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-3 md:top-0 text-sm md:text-2xl right-0"
              style={{
                margin: isMobile ? "20px" : "40px",
                pointerEvents: "auto",
              }}
            >
              <a href="tel:+61341495757">
                <GlassSurface
                  className="px-6 py-2 cursor-pointer"
                  borderRadius={24}
                  blur={20}
                  backgroundOpacity={0.08}
                  hoverable
                  textColor="text-white"
                >
                  <span className="font-medium font-bebas-neue">
                    Talk to Us
                  </span>
                </GlassSurface>
              </a>
            </motion.div>

            <motion.div
              className={`flex items-center justify-center gap-0 ${
                isMobile && introStep < 3 ? "mt-10 ml-8" : ""
              }`}
              initial={{ scale: 1, x: 0, y: 0 }}
              animate={{
                scale: introStep >= 3 ? 0.85 : 1,
                x: introStep >= 3 ? (isMobile ? "-25vw" : "-38vw") : 0,
                y: introStep >= 3 ? (isMobile ? "-33vh" : "-30vh") : 0,
              }}
              transition={{
                duration: introStep >= 3 ? 1 : 0.8,
                ease: "easeInOut",
              }}
              style={{ pointerEvents: "auto" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: introStep >= 1 ? 1 : 0,
                  scale: introStep >= 1 ? (isMobile ? 1.0 : 1.1) : 0.8,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative cursor-pointer"
                style={{
                  width: isMobile ? "180px" : "250px",
                  height: isMobile ? "180px" : "250px",
                }}
                onClick={() => (window.location.href = "/")}
              >
                <Image
                  src="/newnewlogo.png"
                  alt="Abrol Associates"
                  width={isMobile ? 180 : 250}
                  height={isMobile ? 180 : 250}
                  unoptimized
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <motion.div
        className="relative h-screen text-white transform scale-x-[-1] overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: introStep >= 4 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="transform scale-x-[-1] w-full h-full relative z-10">
          <div className="absolute inset-0 bg-black/30" />

          {/* "How you grow matters" overlay */}
          {introStep >= 4 && !isMobile && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center md:justify-start pl-8 md:pl-16 z-5"
              style={{
                opacity: contentOpacity,
                transform: `translateY(${contentY}px)`,
              }}
            >
              <div className="mt-[-100px]">
                <BlurText
                  text="HOW YOU GROW MATTERS"
                  delay={400}
                  animateBy="words"
                  direction="top"
                  className="text-4xl md:text-4xl lg:text-5xl xl:text-7xl text-white text-center md:text-left font-bebas-neue leading-tight whitespace-nowrap"
                />
              </div>
            </motion.div>
          )}

          {/* Hero content */}
          <div className="relative z-20 flex flex-col min-h-screen px-4 md:px-12 pb-8 pt-20 md:pt-32 md:justify-end justify-end">
            <div className="flex justify-start w-full items-center md:items-end mb-20 md:mb-0">
              <div className="max-w-5xl w-full md:w-auto text-center md:text-left">
                <div className="relative">
                  <motion.h1
                    className="text-lg md:text-lg lg:text-xl xl:text-xl font-light leading-tight tracking-wide text-white hero-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {introStep >= 4 && (
                      <motion.div
                        className="text-center md:text-left"
                        style={{
                          opacity: isMobile
                            ? mobileNavState
                              ? 0
                              : 1
                            : contentOpacity,
                          transform: `translateY(${typingY}px)`,
                        }}
                      >
                        <MultiLineTypingAnimation
                          textSets={homeTypingTexts}
                          className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl"
                          typingSpeed={150}
                          deletingSpeed={100}
                          pauseTime={5000}
                          isMobile={isMobile}
                          loop={false}
                        />
                      </motion.div>
                    )}
                  </motion.h1>

                  <motion.div
                    className="mt-6 md:hidden relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    <motion.p className="text-primary text-sm leading-normal font-bold tracking-normal max-w-sm whitespace-pre-line font-dm-sans">
                      {""}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {/* Side Nav Links (appear on scroll) */}
          {introStep >= 4 &&
            ((navOpacity > 0 && !isMobile) || (isMobile && mobileNavState)) && (
              <motion.div
                className="absolute top-1/2 left-8 md:left-16 z-50"
                style={{
                  opacity: isMobile && mobileNavState ? 1 : navOpacity,
                  transform: `translateY(calc(${
                    isMobile && mobileNavState ? 0 : navY
                  }px - 40%))`,
                  pointerEvents:
                    navOpacity > 0.3 || (isMobile && mobileNavState)
                      ? "auto"
                      : "none",
                }}
              >
                <div className="flex flex-col space-y-8 text-left justify-center min-h-[50vh]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isMobile && mobileNavState ? 1 : navOpacity,
                      y: 0,
                    }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="group relative z-50 inline-block"
                  >
                    <Link
                      href="/news"
                      className="relative inline-block text-2xl md:text-2xl lg:text-3xl text-white leading-tight transition-all duration-300 group-hover:text-white/90 pr-10 font-bebas-neue whitespace-nowrap"
                    >
                      News
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-3/4"></span>
                      <span className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                        →
                      </span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isMobile && mobileNavState ? 1 : navOpacity,
                      y: 0,
                    }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="group relative z-50 inline-block"
                  >
                    <Link
                      href="/contact"
                      className="relative inline-block text-2xl md:text-2xl lg:text-3xl text-white leading-tight transition-all duration-300 group-hover:text-white/90 pr-10 font-bebas-neue whitespace-nowrap"
                    >
                      Contact Us
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-3/4"></span>
                      <span className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                        →
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}

          {/* How you grow matters bottom right of screen when nav is open */}
          {introStep >= 4 &&
            ((navOpacity > 0 && !isMobile) || (isMobile && mobileNavState)) && (
              <motion.div
                className={`absolute bottom-8 z-50 pointer-events-none select-none ${
                  isMobile ? "left-8" : "right-8"
                }`}
                style={{
                  opacity: isMobile && mobileNavState ? 1 : navOpacity,
                  transform: `translateY(${
                    isMobile && mobileNavState ? 0 : navY
                  }px)`,
                }}
              >
                <p className="text-3xl md:text-6xl lg:text-8xl uppercase font-bebas-neue text-white">
                  How you grow matters
                </p>
              </motion.div>
            )}
        </div>
      </motion.div>

      {/* Mobile Navigation Arrow Button - Only visible on mobile when on home section */}
      {isMobile && introStep >= 4 && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 md:hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => setMobileNavState(!mobileNavState)}
            className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: mobileNavState ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      )}

      {/* New Hero Section with your content */}
      {/* {introStep >= 4 && <NewHeroSection />} */}

      {/* New Homepage Sections */}
      <WhatMakesUsDifferent />
      <ServicesOverview />
      <ConnectorElement />
      <AboutSection />
      {/* Testimonials and Impact */}
      <SimpleTestimonials />

      <div className="bg-background text-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-primary">
              <span className="font-bebas-neue">OUR </span>
              <span className="text-primary font-bebas-neue">IMPACT</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-dm-sans">
              Numbers that speak to our commitment and success
            </p>
          </div>
        </div>
        <NoticeScroller />
      </div>

      <Footer />
    </div>
  );
}
