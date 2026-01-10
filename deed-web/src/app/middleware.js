import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  console.log(req);
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ verify token
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    // Invalid or expired token
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/mentor/:path*", "/mentorform"],
};
