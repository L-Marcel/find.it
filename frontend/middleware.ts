import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const id = request.cookies.get("x-auth-id")?.value;
  const token = request.cookies.get("x-auth-token")?.value;

  if (id && token) {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")
    ) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.headers.set("x-auth-id", id);
      response.headers.set("x-auth-token", token);
      return response;
    }

    const response = NextResponse.next();
    response.headers.set("x-auth-id", id);
    response.headers.set("x-auth-token", token);
    return response;
  }

  const response = NextResponse.next();
  response.headers.delete("x-auth-id");
  response.headers.delete("x-auth-token");
  return response;
}

export const config = {
  matcher: ["/users/:id*", "/items/:id*", "/", "/login", "/register"],
};
