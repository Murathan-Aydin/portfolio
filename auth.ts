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
                    credentials.email === "REDACTED_ADMIN_EMAIL" &&
                    credentials.password === "REDACTED_ADMIN_PASSWORD"
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
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // Permet à NextAuth de détecter automatiquement l'URL depuis les headers
    // Nécessaire pour supporter plusieurs domaines
    trustHost: true,
    // Configuration des cookies pour la production
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
                // Laisse NextAuth gérer automatiquement le domaine
                domain: undefined,
            },
        },
    },
}

