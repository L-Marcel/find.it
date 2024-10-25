import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const id = request.cookies.get("x-auth-id")?.value;
  const token = request.cookies.get("x-auth-token")?.value;

  if (id && token) {
    const auth = await fetch(`${process.env.API_URL}/users/${id}/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (auth.status === 401) {
      const response = NextResponse.redirect(
        new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url)
      );
      response.headers.delete("x-auth-id");
      response.headers.delete("x-auth-token");
      response.cookies.delete("x-auth-id");
      response.cookies.delete("x-auth-token");
      return response;
    }

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
