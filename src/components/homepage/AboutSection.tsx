"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // === Heading Animation ===
      gsap.from(".wmud-heading", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // === Content Lines Animation ===
      gsap.from(".wmud-content", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reset",
        },
      });

      // === Button Animation (left → right) ===
      gsap.from(".about-btn", {
        x: -100,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reset",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-8 sm:px-18 lg:px-28 pt-15 pb-20">
      {/* Animated Heading */}
      <div className="lg:h-18 overflow-hidden">
        <h1 className="wmud-heading text-6xl font-semibold">About</h1>
      </div>

      <div className="grid grid-cols-12 gap-12 mt-14">
        {/* LEFT SIDE CONTENT */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1">
          {/* Line 1 */}
          <div className="2xl:h-10 overflow-hidden">
            <h2 className="wmud-content text-xl font-medium  max-w-96 sm:max-w-full">
              Your trusted partner for clarity, growth and long term stability.
            </h2>
          </div>

          {/* Animated paragraph lines */}
          <div className="lg:h-18 overflow-hidden">
            <p className="wmud-content max-w-96 sm:max-w-full">
              We work closely with business owners to simplify financial
              decision-making and create meaningful progress. My approach is
              grounded in trust, transparency and strong relationships.
            </p>
          </div>

          <div className="lg:h-16 overflow-hidden">
            <p className="wmud-content  max-w-96 sm:max-w-full">
              You receive accurate accounting, strategic insight and a network
              designed to support your goals today while safeguarding your
              future.
            </p>
          </div>

          {/* Non-animated content */}
          <div>
            <p className="text-gray-400/60 text-xl font-medium  max-w-96 sm:max-w-full">
              This is advice built on experience, connection and genuine care
              for your success.
            </p>
            <p className="text-gray-400/60 text-xl font-medium"></p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="col-span-12 lg:col-span-6 flex justify-start lg:justify-end order-1 lg:order-2 lg:pl-20">
          <Image
            src={"/ab_bg.png"}
            alt=""
            width={500}
            height={500}
            className="object-cover rounded-lg w-80 sm:w-full xs:max-w-sm sm:max-w-md"
          />
        </div>
      </div>

      {/* BUTTON (left → right animation) */}
      <button className="about-btn mt-10 px-6 py-3 rounded-lg font-medium bg-gray-200/20 text-gray-200 border-2 border-gray-400/40">
        Learn More About Us
      </button>
    </section>
  );
}
