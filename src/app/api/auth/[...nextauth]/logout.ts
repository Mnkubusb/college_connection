import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/auth/login", process.env.NEXTAUTH_URL));

  // Clear NextAuth session cookie
  response.headers.set(
    "Set-Cookie",
    `next-auth.session-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
  );

  return response;
}
