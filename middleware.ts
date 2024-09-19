import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/dashboard",
  "/customer",
  "/produksi",
  "/monitoring",
  "/timeline",
  "/admin",
];
const publicRoutes = ["/login", "/"];

// Middleware function
export default function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or publi
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Check if the token exists in the cookies
  const token = req.cookies.get("accessToken");

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated and tries to access public routes
  if (
    isPublicRoute &&
    token &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // 6. Continue the request if the route is allowed
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

