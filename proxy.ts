import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Permettre l'accès à la page de login
                if (req.nextUrl.pathname === "/admin/login") {
                    return true
                }
                // Exiger un token pour toutes les autres routes admin
                return !!token
            },
        },
        pages: {
            signIn: "/admin/login",
        },
    }
)

// Configuration des matchers pour protéger uniquement les routes admin
export const config = {
    matcher: [
        // Match all request paths except for:
        // - _next (Next.js internals)
        // - files in public (images, favicon, robots, sitemap, etc.)
        "/((?!_next|images|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
}