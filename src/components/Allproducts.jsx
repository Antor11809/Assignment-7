import Link from "next/link";

const Allproducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  const data = await res.json();

  return (
    <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 mt-10 mb-10">

      <div>
        <p className="text-2xl font-black mb-2 mt-6">
          সব পণ্য
        </p>
        <p className="text-gray-700 mb-10">
          মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হয়েছে
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((p) => (
          <Link
            href={"/product/" + p.slug}
            key={p.id}
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-xl text-3xl shrink-0">
                {p.category === "dal" || p.nameBn.includes("ছোলা")
                  ? "🥣"
                  : p.category === "tel"
                  ? "🛢️"
                  : p.image}
              </div>

              <div>
                <span className="font-bold">{p.nameBn}</span>

                <p className="text-gray-700 text-sm">
                  প্রতি{" "}
                  {p.unit === "kg"
                    ? "কেজি"
                    : p.unit === "liter"
                    ? "লিটার"
                    : p.unit === "dozen"
                    ? "ডজন"
                    : p.unit === "pcs"
                    ? "পিস"
                    : p.unit === "piece"
                    ? "পিস"
                    : p.unit}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end gap-3 mt-5">
              <div>
                <p className="text-base text-purple-800">
                  আজকের দাম
                </p>

                <p className="font-extrabold text-xl">
                  {p.today.toLocaleString("bn-BD")}{" "}
                  <span className="font-medium text-base">
                    টাকা
                  </span>
                </p>
              </div>

              <div>
                <span
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    p.change.dir === "up"
                      ? "text-red-600 bg-red-50"
                      : p.change.dir === "down"
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 bg-gray-100"
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
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
};

export default Allproducts;