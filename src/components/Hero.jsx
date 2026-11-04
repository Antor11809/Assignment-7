import { connection } from "next/server";
import React from "react";

const Hero = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="bg-amber-100 rounded-2xl flex flex-col lg:flex-row items-center justify-between mt-6 lg:mt-10 mx-4 sm:mx-10 lg:mx-25 gap-6 lg:gap-10 p-4 sm:p-6">

      <div className="w-full lg:w-2/3">
        <p className="inline-block text-purple-700 text-sm sm:text-md mb-3 p-1 rounded-2xl bg-green-200">
          {date}
        </p>

        <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl">
          আজকের বাজার দাম এক নজরে
        </h1>

        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম —
          বাজার ভিত্তিক বিস্তারিত গড়, সর্বনিম্ন-সর্বাধিক
          এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="inline-block mt-6 bg-purple-700 p-3 text-white rounded-2xl font-bold"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="w-full lg:w-1/3 flex justify-center">
        <img
          className="w-48 h-40 sm:w-64 sm:h-52 lg:w-80 lg:h-68 object-contain"
          src="/bazar-hero.png"
          alt="Bazar Hero"
        />
      </div>
    </section>
    
  );
};

export default Hero;