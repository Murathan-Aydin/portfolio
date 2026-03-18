import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(_req) {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const pathname = req.nextUrl.pathname

                // Autoriser l'accès aux fichiers statiques et aux routes publiques
                if (
                    pathname.startsWith("/_next") ||
                    pathname.startsWith("/images") ||
                    pathname === "/favicon.ico" ||
                    pathname === "/robots.txt" ||
                    pathname === "/sitemap.xml" ||
                    pathname.startsWith("/api") ||
                    !pathname.startsWith("/admin")
                ) {
                    return true
                }

                // Permettre l'accès à la page de login
                if (pathname === "/admin/login") {
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