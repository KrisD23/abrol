"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalendlyModal from "@/components/CalendlyModal";
// import ScrollStack from "@/components/ScrollStack";
// import StatsCounter from "@/components/StatsCounter";
import NoticeScroller from "@/components/NoticeScroller";
import SimpleTestimonials from "@/components/SimpleTestimonials";
// import BadgesSection from "@/components/BadgesSection";
import GlassSurface from "@/components/GlassSurface";
import MultiLineTypingAnimation from "@/components/MultiLineTypingAnimation";
// import AnimatedIntroText from "@/components/AnimatedIntroText";
// import CenterTypingAnimation from "@/components/CenterTypingAnimation";
import BlurText from "@/components/BlurText";
// import { Globe } from "@/components/Globe";
// import { Calendar, Phone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiSend, FiX } from "react-icons/fi";
import { loop } from "@react-three/fiber/dist/declarations/src/core/loop";

// Typing animation texts for home page (three-line structure)
const homeTypingTexts: Array<[string, string]> = [
  ["WHERE PRECISION", "MEETS PROSPERITY"],
];

// Define content for different sections
const contentSections = {
  home: {
    title: ["YOUR BRIDGE", "TO", "FINANCIAL SOLUTIONS"],
    subtitle: "",
  },

  services: {
    title: ["ACCOUNTING", "SERVICES", "PORTFOLIO"],
    subtitle:
      "Comprehensive financial solutions.\nFrom bookkeeping to strategic planning,\nwe handle it all with expertise.",
  },
};

// Define text content for each section (separate from images)
const sectionTexts = {
  home: [""],

  services: [
    "Comprehensive financial solutions.\nFrom bookkeeping to strategic planning,\nwe handle it all with expertise.",
  ],
};

// Scroll Stack Cards Data
// const scrollStackCards = [
//   {
//     id: 1,
//     title: "ASSET",
//     subtitle: "PROTECTION",
//     description:
//       "We create tailored structures—trusts, companies, partnerships—that legally protect your assets from business risks, creditors, lawsuits, and family disputes.",
//     image: "/asset-protection.jpg",
//     imageAlt: "Asset Protection",
//   },
//   {
//     id: 2,
//     title: "BUSINESS",
//     subtitle: "STRUCTURING",
//     description:
//       "From startups to seasoned enterprises, we design legal structures that protect personal assets while optimizing tax efficiency and operational control.",
//     image: "/img2.jpg",
//     imageAlt: "Business Structuring",
//   },
//   {
//     id: 3,
//     title: "WEALTH &",
//     subtitle: "ESTATE PLANNING",
//     description:
//       "Your legacy should be preserved—not lost in taxes or legal battles. We help you plan generational transfers that are tax-efficient and aligned with your wishes.",
//     image: "/coin.jpg",
//     imageAlt: "Wealth & Estate Planning",
//   },
//   {
//     id: 4,
//     title: "TAX &",
//     subtitle: "COMPLIANCE",
//     description:
//       "Through our affiliated accounting firm, we offer support to ensure your structures comply with ATO, ASIC, and state regulations—without sacrificing performance.",
//     image: "/taxandCompliance.jpg",
//     imageAlt: "Tax & Compliance",
//   },
// ];

