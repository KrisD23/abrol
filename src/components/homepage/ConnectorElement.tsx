"use client";

import { motion } from "framer-motion";

export default function ConnectorElement() {
  return (
    <section className="px-28 pt-28 pb-20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] [background-size:30px_30px]" />
      <h1 className="text-6xl font-semibold ">The Connector Element</h1>

      <div className="grid grid-cols-12 gap-12 mt-20">
        <div className=" col-span-6 text-xl ">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">
              Connections that create opportunity.
            </h2>
            <h2>Business growth is rarely achieved alone.</h2>
          </div>

          <div className="mt-20 flex flex-col gap-2 font-bold ">
            <p className="text-gray-400/60">Your network, strengthened.</p>
            <p className="text-gray-400/60">Your business, elevated.</p>
          </div>
        </div>
        <div className=" col-span-6 pl-20 border-l-2 border-white flex flex-col gap-12 text-xl">
          <p>
            With years of trusted relationships across multiple industries, We
            help you access the expertise you need at the right time.
          </p>
          <p>
            From legal specialists and financial planners to brokers and
            operational partners, you gain a trusted network selected to support
            your success.
          </p>
        </div>
      </div>

      <div className="flex gap-9 mt-20 font-medium">
        <p className="px-4 py-3 bg-gray-200/20 text-sm rounded-full text-gray-200 border-2 border-gray-400/40">
          Legal
        </p>
        <p className="px-4 py-3 bg-gray-200/20 text-sm rounded-full text-gray-200 border-2 border-gray-400/40">
          Finance
        </p>
        <p className="px-4 py-3 bg-gray-200/20 text-sm rounded-full text-gray-200 border-2 border-gray-400/40">
          Operations
        </p>
        <p className="px-4 py-3 bg-gray-200/20 text-sm rounded-full text-gray-200 border-2 border-gray-400/40">
          Wealth Management
        </p>
        <p className="px-4 py-3 bg-gray-200/20 text-sm rounded-full text-gray-200 border-2 border-gray-400/40">
          Strategy
        </p>
      </div>
    </section>
  );
}
