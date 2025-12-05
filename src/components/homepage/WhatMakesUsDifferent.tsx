"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatMakesUsDifferent = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // --- Heading Animation ---
      gsap.from(".wmud-heading", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% 85%",
          toggleActions: "play none none reset",
        },
      });

      // --- Content Animation ---
      gsap.from(".wmud-content", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% 75%",
          toggleActions: "play none none reset",
        },
      });

      // --- Points Animation ---
      gsap.from(".wmud-point", {
        xPercent: -200,
        opacity: 1,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% 70%",
          toggleActions: "play none none reset",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-8 sm:px-18 lg:px-28 pt-28 pb-20">
      {/* HEADING */}
      <div className="flex flex-col gap-4">
        <div className="lg:h-20 overflow-hidden">
          <h1 className="wmud-heading text-6xl font-semibold">
            What Makes Us Different
          </h1>
        </div>

        {/* CONTENT */}
        <div className="lg:h-10 overflow-hidden">
          <p className="wmud-content text-xl text-gray-300">
            More than accounting. A network designed to grow your business.
          </p>
        </div>
        <div className="sm:h-14 overflow-hidden">
          <p className="wmud-content text-gray-300 max-w-2xl">
            We support business owners who want more than compliance. You gain
            clarity, confidence and the right connections to move forward.
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-12 mt-20">
        {/* IMAGE FIRST on small screens, SECOND on xl and above */}
        <div className="col-span-12 lg:col-span-6 flex justify-start lg:justify-end order-1 lg:order-2">
          <Image
            src={"/WhatMakesUsDifferent.jpg"}
            width={400}
            height={330}
            alt="What Makes Us Different"
            className="object-cover rounded-lg w-80 sm:w-full xs:max-w-sm sm:max-w-md"
          />
        </div>

        {/* POINTS SECOND on small screens, FIRST on xl and above */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-12 order-2 lg:order-1">
          {/* POINT 1 */}
          <div className="flex gap-4 group transition-all duration-300 hover:-translate-y-1">
            {/* LEFT LINE */}
            <div className="border h-full border-white elegant-line"></div>

            <div className="max-w-2xl w-sm sm:w-2xl overflow-hidden">
              <div className="wmud-point">
                <h1 className="text-xl font-semibold text-[var(--secondary-brand)]">
                  Trusted Advice
                </h1>

                <p className="text-gray-300">
                  Expert guidance that brings transparency and confidence.
                </p>
              </div>
            </div>
            <div className="mt-6"></div>
          </div>

          {/* Long Term Focus */}
          {/* POINT 2 */}
          <div className="flex gap-4 group transition-all duration-300 hover:-translate-y-1">
            {/* LEFT LINE */}
            <div className="border h-full border-white elegant-line"></div>

            <div className="max-w-2xl w-sm sm:w-2xl overflow-hidden">
              <div className="wmud-point">
                <h1 className="text-xl font-semibold text-[var(--secondary-brand)]">
                  Connected Expertise
                </h1>

                <p className="text-gray-300">
                  We bring the right people into the room so your business moves
                  faste
                </p>
              </div>
            </div>
            <div className="mt-6"></div>
          </div>

          {/* POINT 3 */}
          <div className="flex gap-4 group transition-all duration-300 hover:-translate-y-1">
            {/* LEFT LINE */}
            <div className="border h-full border-white elegant-line"></div>

            <div className="max-w-2xl w-sm sm:w-2xl overflow-hidden">
              <div className="wmud-point">
                <h1 className="text-xl font-semibold text-[var(--secondary-brand)]">
                  Long Term Focus
                </h1>

                <p className="text-gray-300">
                  Strategies that protect wealth and strengthen your future
                  legacy.
                </p>
              </div>
            </div>
            <div className="mt-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;
