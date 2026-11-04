import NavLinks from "./NavLinks";
import { connection } from "next/server";


const Header = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header>
      <div className="flex items-center ml-4 sm:ml-10 lg:ml-30 gap-2 mt-2 px-2">
        <div className="bg-green-700 p-2 rounded-xl">
          🛒
        </div>

        <div>
          <div className="font-bold text-xl sm:text-2xl">
            বাজার দর
          </div>
          <div className="text-xs sm:text-sm">
            {date}
          </div>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;