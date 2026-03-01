import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Ensure the app can be embedded in Whop's iframe.
 * Sets CSP frame-ancestors and removes X-Frame-Options if present.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow embedding from any origin (Whop and company subdomains)
  response.headers.set("Content-Security-Policy", "frame-ancestors *;");
  // Remove X-Frame-Options so it doesn't override CSP (some proxies add DENY)
  response.headers.delete("X-Frame-Options");

  return response;
}

export const config = {
  matcher: "/:path*",
};
