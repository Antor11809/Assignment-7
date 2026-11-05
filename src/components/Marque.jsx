
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";

const Marque = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();

  return (
    <div className="w-full border border-gray-200 mt-3 sm:mt-5 overflow-hidden">
      <MarqueeText direction="right" duration={10}>
        <div className="flex items-center gap-2 py-3">
          {data.map((mark) => (
            <Link
              key={mark.id}
              href={"/product/" + mark.slug}
              className="inline-flex shrink-0 items-center gap-2 sm:gap-4 mx-2 sm:mx-4 whitespace-nowrap"
            >
              <span>{mark.category === "dal" ? "🥣" : mark.categoryIcon}</span>
              <span className="text-sm sm:text-base">{mark.nameBn}</span>
              <span className="text-xs text-cyan-800">
                {mark.today} টাকা/কেজি
              </span>
            </Link>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marque;
