"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavbarCompProps {
  brandName?: string;
  brandShort?: string;
  navItems?: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
  showLanguageSelector?: boolean;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
}

export default function NavbarComp({
  brandName = "Abrol Associates",
  brandShort = "AA",
  navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "/contact" },
  ],
  showLanguageSelector = true,
  backgroundColor = "black/80",
  textColor = "white",
  hoverColor = "white",
}: NavbarCompProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 transition-all duration-300 ${
        isScrolled ? `bg-${backgroundColor} backdrop-blur-md` : ""
      }`}
      initial={{ y: 0 }}
      animate={{
        y: 0,
        scale: isScrolled ? 0.95 : 1,
        borderRadius: isScrolled ? "2rem" : "0rem",
        paddingTop: isScrolled ? "1rem" : "2rem",
        paddingBottom: isScrolled ? "1rem" : "2rem",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Left side - Logo and Navigation Menu */}
      <div className="flex items-center space-x-4">
        {/* Logo/Brand with Animation */}
        <Link href="/" className="flex items-center">
          <motion.div
            className={`relative text-${textColor} font-bold text-lg`}
            initial={{ width: `${brandName.length * 10}px` }}
            animate={{
              width: isScrolled ? "32px" : `${brandName.length * 10}px`,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ overflow: "hidden", height: "1.75rem" }}
          >
            <motion.span
              className="absolute left-0 top-0 whitespace-nowrap"
              initial={{ opacity: 1, x: 0 }}
              animate={{
                opacity: isScrolled ? 0 : 1,
                x: isScrolled ? -160 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {brandName}
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 whitespace-nowrap"
              initial={{ opacity: 0, x: 160 }}
              animate={{
                opacity: isScrolled ? 1 : 0,
                x: isScrolled ? 0 : 160,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: isScrolled ? 0.3 : 0,
              }}
            >
              {brandShort}
            </motion.span>
          </motion.div>
        </Link>

        {/* Animated Vertical Divider */}
        <motion.div
          className="h-6 bg-gray-600"
          animate={{
            width: "1px",
            x: isScrolled ? -15 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Navigation Menu */}
        <motion.div
          className="bg-[#1a1a1a] backdrop-blur-md rounded-lg px-8 py-3 border border-gray-900/50"
          animate={{
            x: isScrolled ? -15 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <ul className="flex space-x-8 text-sm text-gray-300">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-${hoverColor} transition-colors duration-200`}
                  >
                    {item.label}
                  </a>
                ) : item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    className={`hover:text-${hoverColor} transition-colors duration-200`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`hover:text-${hoverColor} transition-colors duration-200`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Language Selector */}
      {showLanguageSelector && (
        <div className="flex items-center space-x-2 text-gray-300">
          <span className="text-sm">Eng</span>
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
      )}
    </motion.nav>
  );
}
