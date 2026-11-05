
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] bg-[#f1f7f2] flex items-center justify-center px-4 py-12">

      <div className="max-w-lg w-full text-center">

        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-[80px] md:text-[170px] font-extrabold text-green-700 leading-none tracking-tight">
            404
          </h1>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
            Oops! Page Not Found
          </div>
        </div>

        {/* Icon */}
        <div className="text-6xl mt-12 mb-5">
          🛒
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base leading-7 mb-8">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          অথবা লিংকটি সঠিক নয়।
          চিন্তা নেই! বাজার দর-এর হোমপেজে ফিরে যান।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <span>←</span>
          হোমপেজে ফিরে যান
        </Link>

        {/* Bottom Text */}
        <p className="text-sm text-gray-500 mt-8">
          বাজার দর — আপনার নিত্যদিনের বাজার সঙ্গী 🌿
        </p>

      </div>
    </div>
  );
};

export default NotFound;
