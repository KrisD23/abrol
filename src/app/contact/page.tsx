"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import GlassSurface from "@/components/GlassSurface";
import { Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleCallClick = () => {
    window.location.href = "tel:034149575757"; // for click-to-call
  };

  const handleMessageClick = () => {
    setShowContactForm(true);
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Contact Section - Modern SaaS Layout */}
      <div className="relative min-h-screen text-foreground overflow-hidden bg-background flex flex-col items-center justify-center px-2 md:px-0">
        {/* Background Photo */}
        <div className="fixed inset-0 w-full h-full z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('117.jpg')",
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-center mb-10"
          >
            <h1 className="text-3xl md:text-6xl font-bold font-bebas-neue tracking-wide text-black mb-4 font-sans">
              Let&apos;s Build Something Worth Passing On
            </h1>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Connect with us today. Whether it&apos;s a new venture, a growing
              empire, or a legacy in the making — we&apos;re ready when you are.
            </p>
          </motion.div>

          {/* Modern Action Buttons or Form */}
          {!showContactForm ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-12"
            >
              <GlassSurface
                onClick={handleCallClick}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 cursor-pointer"
                borderRadius={16}
                blur={18}
                backgroundOpacity={0.08}
                hoverable={true}
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-semibold text-base font-sans text-white">
                  Talk to Us
                </span>
              </GlassSurface>

              <GlassSurface
                onClick={handleMessageClick}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 cursor-pointer"
                borderRadius={16}
                blur={18}
                backgroundOpacity={0.08}
                hoverable={true}
              >
                <Mail className="w-5 h-5 mr-2" />
                <span className="font-semibold text-base font-sans text-white">
                  Send Us a Message
                </span>
              </GlassSurface>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xl mx-auto"
            >
              <div className="bg-background/80 p-4 sm:p-8 md:p-12 rounded-2xl shadow-xl flex flex-col items-center border-none">
                <div className="flex items-center justify-between w-full mb-4">
                  <h2 className="text-xl md:text-2xl  text-foreground font-sans">
                    Send Us a Message
                  </h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-muted-foreground hover:text-primary text-sm underline"
                  >
                    Back to options
                  </button>
                </div>
                {/* Modern, borderless form */}
                <div className="w-full">
                  <ContactForm />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
