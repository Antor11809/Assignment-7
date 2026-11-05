
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign Up Failed");
        console.log(error);
        return;
      }

      if (data) {
        toast.success("Sign Up Successful");
        console.log(data);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google Sign Up Failed");
      console.log(error);
    }
  };

  const handleGithubSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub Sign Up Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#f1f7f2] flex flex-col items-center pt-10 pb-12 px-4">

      <h2 className="text-2xl font-bold text-black">
        অ্যাকাউন্ট তৈরি করুন
      </h2>

      <p className="text-sm mt-2 mb-6 text-center text-gray-500">
        নিচে সঠিক তথ্য দিয়ে আপনার অ্যাকাউন্ট তৈরি করুন।
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-sm shadow-sm"
      >
        <fieldset className="fieldset">

          <label className="label text-base font-semibold text-black">
            নাম
          </label>
          <input
            name="name"
            type="text"
            className="input w-full bg-white"
            placeholder="যেমন: রহিম উদ্দিন"
            required
          />

          <label className="label text-base font-semibold text-black mt-3">
            ইমেইল
          </label>
          <input
            name="email"
            type="email"
            className="input w-full bg-white"
            placeholder="you@example.com"
            required
          />

          <label className="label text-base font-semibold text-black mt-3">
            পাসওয়ার্ড
          </label>
          <input
            name="password"
            type="password"
            className="input w-full bg-white"
            placeholder="কমপক্ষে ৮ অক্ষর"
            minLength={8}
            required
          />

          <label className="label text-base font-semibold text-black mt-3">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            name="confirmPassword"
            type="password"
            className="input w-full bg-white"
            placeholder="আবার লিখুন"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="btn w-full bg-green-700 hover:bg-green-800 text-white mt-5 border-none"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>

        </fieldset>

        <div className="divider text-sm text-gray-400 my-4">
          অথবা
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline border-gray-200 bg-white text-xs"
          >
            <span className="font-bold text-blue-500">G</span>
            Google দিয়ে সাইন আপ
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="btn btn-outline border-gray-200 bg-white text-xs"
          >
            <span className="font-bold text-black">◉</span>
            GitHub দিয়ে সাইন আপ
          </button>
        </div>

        <p className="text-center text-sm mt-5">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-green-700 font-semibold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
