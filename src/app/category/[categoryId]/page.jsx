
import Link from "next/link";
import { Suspense } from "react";

const categories = {
  chal: ["🍚", "চাল"],
  dal: ["🥣", "ডাল"],
  tel: ["🛢️", "তেল"],
  sobji: ["🥬", "সবজি"],
  mach: ["🐟", "মাছ"],
  mangsho: ["🍗", "মাংস"],
  "dim-dui": ["🥛", "ডিম-দুধ"],
  mosla: ["🌶️", "মসলা"],
};

const Categorynews = async ({ params, searchParams }) => {
  const { categoryId } = await params;
  const { sort = "default" } = await searchParams;

  const category = categories[categoryId];

  if (!category) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">ক্যাটাগরি পাওয়া যায়নি</h1>
        <Link href="/" className="text-green-600 underline">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
  );

  if (!res.ok) {
    return <p className="text-center p-10">ডাটা লোড করা যায়নি</p>;
  }

  const data = await res.json();

  if (sort === "low") {
    data.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    data.sort((a, b) => b.today - a.today);
  }

  return (
    <section className="bg-[#f0f5f1] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Category Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 mb-5">
          <div className="bg-gray-100 rounded-xl p-3 text-3xl">
            {category[0]}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{category[1]}</h1>
            <p className="text-sm text-gray-500">
              {data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sorting */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-end gap-3">
          <span className="text-gray-500">সাজান</span>

          <details className="relative">
            <summary className="cursor-pointer border border-gray-200 rounded-lg px-4 py-2 text-sm">
              {sort === "low"
                ? "দাম: কম থেকে বেশি"
                : sort === "high"
                ? "দাম: বেশি থেকে কম"
                : "ডিফল্ট"} ⌄
            </summary>

            <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border rounded-lg w-44 z-10 overflow-hidden">
              <Link
                href="?sort=default"
                className="block p-3 hover:bg-gray-100 text-sm"
              >
                ডিফল্ট
              </Link>

              <Link
                href="?sort=low"
                className="block p-3 hover:bg-gray-100 text-sm"
              >
                দাম: কম থেকে বেশি
              </Link>

              <Link
                href="?sort=high"
                className="block p-3 hover:bg-gray-100 text-sm"
              >
                দাম: বেশি থেকে কম
              </Link>
            </div>
          </details>
        </div>

        {/* Product Cards */}
        {data.length === 0 ? (
          <div className="text-center bg-white rounded-xl p-10">
            <p>কোনো পণ্য পাওয়া যায়নি।</p>
            <Link href="/" className="text-green-600 underline">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((p) => (
              <Link
                href={"/product/" + p.slug}
                key={p.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-xl p-2 text-3xl">
                    {p.category === "dal"
                      ? "🥣"
                      : p.category === "tel"
                      ? "🛢️"
                      : p.image}
                  </div>

                  <div>
                    <h3 className="font-bold">{p.nameBn}</h3>
                    <p className="text-sm text-gray-500">
                      প্রতি{" "}
                      {p.unit === "kg"
                        ? "কেজি"
                        : p.unit === "liter"
                        ? "লিটার"
                        : p.unit === "dozen"
                        ? "ডজন"
                        : p.unit === "pcs" || p.unit === "piece"
                        ? "পিস"
                        : p.unit}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-5">
                  আজকের দাম
                </p>

                <div className="flex items-end justify-between gap-2">
                  <h2 className="text-xl font-bold">
                    {p.today.toLocaleString("bn-BD")} টাকা
                  </h2>

                  <span
                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                      p.change.dir === "up"
                        ? "bg-red-50 text-red-600"
                        : p.change.dir === "down"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.change.dir === "up"
                      ? "▲"
                      : p.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                    {Math.abs(p.change.pct).toLocaleString("bn-BD")}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default function Page(props) {
  return (
    <Suspense fallback={<p className="text-center p-10">লোড হচ্ছে...</p>}>
      <Categorynews {...props} />
    </Suspense>
  );
}
