import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyCookieValue } from "@/lib/adminToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authed = token ? await verifyCookieValue(token) : false;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin/login" && authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
