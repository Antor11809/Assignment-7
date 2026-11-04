import React from "react";
import ProductCard from "./ProductCard";

const ProductSection = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  const data = await res.json();

  const up = data
    .filter((item) => item.change.dir === "up")
    .slice(0, 6);

  const down = data
    .filter((item) => item.change.dir === "down")
    .slice(0, 6);

return (
  <section className="max-w-6xl mx-auto px-4 mt-10">

    <h2 className="text-lg font-black mb-4">
      <span className="text-red-600">▲</span> আজ দাম বেড়েছে
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {up.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>

    <h2 className="text-lg font-black mt-10 mb-4">
      <span className="text-green-600">▼</span> আজ দাম কমেছে
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {down.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>

  </section>
);
};
export default ProductSection;