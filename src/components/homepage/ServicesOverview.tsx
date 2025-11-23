"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesOverview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // === Heading Animation (bottom → top) ===
      gsap.from(".wmud-heading", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% 85%",
          toggleActions: "play none none reset",
        },
      });

      // === Content Animation (bottom → top) ===
      gsap.from(".wmud-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% 80%",
          toggleActions: "play none none reset",
        },
      });

      // === Card hover animation ===
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card) => {
        const overlay = card.querySelector<HTMLElement>(
          ".service-hover-overlay"
        );
        if (!overlay) return;

        gsap.set(overlay, { y: "100%" });

        card.addEventListener("mouseenter", () => {
          gsap.to(overlay, {
            y: "0%",
            duration: 0.4,
            ease: "power3.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(overlay, {
            y: "100%",
            duration: 0.4,
            ease: "power3.inOut",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-8 sm:px-18 lg:px-28 pt-28 pb-20">
      <div className="flex flex-col gap-6">
        <div className="lg:h-18 overflow-hidden">
          <h1 className="wmud-heading text-6xl font-semibold">
            Services Overview
          </h1>
        </div>

        <div className="lg:h-8 overflow-hidden">
          <p className="wmud-content text-xl text-gray-300">
            Supporting every stage of your business journey.
          </p>
        </div>

        <div className="sm:h-14 overflow-hidden">
          <p className="wmud-content text-gray-300 max-w-2xl">
            From foundational accounting to high level financial strategy and
            curated professional connections, we offer comprehensive guidance
            built around your goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12 xl:gap-6 2xl:gap-12  mt-20">
        {/* CARD TEMPLATE COMPONENT */}
        {[
          {
            title: "Business Accounting & Compliance",
            desc: "Reliable, accurate and timely reporting that keeps your business on track.",
            img: "/1.jpg",
          },
          {
            title: "Strategic Advisory",
            desc: "Clear financial insight that helps you plan, grow and make confident decisions.",
            img: "/advisory.jpg",
          },
          {
            title: "Financial Connections",
            desc: "Access to trusted professionals across legal, finance, operations and wealth management.",
            img: "/bg4.jpg",
          },
          {
            title: "Wealth & Legacy Planning",
            desc: "Forward-thinking structures and strategies to protect what you are building.",
            img: "/asset-protection.jpg",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="service-card col-span-8 sm:col-span-12 xl:col-span-3 lg:col-span-4 md:col-span-6 
                       h-80 border-2 rounded-lg overflow-hidden relative cursor-pointer"
          >
            <Image
              src={card.img}
              alt=""
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* HOVER ANIMATION OVERLAY */}
            <div className="service-hover-overlay absolute inset-0 bg-black z-30"></div>

            {/* TEXT CONTENT */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 z-40">
              <h2 className="text-white text-lg font-semibold">{card.title}</h2>
              <p className="text-white text-sm mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
