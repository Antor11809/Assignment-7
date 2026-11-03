import Link from "next/link";

const NavLinks = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
  const data = await res.json();

  return (
    <div className="flex gap-4 sm:gap-6 lg:gap-10 mt-6 px-4 lg:ml-39 overflow-x-auto whitespace-nowrap">
      {data.map((i) => (
        <Link
          key={i.id}
          href={"/category/" + i.slug}
          className="shrink-0 text-sm sm:text-base hover:text-green-700"
        >
          {i.id === "dal" ? "🥣" : i.icon} {i.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;