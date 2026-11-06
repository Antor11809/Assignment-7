
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <Link href="/profile">
          <div className="flex flex-row items-center gap-2">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                <img
                  alt="User Avatar"
                  src={user?.image || "/default-avatar.png"}
                />
              </div>
            </div>

            <h2 className="font-medium text-gray-600">{user?.name}</h2>
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/signin"
            className="text-sm sm:text-base font-semibold"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
