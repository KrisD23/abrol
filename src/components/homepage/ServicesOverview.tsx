"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Business Accounting & Compliance",
    description:
      "Reliable, accurate and timely reporting that keeps your business on track.",
    icon: "📊",
  },
  {
    title: "Strategic Advisory",
    description:
      "Clear financial insight that helps you plan, grow and make confident decisions.",
    icon: "📈",
  },
  {
    title: "Financial Connections",
    description:
      "Access to trusted professionals across legal, finance, operations and wealth management.",
    icon: "🤝",
  },
  {
    title: "Wealth & Legacy Planning",
    description:
      "Forward-thinking structures and strategies to protect what you are building.",
    icon: "🏛️",
  },
];

export default function ServicesOverview() {
  return (
    <section className="px-28 pt-28 pb-20">
      <div className="flex flex-col  gap-6">
        <h1 className="text-6xl font-semibold ">Services Overview</h1>
        <p className="text-xl text-gray-300">
          Supporting every stage of your business journey.
        </p>
        <p className=" text-gray-300 max-w-2xl">
          From foundational accounting to high level financial strategy and
          curated professional connections, we offer comprehensive guidance
          built around your goals.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-12 mt-20">
        {/* 1 */}
        <div className="col-span-3 h-80 border-2 rounded-lg overflow-hidden relative">
          <Image
            src={"/1.jpg"}
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
            <h2 className="text-white text-lg font-semibold">
              Business Accounting & Compliance
            </h2>
            <p className="text-white text-sm mt-1">
              Reliable, accurate and timely reporting that keeps your business
              on track.
            </p>
          </div>
        </div>

        {/*  2 */}
        <div className="col-span-3 h-80 border-2 rounded-lg overflow-hidden relative">
          <Image
            src={"/advisory.jpg"}
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
            <h2 className="text-white text-lg font-semibold">
              Strategic Advisory
            </h2>
            <p className="text-white text-sm mt-1">
              Clear financial insight that helps you plan, grow and make
              confident decisions.
            </p>
          </div>
        </div>

        {/* 3 */}
        <div className="col-span-3 h-80 border-2 rounded-lg overflow-hidden relative">
          <Image
            src={"/bg4.jpg"}
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
            <h2 className="text-white text-lg font-semibold">
              Financial Connections
            </h2>
            <p className="text-white text-sm mt-1">
              Access to trusted professionals across legal, finance, operations
              and wealth management.
            </p>
          </div>
        </div>

        {/* 4 */}
        <div className="col-span-3 h-80 border-2 rounded-lg overflow-hidden relative">
          <Image
            src={"/asset-protection.jpg"}
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
            <h2 className="text-white text-lg font-semibold">
              Wealth & Legacy Planning
            </h2>
            <p className="text-white text-sm mt-1">
              Forward-thinking structures and strategies to protect what you are
              building.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
