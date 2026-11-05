'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";


const UserInfo = () => {
    const {data: session} = authClient.useSession()
    const user = session?.user

    const handleSignout = async() => {
        await authClient.signOut();
    }
    return (
        <div>

{
    user? 
    <div className="flex flex-col items-center gap-2">

<Link href={'/profile'}>
<div className="avatar">
  <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
    <img alt="Tailwind-CSS-Avatar-component" src="{user?.image}" />
  </div>
</div>
</Link>


<h2>{user?.name}</h2>
<button onClick={handleSignout} className="btn btn-error btn-xs">Sign out</button>

    </div> :      <div className="flex items-center gap-2 sm:gap-4">
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
}
        </div>
    );
};

export default UserInfo;