"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    helpType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      helpType: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="relative backdrop-blur-xl bg-background/60 rounded-2xl p-4 sm:p-8 w-full shadow-xl transition-all duration-300 ease-in-out border border-border/30 ring-1 ring-inset ring-white/10">
        <div className="relative z-10">
          <h3 className="text-xl  text-black mb-6 text-center font-sans">
            Send us a message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b border-border focus:border-primary rounded-none px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all duration-200 shadow-none"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b border-border focus:border-primary rounded-none px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all duration-200 shadow-none"
              placeholder="your.email@example.com"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b border-border focus:border-primary rounded-none px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all duration-200 shadow-none"
              placeholder="Phone Number"
              required
            />
            <select
              name="helpType"
              value={formData.helpType}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b border-border focus:border-primary rounded-none px-0 py-3 text-base text-foreground focus:outline-none focus:ring-0 transition-all duration-200 shadow-none"
              required
            >
              <option value="" disabled className="text-muted-foreground">
                How can we help?
              </option>
              <option value="Tax">Tax</option>
              <option value="Restructure">Restructure</option>
              <option value="Private Advisory">Private Advisory</option>
              <option value="Bookkeeping">Bookkeeping</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full bg-transparent border-0 border-b border-border focus:border-primary rounded-none px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all duration-200 shadow-none resize-none"
              placeholder="Tell us about your financial needs..."
              required
            />
            <button
              type="submit"
              className="w-full backdrop-blur-xl bg-primary/80 hover:bg-primary/90 text-black py-3 px-4 rounded-2xl transition-all duration-200 text-base font-semibold shadow-lg border border-border/30 ring-1 ring-inset ring-white/10"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