export default function Home() {
  // Define background images for different sections (images/videos only)
  const backgroundImagesSets = {
    home: [
      // {
      //   src: "/home.jpg",
      //   mirrored: false,
      //   isVideo: false,
      // },
      // {
      //   src: "/new_money.jpeg",
      //   mirrored: false,
      //   isVideo: false,
      // },
      // {
      //   src: "/bg3.jpg",
      //   mirrored: false,
      //   isVideo: false,
      // },
      {
        src: "/railway.jpg",
        mirrored: false,
        isVideo: false,
      },
      // {
      //   src: "/background_video1.mp4",
      //   mirrored: false,
      //   isVideo: true,
      // },
    ],

    blog: [
      {
        src: "/blogs.png",
        mirrored: false,
        isVideo: false,
      },
    ],
  };

  const [currentSection, setCurrentSection] =
    useState<keyof typeof contentSections>("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [actualVisibleBgIndex, setActualVisibleBgIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousImage, setPreviousImage] = useState<{
    src: string;
    mirrored: boolean;
    isVideo?: boolean;
    liveClassName?: string;
  } | null>(null);

  const [isMobileSocialOpen, setIsMobileSocialOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTextTransitioning, setIsTextTransitioning] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const [shouldFadePrevious, setShouldFadePrevious] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileNavState, setMobileNavState] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  // Modal visibility hooks (must be top-level)
  const modalOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const modalDisplay = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    ["none", "block"]
  );

  // Get current background images based on section
  const currentBackgroundImages =
    backgroundImagesSets[currentSection as keyof typeof backgroundImagesSets] ||
    backgroundImagesSets.home;

  // Get current text content based on section
  const currentTexts =
    sectionTexts[currentSection as keyof typeof sectionTexts] ||
    sectionTexts.home;
  const currentText = currentTexts[currentTextIndex % currentTexts.length];

  // Check if current section has videos
  const hasVideos = currentBackgroundImages.some((item) => item.isVideo);
  const videos = currentBackgroundImages
    .filter((item) => item.isVideo)
    .map((item) => item.src);

  // Transform scroll progress to opacity for social media panel
  const socialOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const socialY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  // Transform scroll progress for content animations
  const contentOpacity = scrollProgress < 0.15 ? 1 - scrollProgress / 0.15 : 0;
  const contentY = scrollProgress < 0.15 ? -(scrollProgress / 0.15) * 50 : -50;
  const typingY = scrollProgress < 0.15 ? -(scrollProgress / 0.15) * 30 : -30;

  // Show navigation when user has experienced the hero section (near max scroll progress)
  // This creates better UX where nav appears when they've seen the main content
  const navOpacity =
    currentSection === "home"
      ? scrollProgress > 0.3
        ? Math.min((scrollProgress - 0.3) / 0.1, 1)
        : 0
      : scrollProgress > 0.1
      ? Math.min((scrollProgress - 0.1) / 0.15, 1)
      : 0;
  const navY =
    currentSection === "home"
      ? scrollProgress > 0.3
        ? 50 - ((scrollProgress - 0.3) / 0.1) * 50
        : 50
      : scrollProgress > 0.1
      ? 50 - ((scrollProgress - 0.1) / 0.15) * 50
      : 50;

  // Intro animation sequence effect
  useEffect(() => {
    if (!showIntro) return;

    // Step 0: Logo appears (0-1s)
    const step1Timer = setTimeout(() => {
      setIntroStep(1);
    }, 1000);

    // Step 1: Text slides in from right (1-2s)
    const step2Timer = setTimeout(() => {
      setIntroStep(2);
    }, 2000);

    // Step 2: Everything moves to top-left and shrinks (2-3.5s)
    const step3Timer = setTimeout(() => {
      setIntroStep(3);
    }, 3500);

    // Step 3: Keep intro in navbar position and show main content (4.5s)
    const showMainTimer = setTimeout(() => {
      setIntroStep(4); // New step to show main content while keeping intro
    }, 4500);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(showMainTimer);
    };
  }, [showIntro]);

  // Preload images effect
  useEffect(() => {
    currentBackgroundImages.forEach(
      (bgItem: { src: string; mirrored: boolean; isVideo?: boolean }) => {
        if (!bgItem.isVideo) {
          const img = new window.Image();
          img.src = bgItem.src;
        }
      }
    );
  }, [currentBackgroundImages]);

  // Background slideshow effect
  useEffect(() => {
    if (currentBackgroundImages.length <= 1) return;

    // Comment out slideshow for video background
    /*
    const slideInterval = setInterval(() => {
      setIsTextTransitioning(true);

      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % currentTexts.length);
      }, 200);

      // --- Start of Progress Bar Reset Logic ---
      setIsResetting(true); // Trigger the reset animation
      setTimeout(() => {
        setIsResetting(false); // End reset and start filling again
        setCurrentBgIndex((prev) => {
          const newIndex = (prev + 1) % currentBackgroundImages.length;
          if (!isTransitioning) {
            setActualVisibleBgIndex(newIndex);
          }
          return newIndex;
        });
      }, 500); // This delay (500ms) is the duration of the reset animation
      // --- End of Progress Bar Reset Logic ---

      setTimeout(() => {
        setIsTextTransitioning(false);
      }, 600);
    }, 1300); // Change every 4.5 seconds

    return () => clearInterval(slideInterval);
    */
  }, [currentBackgroundImages, currentTexts, isTransitioning]);

  // Progress bar animation effect
  useEffect(() => {
    if (currentBackgroundImages.length <= 1 || isResetting) return; // Pause filling during reset

    // Comment out progress bar for video background
    /*
    setProgressWidth(0); // Start from 0 for the new slide

    const progressInterval = setInterval(() => {
      setProgressWidth((prev) => {
        const increment = 100 / (4000 / 16); // Fill over 4s (4.5s total - 0.5s reset)
        const newProgress = prev + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 16);

    return () => clearInterval(progressInterval);
    */
  }, [currentBgIndex, isResetting, currentBackgroundImages.length]); // Re-run when reset ends

  // Video lifecycle effect for calculators and home sections
  useEffect(() => {
    if (currentSection !== "home" || !hasVideos) return;

    const video = videoRef.current;
    if (!video || !showVideo) return;

    const handleEnded = () => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [videos.length, showVideo, currentSection, hasVideos]);

  // Handle section changes with smooth transition
  useEffect(() => {
    if (isTransitioning) {
      // Reset fade state
      setShouldFadePrevious(false);

      // Keep previous image visible for 0.6 seconds
      const persistTimer = setTimeout(() => {
        // Start fading previous image and show new content
        setShouldFadePrevious(true);

        // Immediately switch to new section's first image and text
        setCurrentBgIndex(0);
        setActualVisibleBgIndex(0);
        setCurrentTextIndex(0);

        // Reset video index for new section
        setCurrentVideo(0);
      }, 600);

      // End transition after total fade duration (0.6s persist + 1s fade)
      const endTimer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousImage(null);
        setShouldFadePrevious(false);
      }, 1600);

      return () => {
        clearTimeout(persistTimer);
        clearTimeout(endTimer);
      };
    }
  }, [isTransitioning]);

  // Reset video index when section changes (but not during transitions)
  useEffect(() => {
    if (!isTransitioning) {
      setCurrentVideo(0);
    }
  }, [currentSection, isTransitioning]);

  // Check for section parameter on component mount using window.location
  useEffect(() => {
    // Only run on client-side after hydration
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get("section");
        if (section && section in contentSections) {
          setCurrentSection(section as keyof typeof contentSections);
        }

        // Always scroll to top when loading the home page
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        // Ignore any errors and still scroll to top
        console.log("Could not read URL parameters");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, []);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Function to handle section changes
  const changeSection = (section: string) => {
    const validSection = section as keyof typeof contentSections;
    if (
      validSection in contentSections &&
      validSection !== currentSection &&
      !isAnimating
    ) {
      // Capture current image from the CURRENT section before it changes
      const previousSectionImages =
        backgroundImagesSets[
          currentSection as keyof typeof backgroundImagesSets
        ] || backgroundImagesSets.home;
      const currentImage = previousSectionImages[actualVisibleBgIndex];

      // Capture the exact state including the className used in live rendering
      const capturedImage = {
        src: currentImage.src,
        mirrored: currentImage.mirrored,
        isVideo: currentImage.isVideo,
        // Capture the exact className that was being used in the live rendering
        liveClassName: currentImage.isVideo
          ? `absolute inset-0 w-full h-full object-cover` // Videos don't have mirroring in live rendering
          : `absolute inset-0 bg-cover bg-center bg-no-repeat ${
              currentImage.mirrored ? "" : "scale-x-[-1]"
            }`, // Images do have mirroring
      };

      setPreviousImage(capturedImage);
      setIsTransitioning(true);

      // Reset video states when changing sections
      setCurrentVideo(0);
      setShowVideo(true);

      setIsAnimating(true);
      setCurrentSection(validSection);

      // Scroll to top (hero section) with smooth animation
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => setIsAnimating(false), 2500); // Duration of the animation
    }
  };

  const currentContent = contentSections[currentSection];

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden">
      {/* Intro Animation Overlay */}
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
            style={{
              pointerEvents: introStep >= 4 ? "none" : "auto",
            }}
          >
            {/* Talk to Us Button - Always fixed top right in overlay */}
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
                  hoverable={true}
                  textColor="text-white"
                >
                  <span className="font-medium  font-bebas-neue">
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
              style={{
                pointerEvents: "auto",
              }}
            >
              {/* Logo */}
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
                {/* <Image
                  src="/Abrol_Animation.gif"
                  alt="Abrol Associates"
                  width={isMobile ? 120 : 150}
                  height={isMobile ? 120 : 150}
                  unoptimized={true}
                  className="object-contain"
                /> */}
                <Image
                  src="/newnewlogo.png"
                  alt="Abrol Associates"
                  width={isMobile ? 180 : 250}
                  height={isMobile ? 180 : 250}
                  unoptimized={true}
                  className="object-contain"
                />
              </motion.div>

              {/* <motion.div
                className="flex items-center gap-1 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: introStep >= 2 ? 1 : 0,
                  x: introStep >= 2 ? 0 : 100,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onClick={() => (window.location.href = "/")}
              >
                <span
                  className={`${
                    isMobile ? "text-4xl" : "text-5xl"
                  } font-trada-bold text-white`}
                >
                  Abrol
                </span>
                <span className={`inline-block ${isMobile ? "w-1" : "w-2"}`}></span>
                <span
                  className={`${
                    isMobile ? "text-4xl" : "text-5xl"
                  } font-trada-light text-white`}
                >
                  Associates
                </span>
              </motion.div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      {/* <Navbar onSectionChange={changeSection} /> */}

      {/* Main Hero Section with Background Slideshow */}
      <motion.div
        className="relative h-screen text-white transform scale-x-[-1] overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: introStep >= 4 ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Images and Videos */}
        <div>
          {/* Previous section image during transition */}
          {isTransitioning && previousImage && (
            <>
              {previousImage.isVideo ? (
                <video
                  key={`previous-${previousImage.src}`}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className={`absolute inset-0 w-full h-full object-cover ${
                    previousImage.mirrored === false ? "scale-x-[-1]" : ""
                  }`}
                  style={{
                    opacity: shouldFadePrevious ? 0 : 1,
                    zIndex: 3,
                    transition: "opacity 1000ms ease-in-out",
                  }}
                >
                  <source src={previousImage.src} type="video/mp4" />
                </video>
              ) : (
                <div
                  className={
                    previousImage.liveClassName ||
                    "absolute inset-0 bg-cover bg-center bg-no-repeat"
                  }
                  style={{
                    backgroundImage: `url('${previousImage.src}')`,
                    opacity: shouldFadePrevious ? 0 : 1,
                    zIndex: 3,
                    transition: "opacity 1000ms ease-in-out",
                  }}
                />
              )}
            </>
          )}

          {/* Current section backgrounds - Videos for home, Images for others */}
          {hasVideos && currentSection === "home" ? (
            <video
              ref={videoRef}
              key={`${currentSection}-${currentVideo}`}
              autoPlay
              muted
              playsInline
              loop
              className={`fixed inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                currentBackgroundImages[currentVideo]?.mirrored === false
                  ? "scale-x-[-1]"
                  : ""
              }`}
              style={{
                zIndex: 1,
                opacity: isTransitioning && !shouldFadePrevious ? 0 : 1,
                marginBottom: "10px",
                transform:
                  currentBackgroundImages[currentVideo]?.mirrored === true
                    ? "scaleX(-1) scale(1.05)"
                    : "scale(1.05)",
              }}
            >
              <source src={videos[currentVideo]} type="video/mp4" />
            </video>
          ) : (
            currentBackgroundImages.map(
              (
                bgItem: { src: string; mirrored: boolean; isVideo?: boolean },
                index: number
              ) =>
                !bgItem.isVideo && (
                  <div
                    key={`bg-${currentSection}-${index}-${bgItem.src}`}
                    className={`absolute ${
                      bgItem.mirrored ? "" : "scale-x-[-1]"
                    } ${
                      // Special positioning for man_bg.png (first image)
                      bgItem.src === "/man_bg.png"
                        ? "top-10 left-0 right-0 bottom-0 bg-cover bg-no-repeat bg-center"
                        : "inset-0 bg-cover bg-center bg-no-repeat"
                    }`}
                    style={{
                      backgroundImage: `url('${bgItem.src}')`,
                      // Full coverage for man_bg.png to avoid black spaces
                      backgroundSize: "cover",
                      backgroundPosition:
                        bgItem.src === "/man_bg.png" ? "center top" : "center",
                      opacity:
                        index === currentBgIndex
                          ? isTransitioning && !shouldFadePrevious
                            ? 0
                            : 1
                          : 0,
                      zIndex: index === currentBgIndex ? 2 : 0,
                      transition: "opacity 1000ms ease-in-out",
                      // filter removed to restore color
                    }}
                  />
                )
            )
          )}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60"></div>
        {/* Content wrapper to flip back the content */}
        <div className="transform scale-x-[-1] w-full h-full relative z-10">
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* "How you grow matters" text - shows by default on mobile, fades out on scroll on desktop */}
          {currentSection === "home" &&
            ((introStep >= 4 && !isMobile) ||
              (isMobile && introStep >= 4 && !mobileNavState)) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center md:justify-start pl-8 md:pl-16 z-5"
                style={{
                  opacity: isMobile ? 1 : contentOpacity,
                  transform: `translateY(${isMobile ? 0 : contentY}px)`,
                }}
              >
                {/* How you grow matters text - positioned left and smaller */}
                <div className="mt-[-100px]">
                  <BlurText
                    text="HOW YOU GROW MATTERS"
                    delay={400}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={() =>
                      console.log("Animation completed!")
                    }
                    className="text-4xl md:text-4xl lg:text-5xl xl:text-7xl text-white text-center md:text-left font-bebas-neue leading-tight whitespace-nowrap"
                  />
                </div>
              </motion.div>
            )}

          {/* Navigation Menu - fades in on scroll (desktop) or mobile toggle */}
          {currentSection === "home" &&
            ((introStep >= 4 && !isMobile) || (isMobile && mobileNavState)) && (
              <motion.div
                className="absolute top-1/2 left-8 md:left-16 z-50"
                style={{
                  opacity: isMobile && mobileNavState ? 1 : navOpacity,
                  transform: `translateY(calc(${
                    isMobile && mobileNavState ? 0 : navY
                  }px - 40%))`,
                }}
              >
                <div className="flex flex-col space-y-8 text-left justify-center min-h-[50vh]">
                  {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMobile && mobileNavState ? 1 : navOpacity, y: 0 }}
                  transition={{ duration: 0.4, delay: 0 }}
                  className="group relative z-50 inline-block"
                >
                  <Link
                    href="/about"
                    className="relative inline-block text-2xl md:text-2xl lg:text-3xl text-white leading-tight transition-all duration-300 group-hover:text-white/90 pr-12 font-bebas-neue whitespace-nowrap"
                  >
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-3/4"></span>
                    <span className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                      →
                    </span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMobile && mobileNavState ? 1 : navOpacity, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="group relative z-50 inline-block"
                >
                  <Link
                    href="/services"
                    className="relative inline-block text-2xl md:text-2xl lg:text-3xl text-white leading-tight transition-all duration-300 group-hover:text-white/90 pr-10 font-bebas-neue whitespace-nowrap"
                  >
                    Services
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-3/4"></span>
                    <span className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                      →
                    </span>
                  </Link>
                </motion.div> */}

                  {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: navOpacity, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="group relative z-50 inline-block"
                >
                  <Link
                    href="/blog"
                    className="relative inline-block text-2xl md:text-2xl lg:text-3xl text-white leading-tight transition-all duration-300 group-hover:text-white/90 pr-10 font-bebas-neue whitespace-nowrap"
                  >
                    Blog
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-3/4"></span>
                    <span className="absolute top-1/2 left-full ml-1 transform -translate-y-1/2 opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                      →
                    </span>
                  </Link>
                </motion.div> */}

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
          {currentSection === "home" &&
            ((introStep >= 4 && navOpacity > 0 && !isMobile) ||
              (isMobile && mobileNavState)) && (
              <div
                className={`fixed bottom-8 z-[9999] pointer-events-none select-none ${
                  isMobile ? "left-8" : "right-8"
                }`}
                style={{ opacity: isMobile && mobileNavState ? 1 : navOpacity }}
              >
                <p className="text-3xl md:text-6xl lg:text-8xl uppercase font-bebas-neue text-white ">
                  How you grow matters
                </p>
              </div>
            )}
          {/* {currentSection === "home" && (
            <div className="absolute inset-0 flex items-center justify-center z-4">
              <div className="w-full max-w-md mx-auto">
                <Globe className="w-full" />
              </div>
            </div>
          )} */}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col min-h-screen px-4 md:px-12 pb-8 pt-20 md:pt-32 md:justify-end justify-end">
            {/* Main Content Container - Main Layout */}
            <div className="flex justify-start w-full items-center md:items-end mb-20 md:mb-0">
              {/* Left Content - Main Heading with Welcome Text */}
              <div className="max-w-5xl w-full md:w-auto text-center md:text-left">
                {/* Main Heading with Typing Animation */}
                <div className="relative">
                  <motion.h1
                    key={currentSection} // Force re-render on section change
                    className="text-lg md:text-lg lg:text-xl xl:text-xl font-light leading-tight tracking-wide text-white hero-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentSection === "home" && introStep >= 4 ? (
                      /* Home Page - Multi-Line Typing Animation - fades out on scroll */
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
                    ) : currentSection !== "home" ? (
                      /* Other Pages - Original Animation */
                      <>
                        {/* First Word */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isMobile ? "100%" : "auto" }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          className="overflow-hidden mb-2"
                        >
                          <span className="whitespace-nowrap block">
                            {currentContent.title[0]}
                          </span>
                        </motion.div>

                        {/* Second Word with Welcome Text */}
                        <div className="relative block md:flex md:items-center mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isMobile ? "100%" : "auto" }}
                            transition={{
                              duration: 0.8,
                              delay: 0.8,
                              ease: "easeInOut",
                            }}
                            className="overflow-hidden"
                          >
                            <span className="whitespace-nowrap block">
                              {currentContent.title[1]}
                            </span>
                          </motion.div>

                          {/* Dynamic Welcome Text positioned right beside second word - Desktop Only */}
                          <motion.div
                            className="ml-8 mt-4 hidden md:block relative overflow-hidden"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                          >
                            <motion.p
                              key={`desktop-text-${currentTextIndex}`}
                              className="text-primary  text-lg leading-normal font-bold tracking-normal max-w-sm whitespace-pre-line font-dm-sans"
                              initial={{ opacity: 0, x: 30 }}
                              animate={{
                                opacity: isTextTransitioning ? 0 : 1,
                                x: isTextTransitioning ? -30 : 0,
                              }}
                              transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                              }}
                            >
                              {currentText || currentContent.subtitle}
                            </motion.p>
                          </motion.div>
                        </div>

                        {/* Third Word */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isMobile ? "100%" : "auto" }}
                          transition={{
                            duration: 0.8,
                            delay: 1.6,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden"
                        >
                          <span className="whitespace-nowrap block">
                            {currentContent.title[2]}
                          </span>
                        </motion.div>
                      </>
                    ) : null}
                  </motion.h1>

                  {/* Mobile Welcome Text - Below main title on mobile only */}
                  <motion.div
                    className="mt-6 md:hidden relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    <motion.p
                      key={`mobile-text-${currentTextIndex}`}
                      className="text-primary text-sm leading-normal font-bold tracking-normal max-w-sm whitespace-pre-line font-dm-sans"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{
                        opacity: isTextTransitioning ? 0 : 1,
                        x: isTextTransitioning ? -30 : 0,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {currentText || currentContent.subtitle}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Desktop Social Media Button */}
            {currentSection === "home" && !isMobileSocialOpen && (
              <motion.div
                className="fixed bottom-26 right-8 z-40 hidden md:block"
                style={{
                  opacity: socialOpacity,
                  y: socialY,
                }}
              >
                {/* <GlassSurface
                  onClick={() => setIsMobileSocialOpen(true)}
                  className="w-14 h-14 flex items-center justify-center cursor-pointer"
                  borderRadius={50}
                  blur={16}
                  backgroundOpacity={0.25}
                  hoverable={true}
                  textColor="text-white"
                >
                  <FaInstagram className="w-6 h-6" />
                </GlassSurface> */}
              </motion.div>
            )}

            {/* Desktop Social Media Panel */}
            {currentSection === "home" && isMobileSocialOpen && (
              <motion.div
                className="fixed bottom-26 right-8 w-80 z-40 hidden md:block"
                style={{
                  opacity: socialOpacity,
                  y: socialY,
                }}
              >
                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 w-80 border border-border/30 shadow-lg relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsMobileSocialOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 backdrop-blur-xl bg-background/40 rounded-full flex items-center justify-center hover:bg-background/60 transition-all duration-200 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10"
                  >
                    <FiX className="w-4 h-4 text-black" />
                  </button>

                  <div className="mb-6">
                    <p className="text-sm text-black mb-4 font-medium font-dm-sans">
                      Social media
                    </p>
                    <div className="flex space-x-3">
                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/abrolassociates/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors text-black"
                      >
                        <FaInstagram className="w-5 h-5" />
                      </a>

                      {/* Facebook */}
                      <a
                        href="#"
                        className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors text-black"
                      >
                        <FaFacebookF className="w-5 h-5" />
                      </a>

                      {/* WhatsApp */}
                      <a
                        href="#"
                        className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors text-black"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <p className="text-xs text-black mb-2 font-medium font-dm-sans">
                      Write your email
                    </p>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full backdrop-blur-xl bg-background/40 border border-border/30 rounded-full px-4 py-3 pr-12 text-black placeholder-black/70 focus:outline-none focus:border-border/50 focus:bg-background/60 transition-all duration-200 text-sm shadow-lg ring-1 ring-inset ring-white/10"
                      />
                      <button className="absolute right-2 top-1/2 transform translate-y-[-40%] w-8 h-8 backdrop-blur-xl bg-primary/80 rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-200 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10">
                        <FiSend className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mobile Social Media Button - Bottom Left */}
            {currentSection === "home" && (
              <motion.div className="md:hidden">
                {/* Mobile Social Media Toggle Button */}
                {!isMobileSocialOpen && (
                  <motion.div
                    className="fixed bottom-6 left-6 z-40"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* <GlassSurface
                      onClick={() => setIsMobileSocialOpen(true)}
                      className="w-14 h-14 flex items-center justify-center cursor-pointer"
                      borderRadius={50}
                      blur={16}
                      backgroundOpacity={0.25}
                      hoverable={true}
                    >
                      <FaInstagram className="w-6 h-6" />
                    </GlassSurface> */}
                  </motion.div>
                )}

                {/* Mobile Social Media Panel */}
                <AnimatePresence>
                  {isMobileSocialOpen && (
                    <motion.div
                      className="fixed inset-0 z-50 backdrop-blur-2xl bg-background/60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsMobileSocialOpen(false)}
                    >
                      <motion.div
                        className="fixed bottom-6 left-6 w-80 max-w-[calc(100vw-3rem)]"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="backdrop-blur-xl bg-background/80 rounded-2xl p-6 w-80 max-w-[calc(100vw-3rem)] border border-border/30 shadow-lg ring-1 ring-inset ring-white/10">
                          {/* Close Button */}
                          <button
                            onClick={() => setIsMobileSocialOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 backdrop-blur-xl bg-background/40 rounded-full flex items-center justify-center hover:bg-background/60 transition-all duration-200 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10"
                          >
                            <FiX className="w-4 h-4 text-black" />
                          </button>

                          <div className="mb-6">
                            <p className="text-sm text-black mb-4 font-medium font-dm-sans">
                              Social media
                            </p>
                            <div className="flex space-x-3 flex-wrap gap-y-3">
                              {/* Instagram */}
                              <a
                                href="https://www.instagram.com/abrolassociates/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 backdrop-blur-xl bg-background/40 rounded-full flex items-center justify-center hover:bg-background/60 transition-all duration-200 text-black border border-border/30 shadow-lg ring-1 ring-inset ring-white/10"
                              >
                                <FaInstagram className="w-5 h-5" />
                              </a>

                              {/* Facebook */}
                              <a
                                href="#"
                                className="w-10 h-10 backdrop-blur-xl bg-background/40 rounded-full flex items-center justify-center hover:bg-background/60 transition-all duration-200 text-black border border-border/30 shadow-lg ring-1 ring-inset ring-white/10"
                              >
                                <FaFacebookF className="w-5 h-5" />
                              </a>

                              {/* WhatsApp */}
                              <a
                                href="#"
                                className="w-10 h-10 backdrop-blur-xl bg-background/40 rounded-full flex items-center justify-center hover:bg-background/60 transition-all duration-200 text-black border border-border/30 shadow-lg ring-1 ring-inset ring-white/10"
                              >
                                <FaWhatsapp className="w-5 h-5" />
                              </a>
                            </div>
                          </div>

                          {/* Email Input */}
                          <div>
                            <p className="text-xs text-black mb-2 font-medium font-dm-sans">
                              Write your email
                            </p>
                            <div className="relative">
                              <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full backdrop-blur-xl bg-background/40 border border-border/30 rounded-full px-4 py-3 pr-12 text-black placeholder-black/70 focus:outline-none focus:border-border/50 focus:bg-background/60 transition-all duration-200 text-sm shadow-lg ring-1 ring-inset ring-white/10"
                              />
                              <button className="absolute right-2 top-1/2 transform translate-y-[-40%] w-8 h-8 backdrop-blur-xl bg-primary/80 rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-200 border border-border/30 shadow-lg ring-1 ring-inset ring-white/10">
                                <FiSend className="w-4 h-4 text-black" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>{" "}
        {/* Close content wrapper */}
        {/* Progress Bar - Only show on home section with multiple images */}
        {/*
        {currentSection === "home" && currentBackgroundImages.length > 1 && (
          <div
            className="absolute bottom-0 left-0 w-full transform scale-x-[-1] z-20"
            style={{ height: "30px" }}
          >
            <div className="w-full h-full bg-white/20">
              <div
                className="h-full bg-white/80"
                style={{
                  width: `${isResetting ? 0 : progressWidth}%`, // Go to 0% when resetting
                  transition: isResetting ? "width 0.5s ease-in-out" : "none", // Animate only during reset
                }}
              />
            </div>
          </div>
        )}
        */}
      </motion.div>

      {/* Marquee Section - Full Width with Borders */}
      {/* {currentSection === "home" && (
            <div className="bg-white/50 border-t border-b border-border">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="py-6 overflow-hidden"
              >
                <div className="flex whitespace-nowrap animate-marquee">
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  !text-white tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl  text-white/70 tracking-wider px-8">
                    <span className="fira-sans-medium-italic">How you grow matters</span>
                  </span>
                </div>
              </motion.div>
            </div>
          )} */}

      {/* Mobile Navigation Arrow Button - Only visible on mobile when on home section */}
      {currentSection === "home" && isMobile && introStep >= 4 && (
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

      {/* Home Intro Section - Only visible on Home page */}
      {currentSection === "home" && (
        <div className="bg-primary px-4 md:px-8 mt-0">
          <div className="max-w-4xl mx-auto text-center ">
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-12 "
            >
              <AnimatedIntroText
                texts={[
                  "Helping family-owned businesses grow, protect, and pass on wealth with strategy, care, and insight.",
                  "Expert Tax, Accounting & Advisory Services with a Personal Touch.",
                  "Connecting You to Clarity, Confidence and Control in Business & Wealth",
                ]}
                interval={4000}
              />
            </motion.div> */}

            {/* Call to Action Buttons */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <GlassSurface
                onClick={() => setIsCalendlyModalOpen(true)}
                className="inline-flex items-center px-8 py-4 cursor-pointer"
                borderRadius={20}
                blur={18}
                backgroundOpacity={0.08}
                hoverable={true}
              >
                <Calendar className="w-5 h-5 mr-3" />
                <span className="font-semibold text-lg">Book a Free Consultation</span>
              </GlassSurface>

              <a href="tel:0341495757">
                <GlassSurface
                  className="inline-flex items-center px-8 py-4"
                  borderRadius={20}
                  blur={18}
                  backgroundOpacity={0.08}
                  hoverable={true}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  <span className="font-semibold text-lg">Connect Now</span>
                </GlassSurface>
              </a>
            </motion.div> */}
          </div>
        </div>
      )}

      {/* Scroll Stack Section - Only visible on Home page */}
      {/* {currentSection === "home" && (
        <div className="bg-card">
          <ScrollStack cards={scrollStackCards} /> */}

      {/* Single Learn More Button */}
      {/* <div className="flex justify-center pt-6 pb-4 lg:pt-12 lg:pb-8">
            <Link href="/services">
              <GlassSurface
                className="inline-flex items-center px-8 py-4 lg:px-12 lg:py-5 group"
                borderRadius={20}
                blur={18}
                backgroundOpacity={0.08}
                hoverable={true}
              >
                <span className="font-semibold text-lg lg:text-xl">Explore Our Services</span>
                <svg
                  className="ml-3 lg:ml-4 w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </GlassSurface>
            </Link>
          </div>
        </div>
      } */}

      {/* Our Impact Section - Only visible on Home page */}
      {/* {currentSection === "home" && (
        <div className="bg-background text-foreground py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl  mb-4 text-primary">
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
      )} */}

      {/* Badges Section - Only visible on Home page */}
      {/* {currentSection === "home" && <BadgesSection />} */}

      {/* Calculator Tools Section - Only visible on Calculators page */}
      {/* No calculators section */}

      {/* Schedule a Call Button - Only show when scrolled past hero sections */}
      {/* {currentSection !== "services" && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          style={{
            opacity: modalOpacity,
            display: modalDisplay,
          }}
        >
          <GlassSurface
            onClick={() => setIsCalendlyModalOpen(true)}
            className="px-6 py-3 cursor-pointer flex items-center gap-2"
            borderRadius={25}
            blur={18}
            backgroundOpacity={0.08}
            hoverable={true}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-semibold">Schedule a Call</span>
          </GlassSurface>
        </motion.div>
      )} */}

      {/* Calendly Modal */}
      {/* <CalendlyModal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
        title="Schedule Your Financial Consultation"
      /> */}

      {/* Testimonials Section - Only visible on Home page */}
      {/* {currentSection === "home" && <SimpleTestimonials />} */}

      {/* Footer */}
      <Footer currentSection={currentSection} />
    </div>
  );
}
