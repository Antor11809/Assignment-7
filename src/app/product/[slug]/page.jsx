
import Link from "next/link";
import { Suspense } from "react";

const bn = (num) => Number(num).toLocaleString("bn-BD");

const ProductDetails = async ({ params }) => {
  const { slug } = await params;

  // Find product ID from slug
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  if (!res.ok) throw new Error("Products fetch failed");

  const products = await res.json();
  const selected = products.find((p) => p.slug === slug);

  if (!selected) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">পণ্য পাওয়া যায়নি</h2>
        <Link href="/" className="text-green-700 underline">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Single product API
  const detailRes = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products/" + selected.id
  );
  if (!detailRes.ok) throw new Error("Product details fetch failed");

  const product = await detailRes.json();

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  const unit =
    product.unit === "kg" ? "কেজি" :
    product.unit === "liter" ? "লিটার" :
    product.unit === "dozen" ? "ডজন" :
    product.unit === "pcs" || product.unit === "piece" ? "পিস" :
    product.unit;

  const icon =
    product.category === "dal" ? "🥣" :
    product.category === "tel" ? "🛢️" :
    product.image;

  return (
    <section className="bg-[#f0f5f1] min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-5">
          <Link href="/" className="hover:text-green-700">হোম</Link>
          {" › "}
          <Link
            href={"/category/" + product.category}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          {" › "}
          {product.nameBn}
        </div>

        {/* Product Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-xl text-4xl">
              {icon}
            </div>

            <div>
              <h1 className="text-2xl font-black">
                {product.nameBn}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                বাজারভিত্তিক আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>

          <div className="bg-[#f0f5f1] rounded-xl p-4 sm:text-right">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <h2 className="text-2xl font-black">
              {bn(product.today)} টাকা
            </h2>

            <span className={`text-xs px-2 py-1 rounded-full ${
              product.change.dir === "up"
                ? "text-red-600 bg-red-50"
                : product.change.dir === "down"
                ? "text-green-600 bg-green-50"
                : "text-gray-600 bg-gray-100"
            }`}>
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
              {bn(Math.abs(product.change.pct))}%
            </span>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <h2 className="text-xl font-bold mb-4">
           দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <h3 className="text-2xl font-bold text-green-700 mt-2">
                {bn(minPrice)} টাকা
              </h3>
              <p className="text-xs text-gray-500 mt-1">সকল বাজারের মধ্যে</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
              <h3 className="text-2xl font-bold text-red-600 mt-2">
                {bn(maxPrice)} টাকা
              </h3>
              <p className="text-xs text-gray-500 mt-1">সকল বাজারের মধ্যে</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">গড় দাম</p>
              <h3 className="text-2xl font-bold text-purple-700 mt-2">
                {bn(avgPrice)} টাকা
              </h3>
              <p className="text-xs text-gray-500 mt-1">বাজারগুলোর গড় দাম</p>
            </div>

            
          </div>

          {/* Previous Prices */}
          <h2 className="font-bold mb-3">আগের দামের তথ্য</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
            {[
              ["গতকাল", product.yesterday],
              ["গত সপ্তাহ", product.lastWeek],
              ["গত মাস", product.lastMonth],
            ].map(([label, price]) => (
              <div
                key={label}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-bold">{bn(price)} টাকা</p>
              </div>
            ))}
          </div>

          {/* Market Price Table */}
          <h2 className="text-xl font-bold mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">বাজারের নাম</th>
                  <th className="p-3">বিভাগ</th>
                  <th className="p-3">সর্বনিম্ন</th>
                  <th className="p-3">সর্বাধিক</th>
                  <th className="p-3">গড়</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((m, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{m.market}</td>
                    <td className="p-3 text-gray-600">{m.division}</td>
                    <td className="p-3 text-green-700">
                      {bn(m.min)} টাকা
                    </td>
                    <td className="p-3 text-red-600">
                      {bn(m.max)} টাকা
                    </td>
                    <td className="p-3 font-semibold">
                      {bn(Math.round((m.min + m.max) / 2))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
};

export default function Page(props) {
  return (
    <Suspense
      fallback={<p className="text-center py-10">পণ্যের তথ্য লোড হচ্ছে...</p>}
    >
      <ProductDetails {...props} />
    </Suspense>
  );
}
