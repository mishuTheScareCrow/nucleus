import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { url } = request;
  try {
    const session = await betterFetch<any>("/api/auth/get-session", {
      baseURL: request.nextUrl.origin,
      headers: {
        // get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!session.data && request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } catch (e) {
    // If error checking session, assume safe to proceed or redirect to auth if critical
    // For now we let it pass or redirect if we want strict
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
       return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
