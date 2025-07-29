import { NextResponse, NextRequest } from "next/server";

// Các path yêu cầu đăng nhập
const privatePaths = ["/manage"];
// Các path không cho phép đã đăng nhập truy cập (ví dụ: trang login)
const unAuthPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  // Kiểm tra nếu truy cập vào private path mà chưa đăng nhập
  const isPrivate = privatePaths.some((path) => pathname.startsWith(path));
  if (isPrivate && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kiểm tra nếu đã đăng nhập mà truy cập vào trang không dành cho user đã login (ví dụ: /login)
  const isUnAuth = unAuthPaths.some((path) => pathname.startsWith(path));
  if (isUnAuth && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Cho phép truy cập bình thường
  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*", "/login"],
};
