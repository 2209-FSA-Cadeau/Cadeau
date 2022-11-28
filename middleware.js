import { NextResponse } from "next/server";

export default function middleware(req) {
  const res = NextResponse.next();
  console.log(`${req.method} ${res.status} ${req.nextUrl.pathname}`);
  return res;
}
