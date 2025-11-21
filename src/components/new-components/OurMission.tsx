"use client";
import React from "react";

import { motion } from "framer-motion";
import GlassSurface from "../../components/GlassSurface";

// import Beams from "@/components/Beams";

const OurMission = () => {
  return (
    <>
      {/* Beams Background */}
      {/* <div className="fixed inset-0 w-full h-full z-0 opacity-60">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={8}
          lightColor="#ffffff"
          speed={1.5}
          noiseIntensity={1.2}
          scale={0.15}
          rotation={25}
        />
      </div> */}
      {/* Our Mission Section */}
      <div className="relative z-10 text-white py-20 px-4 md:px-8 pt-32 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bebas-neue font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              To connect our clients to prosperity through personal
              relationships, economic intelligence, and values-driven advisory.
            </p>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              Our commitment to excellence is built on four core principles that
              guide everything we do.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: "01",
                title: "Forming Relationships",
                description:
                  "In our opinion, building a solid relationship is imperative to giving the best advice to our clients which is why we take the time to really get to know our clients.",
              },
              {
                number: "02",
                title: "Collaborating with Clients",
                description:
                  "Let's be honest, no one likes being told what to do. The best advice is given when we work together to achieve the desired outcome. This enables our clients to really understand why we think a particular way as well as ask as many questions throughout the process.",
              },
              {
                number: "03",
                title: "Innovating in our field",
                description:
                  "By continually innovating, we stay at the top of our game. This allows us to look for new ideas for our clients and new ways of doing things so they can stay at the top of theirs.",
              },
              {
                number: "04",
                title: "Results Focused",
                description:
                  "This is our why. We are here to do as much as possible to ensure our clients achieve whatever it is they want to achieve.",
              },
              {
                number: "05",
                title: "Integrity & Trust",
                description:
                  "We believe that trust is earned through consistent actions and transparent communication. Every decision we make is guided by our unwavering commitment to integrity and ethical practices.",
              },
              {
                number: "06",
                title: "Long-term Partnership",
                description:
                  "We don't just provide solutions; we build lasting partnerships. Our goal is to be your trusted advisor for years to come, adapting and growing with your changing needs.",
              },
            ].map((principle, idx) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + idx * 0.12,
                  ease: "easeOut",
                }}
                className="relative group"
              >
                <GlassSurface
                  className="p-8 h-full relative overflow-hidden"
                  borderRadius={16}
                  blur={16}
                  backgroundOpacity={0.08}
                  hoverable={true}
                  textColor="text-white"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <span className="text-3xl font-bold text-white group-hover:text-white transition-colors duration-300">
                        {principle.number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-300">
                        {principle.title}
                      </h3>
                      {/* Horizontal white line on hover */}
                      <div className="w-0 h-0.5 bg-white mb-4 group-hover:w-12 transition-all duration-300 ease-out"></div>
                      <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors duration-300 mb-5">
                        {principle.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle animated accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500 ease-out"></div>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10"></div>
    </>
  );
};

export default OurMission;
