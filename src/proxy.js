
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log(session);

  if (!session) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
   matcher: [
    "/profile/:path*",
     "/product/:path*",
    "/category/:path*",
  ],
};
