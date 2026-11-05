
"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign In Successful");
      console.log(data);
      router.push("/");
      router.refresh();
    }

    if (error) {
      toast.error(error.message || "Sign In Failed");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (data) {
        console.log("Google Sign In Data:", data);
      }

      if (error) {
        toast.error(error.message || "Google Sign In Failed");
        console.log(error);
      }
    } catch (error) {
      console.log("Google Error:", error);
      toast.error("Google Sign In Failed");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (data) {
        console.log("GitHub Sign In Data:", data);
      }

      if (error) {
        toast.error(error.message || "GitHub Sign In Failed");
        console.log(error);
      }
    } catch (error) {
      console.log("GitHub Error:", error);
      toast.error("GitHub Sign In Failed");
    }
  };

  return (
    <div className="min-h-[75vh] bg-[#f1f7f2] flex flex-col items-center pt-10 pb-16 px-4">

      <h2 className="text-2xl font-bold text-black">
        সাইন ইন
      </h2>

      <p className="text-sm mt-2 mb-6 text-center text-gray-500">
        নিরাপদে লগইন করুন, বাজারদর দেখুন ও প্রয়োজনীয় সেবা উপভোগ করুন।
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-sm shadow-sm"
      >
        <fieldset className="fieldset">

          <label className="label text-base font-semibold text-black">
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
            required
          />

          <button
            type="submit"
            className="btn w-full bg-green-700 hover:bg-green-800 text-white mt-5 border-none"
          >
            সাইন ইন
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
            Google দিয়ে সাইন ইন
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="btn btn-outline border-gray-200 bg-white text-xs"
          >
            <span className="font-bold text-black">◉</span>
            GitHub দিয়ে সাইন ইন
          </button>
        </div>

        <p className="text-center text-sm mt-5">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
