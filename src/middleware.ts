import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/in"];
const authPages = ["/sign-in"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const url = req.nextUrl.clone(); // Clone the URL to avoid mutating the original request URL
  const { pathname } = url;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/in", req.url));
  }

  return NextResponse.next();
}
