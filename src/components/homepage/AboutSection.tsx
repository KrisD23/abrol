"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="px-28 pt-20 pb-28">
      <h1 className="text-6xl font-semibold ">About</h1>

      <div className="grid grid-cols-12 gap-12 mt-14">
        <div className=" col-span-6 flex flex-col gap-8">
          <h2 className="text-xl font-medium">
            Your trusted partner for clarity, growth and long term stability.
          </h2>
          <p>
            We work closely with business owners to simplify financial
            decision-making and create meaningful progress. My approach is
            grounded in trust, transparency and strong relationships.
          </p>
          <p>
            You receive accurate accounting, strategic insight and a network
            designed to support your goals today while safeguarding your future.
          </p>
          <div>
            <p className="text-gray-400/60 text-xl font-medium">
              This is advice built on experience, connection
            </p>
            <p className="text-gray-400/60 text-xl font-medium">
              and genuine care for your success.
            </p>
          </div>
        </div>
        <div className=" col-span-6 pl-20">
          <Image
            src={"/ab_bg.png"}
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
      </div>

      <button className="mt-10 px-6 py-3 rounded-lg font-medium bg-gray-200/20 text-gray-200 border-2 border-gray-400/40">
        Learn More About Us
      </button>
    </section>
  );
}
