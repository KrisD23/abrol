import Image from "next/image";
import React from "react";

const WhatMakesUsDifferent = () => {
  return (
    <section className=" px-28 pt-28 pb-20">
      <div className="flex flex-col  gap-6">
        <h1 className="text-6xl font-semibold ">What Makes Us Different</h1>
        <p className="text-xl text-gray-300">
          More than accounting. A network designed to grow your business.
        </p>
        <p className=" text-gray-300 max-w-2xl">
          We support business owners who want more than compliance. You gain
          clarity, confidence and the right connections to move forward with
          purpose.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-12 mt-20">
        <div className=" col-span-6 flex flex-col gap-12">
          <div className="border-l-2 px-4 py-1 border-white">
            <h1 className="text-xl font-semibold">Trusted Advice</h1>
            <p className=" text-gray-300">
              Expert guidance that brings structure, transparency and confidence
              to every financial decision.
            </p>
          </div>
          <div className="border-l-2 px-4 py-1 border-white">
            <h1 className="text-xl font-semibold">Connected Expertise</h1>
            <p className=" text-gray-300">
              We bring the right people into the room so your business can move
              faster with fewer obstacles.
            </p>
          </div>
          <div className="border-l-2 px-4 py-1 border-white">
            <h1 className="text-xl font-semibold">Long Term Focus</h1>
            <p className=" text-gray-300">
              Strategies that support sustainable growth, protect wealth and
              strengthen your future legacy.
            </p>
          </div>
        </div>
        <div className="col-span-6 flex justify-end">
          <Image
            src={"/WhatMakesUsDifferent.jpg"}
            width={500}
            height={330}
            alt="What Makes Us w-full h-300 Different"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;
