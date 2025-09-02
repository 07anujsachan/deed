import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api/profile")) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    try {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }
}
