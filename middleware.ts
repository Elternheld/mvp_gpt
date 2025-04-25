import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  afterAuth(auth, req) {
    const { userId, sessionId, orgRole, user } = auth

    // no user signed in
    if (!userId || !user) {
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    const role = user.publicMetadata?.role

    // Redirect based on role if visiting root
    if (req.nextUrl.pathname === "/") {
      if (role === "admin") return NextResponse.redirect(new URL("/admin", req.url))
      if (role === "agent") return NextResponse.redirect(new URL("/agent", req.url))
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Restrict access by path
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    if (req.nextUrl.pathname.startsWith("/agent") && role !== "agent") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  }
})

export const config = {
  matcher: ["/((?!_next|.*\..*).*)"]
}