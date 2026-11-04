import Link from "next/link";

const ProductCard = ({ item }) => {
  return (
    <Link
      href={"/product/" + item.slug}
      className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl bg-gray-100 p-2 rounded-xl">
          {item.category === "dal"
            ? "🥣"
            : item.category === "tel"
            ? "🛢️"
            : item.image}
        </span>

        <div>
          <h3 className="font-bold">{item.nameBn}</h3>
          <p className="text-base text-gray-700">
            প্রতি{" "}
            {item.unit === "kg"
              ? "কেজি"
              : item.unit === "liter"
              ? "লিটার"
              : item.unit}
          </p>
        </div>
      </div>

      <p className="text-base text-purple-800 mt-4">
        আজকের দাম
      </p>

      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">
          {item.today.toLocaleString("bn-BD")} টাকা
        </h2>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            item.change.dir === "up"
              ? "text-red-600 bg-red-50"
              : item.change.dir === "down"
              ? "text-green-600 bg-green-50"
              : "text-gray-600 bg-gray-100"
          }`}
        >
          {item.change.dir === "up"
            ? "▲"
            : item.change.dir === "down"
            ? "▼"
            : "—"}{" "}
          {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;