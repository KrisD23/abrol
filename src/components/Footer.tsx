"use client";

import Image from "next/image";
import { useState } from "react";
import TermsModal from "./TermsModal";
import PrivacyModal from "./PrivacyModal";

interface FooterProps {
  currentSection?: string;
}

const disclaimers = {
  home: "The information provided is general in nature and does not take into account your personal circumstances. Please seek professional advice before acting.",
  blog: "This article contains general information only and is not intended to be relied upon as professional advice. Please consult your advisor for advice specific to your situation.",
  calculator:
    "This calculator provides indicative results only and should not be relied upon as financial, accounting, or tax advice.",
  testimonials:
    "Testimonials are provided with client consent. Outcomes may differ depending on individual circumstances.",
  contact:
    "We respect your privacy. Information provided will be handled in accordance with our Privacy Policy.",
  services:
    "Abrol Associates does not provide legal advice. We work alongside legal professionals where required. Please seek independent legal advice before making decisions.",
  about:
    "The information provided is general in nature and does not take into account your personal circumstances. Please seek professional advice before acting.",
};

export default function Footer({ currentSection = "home" }: FooterProps) {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-primary text-primary-foreground py-10 px-12">
        {/* Banner Image at the very top - Marquee Effect */}
        {/* <div className="w-full mb-8 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            <div className="flex items-center min-w-full">
              <Image
                src="/banner_transparent.png"
                alt="Certification Banner"
                width={1200}
                height={220}
                style={{ objectFit: "contain" }}
                priority
                className="mx-8"
              />
              <Image
                src="/banner_transparent.png"
                alt="Certification Banner"
                width={1200}
                height={220}
                style={{ objectFit: "contain" }}
                className="mx-8"
              />
              <Image
                src="/banner_transparent.png"
                alt="Certification Banner"
                width={1200}
                height={220}
                style={{ objectFit: "contain" }}
                className="mx-8"
              />
              <Image
                src="/banner_transparent.png"
                alt="Certification Banner"
                width={1200}
                height={220}
                style={{ objectFit: "contain" }}
                className="mx-8"
              />
              <Image
                src="/banner_transparent.png"
                alt="Certification Banner"
                width={1200}
                height={220}
                style={{ objectFit: "contain" }}
                className="mx-8"
              />
            </div>
          </div>
        </div> */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Left Column - Logo and Description */}
            <div className="md:col-span-1">
              <div
                className="relative flex items-center justify-center"
                style={{ width: "280px", height: "120px", overflow: "visible" }}
              >
                <Image
                  src="/newnewlogo.png"
                  alt="Abrol Associates Logo"
                  width={360}
                  height={360}
                  style={{
                    zIndex: 10,
                  }}
                />
              </div>
              <div className="mb-6">
                <p className="text-primary-foreground/90 font-medium mb-2 ">
                  Your Bridge to Financial Solutions.
                </p>
                <p className="text-primary-foreground/70">
                  Trust, Expertise, Results.
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/abrolassociates/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z" />
                  </svg>
                </a>
                {/* <a
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085" />
                  </svg>
                </a> */}
              </div>
            </div>

            {/* Services Column */}
            <div className="mt-10">
              <h3 className="text-[var(--secondary-brand)] text-2xl mb-6 font-bebas-neue">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground font-sans transition-colors"
                  >
                    Financial consultations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground font-sans transition-colors"
                  >
                    Tax preparation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground font-sans transition-colors"
                  >
                    Bookkeeping services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground font-sans transition-colors"
                  >
                    Business advisory
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours Column */}
            <div className="mt-10">
              <h3 className="text-[var(--secondary-brand)] text-2xl mb-6 font-bebas-neue">
                Hours
              </h3>
              <div className="space-y-3">
                <div className="text-primary-foreground/70">
                  <p>Monday - Friday</p>
                  <p className="font-medium">9:00 AM - 5:00 PM</p>
                </div>
                <div className="text-primary-foreground/70">
                  <p>Saturday - Sunday</p>
                  <p className="font-medium">Closed</p>
                </div>
              </div>
            </div>

            {/* Contacts Column */}
            <div className="mt-10">
              <h3 className="text-[var(--secondary-brand)] text-2xl mb-6 font-bebas-neue">
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="text-primary-foreground/70">
                  <p className="font-semibold">+61 3414 95757</p>
                </div>
                <div className="text-primary-foreground/70">
                  <p>Suite 2, Level 10, 460 Bourke Street</p>
                  <p>Melbourne, 3000</p>
                </div>
                <a
                  href="mailto:pabrol@abrolassociates.com.au"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block hover:underline"
                >
                  pabrol@abrolassociates.com.au
                </a>
                {/* Multiple Phone Numbers */}
              </div>
            </div>
          </div>

          {/* Terms and Privacy - Above the gray line */}
          <div className="flex justify-end mt-12 mb-4">
            <div className="flex space-x-6">
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="text-primary-foreground/60 hover:text-primary-foreground  font-sans transition-colors text-sm"
              >
                Terms
              </button>
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-primary-foreground/60 hover:text-primary-foreground font-sans transition-colors text-sm"
              >
                Privacy
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="mb-6">
              <p className="text-primary-foreground/60 text-sm  leading-relaxed max-w-4xl">
                {disclaimers[currentSection as keyof typeof disclaimers] ||
                  disclaimers.home}
              </p>
            </div>

            {/* Bottom Border */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className=" flex flex-row">
                <p className="text-black/50 text-sm">
                  © 2025 Abrol Associates - All rights reserved
                </p>
                <p className="text-black/50 text-sm ml-6">
                  Crafted by{" "}
                  <a
                    href="https://www.aimarketingpartners.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold hover:text-primary-foreground"
                  >
                    AiMarketingPartners
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </>
  );
}
