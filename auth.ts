import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                // Vérification des credentials
                // TODO: Remplacer par une vraie vérification en base de données
                if (
                    credentials.email === process.env.USER_ADMIN &&
                    credentials.password === process.env.PASS_ADMIN
                ) {
                    return {
                        id: "1",
                        email: credentials.email,
                        name: "Admin MA.DEV",
                    }
                }

                return null
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name as string
            }
            return session
        },
        async signIn() {
            return true
        },
        async redirect({ url, baseUrl }) {
            // Permet les redirections vers des URLs relatives ou absolues du même domaine
            // Supporte plusieurs domaines en utilisant l'URL de base de la requête
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }
            // Si l'URL est sur le même domaine (ou un domaine autorisé), l'accepter
            try {
                const urlObj = new URL(url)
                const baseUrlObj = new URL(baseUrl)
                // Accepter si c'est le même domaine ou un sous-domaine
                if (urlObj.origin === baseUrlObj.origin ||
                    urlObj.hostname.endsWith(baseUrlObj.hostname)) {
                    return url
                }
            } catch {
                // Si l'URL n'est pas valide, retourner baseUrl
            }
            return baseUrl
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // Configuration pour supporter plusieurs domaines
    // Les cookies seront définis sans domaine spécifique pour fonctionner sur chaque domaine
    useSecureCookies: process.env.NODE_ENV === "production",
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === "production"
                ? "__Secure-next-auth.session-token"
                : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                // Pas de domaine spécifique = cookie valide uniquement sur le domaine actuel
                // Chaque domaine aura sa propre session
            },
        },
    },
}

