// components/ConnectorElement.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectorElement() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const chipsRow = sectionRef.current.querySelector(".chips-row");
    if (!chipsRow) return;

    const ctx = gsap.context(() => {
      // HEADINGS
      gsap.from(".wmud-heading", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // SUB CONTENT
      gsap.from(".wmud-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% 80%",
          once: true,
        },
      });

      // LEFT PARAGRAPH
      gsap.from(".wmud-point", {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% 70%",
          once: true,
        },
      });

      // CHIP ROW animation — uses the actual chipsRow element as trigger
      gsap.from(".connector-key", {
        y: 20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: chipsRow,
          start: "top 96%", // make sure it triggers when chips are in view
          toggleActions: "play none none reset"

        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const chips = [
    "Legal",
    "Finance",
    "Operations",
    "Wealth Management",
    "Strategy",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative px-8 sm:px-18 lg:px-28 pt-15 pb-20"
    >
      {/* Background grid (behind everything) */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] [background-size:30px_30px]"
      />

      {/* Heading */}
      <div className="lg:h-18 overflow-hidden">
        <h1 className="wmud-heading text-6xl font-semibold">
          The <span style={{ color: "var(--secondary-brand)" }}>Connector</span>{" "}
          Element
        </h1>
      </div>

      {/* Grid content */}
      <div className="grid grid-cols-12 gap-12 mt-20">
        <div className="col-span-12 lg:col-span-6 text-xl">
          <div className="flex flex-col gap-4">
            <div className="lg:h-8 overflow-hidden">
              <h2 className="wmud-content text-xl sm:text-2xl font-medium">
                Connections that create opportunity.
              </h2>
            </div>
            <div className="lg:h-8 overflow-hidden">
              <h2 className="wmud-content text-lg sm:text-xl font-medium">
                Business growth is rarely achieved alone.
              </h2>
            </div>
          </div>

          <div className="mt-4 lg:mt-20 flex flex-col gap-2 font-bold">
            <p className="text-gray-400/40">Your network, strengthened.</p>
            <p className="text-gray-400/40">Your business, elevated.</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex gap-4 sm:gap-8 lg:gap-14">
          <div className="bg-border" />
          <div className="max-w-2xl w-sm sm:w-2xl overflow-hidden">
            <div className="wmud-point flex flex-col gap-12 text-gl sm:text-xl max-w-80 sm:max-w-full">
              <p>
                With years of trusted relationships across{" "}
                <span className="text-[var(--secondary-brand)]">
                  multiple industries
                </span>
                , We help you access the expertise you need at the right time.
              </p>
              <p>
                From legal specialists and financial planners to brokers and
                operational partners,
                <span className="italic"> you gain a trusted network</span> selected
                to support your success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHIP ROW */}
      <div className="w-full mt-16 sm:mt-20 flex justify-center">
        {/* Key changes:
            - no wrapping (flex-nowrap)
            - prevent shrinking of items (flex-shrink-0)
            - ensure enough max width so items can sit on one line on typical desktop
        */}
        <div className="chips-row relative z-20 flex flex-wrap justify-center gap-6 sm:gap-9 max-w-[1100px]">
          {chips.map((item, i) => (
      <div
        key={i}
        className="
          connector-key
          min-w-[160px]
          h-14 px-6 
          bg-gray-200/20 
          text-sm rounded-full 
          text-gray-200 
          border-2 border-white/10
          flex items-center justify-center whitespace-nowrap
          transition-all duration-300 ease-out
          hover:bg-[var(--secondary-brand)]/25 
          hover:border-[var(--secondary-brand)] 
          hover:text-white
          transform-gpu
        "
      >

              <p className="m-0">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
