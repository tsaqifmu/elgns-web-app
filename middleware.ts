import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const adminRoutes = [
  "/dashboard",
  "/customer",
  "/produksi",
  "/monitoring",
  "/timeline",
  "/admin",
];
const userRoutes = ["/monitoring"];
const publicRoutes = ["/login", "/"];

// Middleware function
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isAdminRoutes = adminRoutes.includes(path);
  const isUserRoutes = userRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Check if the token exists in the cookies
  const token = req.cookies.get("accessToken");
  if (!token) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return NextResponse.next();
  }

  const cookies = `accessToken=${token.value}`;

  // 4. Get user role
  const response = await fetch("https://elgns-api.vercel.app/auth/me", {
    headers: { Cookie: cookies },
  });
  const body = await response.json();
  const role = body.data?.role?.toLowerCase() ?? null;
  const isAdmin = role === "admin";
  const isUser = role !== "admin";

  // 5. Check role
  if (isUserRoutes && isUser) {
    return NextResponse.next();
  }

  if (isAdminRoutes && !isAdmin) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isPublicRoute && isUser) {
    return NextResponse.redirect(new URL("/monitoring", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
