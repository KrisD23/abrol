"use client";

import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import GlassSurface from "./GlassSurface";

interface NavbarProps {
  onSectionChange?: (section: string) => void;
}

export default function Navbar({ onSectionChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const router = useRouter();

  // const handleSectionNavigation = (section: string) => {
  //   // Close mobile menu immediately
  //   setIsMobileMenuOpen(false);

  //   if (onSectionChange) {
  //     onSectionChange(section);
  //   } else {
  //     // Use router.push without manual scrolling to prevent conflicts
  //     router.push(`/?section=${section}`);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 100);
    };

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check with a small delay to ensure proper initialization
    setTimeout(handleResize, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 ${
          isMobile ? "px-2 py-2 justify-between" : "px-6"
        } ${
          isScrolled
            ? "backdrop-blur-xl bg-background/20 border border-border/30 shadow-lg"
            : "backdrop-blur-sm bg-background/10"
        }`}
        initial={{ y: 0 }}
        animate={{
          y: 0,
          scale: isScrolled ? 1 : 1,
          borderRadius: isScrolled ? "1rem" : "0rem",
          paddingTop: isScrolled ? "0.25rem" : isMobile ? "0.25rem" : "0.5rem",
          paddingBottom: isScrolled
            ? "0.25rem"
            : isMobile
            ? "0.25rem"
            : "0.5rem",
          margin: isScrolled ? "0.5rem" : "0rem",
          marginLeft: isScrolled ? "1rem" : "0rem",
          marginRight: isScrolled ? "1rem" : "0rem",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (onSectionChange) {
              onSectionChange("home");
            }
          }}
          className="flex items-center flex-shrink-0"
        >
          {/* Logo Image - Always visible */}
          <div
            className="relative flex items-center"
            // Reduced height for more compact navbar while keeping good logo visibility
            style={{ width: "240px", height: "70px", overflow: "visible" }}
          >
            <Image
              src="/newnewlogo.png"
              alt="Abrol Associates Logo"
              // Adjusted height to match container for more compact design
              width={240}
              height={70}
              unoptimized={true}
              style={{
                zIndex: 10,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Text Animation - Independent of logo */}
          {/* <motion.div
            className="relative text-black font-bold text-lg font-bebas-neue"
            initial={{ width: "200px" }}
            animate={{
              width: isScrolled ? "140px" : "200px",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ overflow: "hidden", height: "1.75rem" }}
          >
            <motion.span
              className="absolute left-0 top-0 whitespace-nowrap text-xl flex"
              initial={{ opacity: 1, x: 0 }}
              animate={{
                opacity: 1,
                x: 0,
                fontSize: isScrolled ? "1rem" : "1.25rem",
                color: isScrolled ? "#222" : "#000",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <span className="font-trada-bold">Abrol</span>
              <span className="ml-2 font-trada-light font-bebas-neue">
                Associates
              </span>
            </motion.span>
          </motion.div> */}
        </Link>

        {/* Desktop Navigation Menu - Centered Layout */}
        {!isMobile && (
          <>
            <div className="flex-1 flex items-center justify-center mr-5">
              <motion.div
                animate={{
                  x: isScrolled ? -15 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* <GlassSurface 
                  className="px-8 py-3"
                  borderRadius={24}
                  blur={20}
                  backgroundOpacity={0.05}
                  hoverable={false}
                > */}
                <ul className="flex items-center space-x-12 text-2xl font-bebas-neue">
                  {/* <li>
                    <Link
                      href="/our-mission"
                      className="relative nav-link group transition-colors duration-300"
                    >
                      <span className="!text-white">Our Mission</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/what-makes-us-different"
                      className="relative nav-link group transition-colors duration-300"
                    >
                      <span className="!text-white">
                        What Makes Us Different
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li> */}

                  {/* <li>
                    <Link
                      href="/about"
                      className="relative nav-link group transition-colors duration-300 font-bebas-neue"
                    >
                      <span className="!text-white font-bebas-neue">
                        About Us
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="relative nav-link group transition-colors duration-300 font-bebas-neue"
                    >
                      <span className="!text-white font-bebas-neue">
                        Services
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link
                      href="/blog"
                      className="relative nav-link group transition-colors duration-300 font-bebas-neue"
                    >
                      <span className="!text-white font-bebas-neue">Blog</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      href="/news"
                      className="relative nav-link group transition-colors duration-300 font-bebas-neue"
                    >
                      <span className="!text-white font-bebas-neue">News</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      href="/abn"
                      className="relative nav-link group transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="!text-white">ABN</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li> */}

                  <li>
                    <Link
                      href="/contact"
                      className="relative nav-link group transition-colors duration-300 font-bebas-neue"
                    >
                      <span className="!text-white font-bebas-neue">
                        Contact Us
                      </span>
                      <span className="absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                </ul>
                {/* </GlassSurface> */}
              </motion.div>
            </div>

            {/* Talk to Us Button - Extreme Right */}
            <a href="tel:+61341495757">
              <motion.div
                animate={{
                  x: isScrolled ? -15 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <GlassSurface
                  className="px-6 py-2 cursor-pointer"
                  borderRadius={24}
                  blur={20}
                  backgroundOpacity={0.08}
                  hoverable={true}
                  textColor="text-white"
                >
                  <span className="font-medium text-xl font-bebas-neue">
                    Talk to Us
                  </span>
                </GlassSurface>
              </motion.div>
            </a>
          </>
        )}

        <div className="flex items-center space-x-2 text-muted-foreground">
          {/* Mobile Menu Button - Show on mobile screens */}
          <motion.div
            className={`mr-4 md:hidden ${
              isMobileMenuOpen ? "hidden" : "block"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GlassSurface
              className="p-2 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
              borderRadius={16}
              blur={16}
              backgroundOpacity={0.2}
              hoverable={true}
            >
              <FiMenu className="w-5 h-5" />
            </GlassSurface>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-2xl bg-background/80 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-border/30 backdrop-blur-xl bg-background/20">
              <div className="flex items-center">
                {/* <Image
                  src="/Abrol_Animation.gif"
                  alt="Abrol Associates Logo"
                  width={28}
                  height={28}
                  className="mr-3"
                /> */}
                <Image
                  src="/newnewlogo.png"
                  alt="Abrol Associates Logo"
                  // Slightly larger for mobile header so it's more visible
                  width={240}
                  height={70}
                  className="mr-3"
                />
                {/* <span className="!text-white text-base flex">
                  <span className="font-trada-bold font-bebas-neue">ABROL</span>
                  <span className="ml-2 font-trada-light font-bebas-neue">
                    ASSOCIATES
                  </span>
                </span> */}
              </div>
              <GlassSurface
                className="p-2 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
                borderRadius={16}
                blur={16}
                backgroundOpacity={0.2}
                hoverable={true}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </GlassSurface>
            </div>

            {/* Mobile Menu Items */}
            <motion.div
              className="flex flex-col space-y-6 p-6 pt-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* <Link
                href="/our-mission"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                Our Mission
              </Link>
              <Link
                href="/what-makes-us-different"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                What Makes Us Different
              </Link> */}
              {/* <Link
                href="/about"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                Services
              </Link> */}
              {/* <Link
                href="/blog"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                Blog
              </Link> */}
              <Link
                href="/news"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent font-bebas-neue hover:border-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                News
              </Link>
              <Link
                href="/contact"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent font-bebas-neue hover:border-primary-foreground"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact Us
              </Link>
              {/* <Link
                href="/abn"
                className="text-left text-primary-foreground text-xl py-3 px-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary-foreground"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                Abn
              </Link> */}
            </motion.div>

            {/* Language Selector in Mobile Menu */}
            <div className="absolute bottom-8 left-6 flex items-center space-x-2 text-primary-foreground/60">
              <span className="text-sm">Language:</span>
              <span className="text-sm text-primary-foreground">Eng</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
