"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function ConnectorElement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // === Heading Animation (bottom → top)
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

      // === Content Animation (bottom → top)
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

      // === wmud-point Animation (left → right)
      gsap.from(".wmud-point", {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% 70%",
          toggleActions: "play none none reset",
        },
      });

      // === Key Points Stagger (bottom → top)
      gsap.from(".connector-key", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% 65%",
          toggleActions: "play none none reset",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-8 sm:px-18 lg:px-28 pt-15 pb-20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] [background-size:30px_30px]" />

      <div className="lg:h-18 overflow-hidden">
        <h1 className="wmud-heading text-6xl font-semibold">
          The Connector Element
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-12 mt-20">
        {/*   <div className="col-span-12 lg:col-span-6 flex justify-start lg:justify-end order-1 lg:order-2"> */}
        <div className=" col-span-12 lg:col-span-6 text-xl  ">
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

          <div className="mt-4 lg:mt-20 flex flex-col gap-2 font-bold ">
            <p className="text-gray-400/60">Your network, strengthened.</p>
            <p className="text-gray-400/60">Your business, elevated.</p>
          </div>
        </div>
        <div className="col-span-10 sm:col-span-12 lg:col-span-6 border-white  flex gap-4 sm:gap-8 lg:gap-14 ">
          <div className="border border-white" />
          <div className="max-w-2xl w-sm sm:w-2xl overflow-hidden">
            <div className="wmud-point flex flex-col gap-12 text-gl sm:text-xl max-w-80 sm:max-w-full">
              <p>
                With years of trusted relationships across multiple industries,
                We help you access the expertise you need at the right time.
              </p>
              <p>
                From legal specialists and financial planners to brokers and
                operational partners, you gain a trusted network selected to
                support your success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key points Stagger */}
      <div className="grid grid-cols-12 gap-6 sm:gap-9 mt-16 sm:mt-20 font-medium max-w-2xl ">
        {[
          "Legal",
          "Finance",
          "Operations",
          "Wealth Management",
          "Strategy",
        ].map((item, i) => (
          <div
            key={i}
            className="connector-key col-span-4 sm:col-span-3 h-14 md:col-span-3 px-4 py-3 bg-gray-200/20 text-sm rounded-full text-gray-200 border-2 border-gray-400/40 flex flex-col items-center justify-center text-center"
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
