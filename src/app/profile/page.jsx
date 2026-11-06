
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await authClient.updateUser({
      name,
    });

    if (error) {
      toast.error(error.message || "Update Failed");
      return;
    }

    toast.success("Profile Updated Successfully");
    setName("");
    router.refresh();
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Sign Out Failed");
      return;
    }

    toast.success("Signed Out Successfully");
    router.push("/signin");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="min-h-[75vh] bg-[#f1f7f2] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[75vh] bg-[#f1f7f2] flex flex-col items-center justify-center gap-4">
        <p>প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।</p>
        <button
          onClick={() => router.push("/signin")}
          className="btn bg-green-700 text-white"
        >
          সাইন ইন করুন
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] bg-[#f1f7f2] px-4 py-14">
      <div className="max-w-xl mx-auto">

        <h2 className="text-2xl font-bold text-black">
          আমার প্রোফাইল
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-5">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-3">

          <div className="flex items-center gap-4 min-w-0">
            <div className="avatar">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-700 text-xl font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-black truncate text-lg">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-outline btn-error btn-sm shrink-0"
          >
            → সাইন আউট
          </button>

        </div>

        {/* Update Form */}
        <form
          onSubmit={handleUpdate}
          className="bg-white border border-gray-200 rounded-2xl p-6 mt-5"
        >
          <h3 className="font-semibold text-black mb-5">
            তথ্য
          </h3>

          <label className="label text-base font-semibold text-black">
            নাম
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={user.name || "আপনার নাম লিখুন"}
            className="input w-full bg-white"
            required
          />

          <button
            type="submit"
            className="btn w-full bg-green-700 hover:bg-green-800 text-white border-none mt-4"
          >
            আপডেট
          </button>
        </form>

      </div>
    </div>
  );
};

export default Page;
