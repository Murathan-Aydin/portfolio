import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { StructuredData } from "@/components/seo/structured-data"
import { VercelAnalytics } from "@/components/vercel-analytics"
import { AnalyticsProvider } from "@/components/analytics-provider"


export const metadata: Metadata = {
    title: "Murathan Aydin | Développeur Fullstack",
    description:
        "Portfolio de Murathan Aydin, développeur Fullstack en alternance chez OID Consultants et étudiant à Epitech. Découvrez mes projets et mon parcours.",
    keywords: [
        "développeur fullstack",
        "portfolio développeur",
        "alternant développeur",
        "Epitech",
        "développeur web",
        "React",
        "Next.js",
    ],
    openGraph: {
        title: "Murathan Aydin | Développeur Fullstack",
        description: "Portfolio de Murathan Aydin, développeur Fullstack.",
        locale: "fr_FR",
        type: "website",
    },
    generator: "Next.js",
    manifest: "/manifest.json",
    icons: {
        icon: [
            {
                url: "/icon1.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: [
            {
                url: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <body className={`font-sans antialiased`}>
                <AnalyticsProvider
                    clientId="ma-dev"
                    apiUrl="https://api.m-aydin.fr"
                    excludePaths={["/admin", "/api"]}
                />
                <StructuredData />
                <LayoutWrapper>{children}</LayoutWrapper>
                <VercelAnalytics />
            </body>
        </html>
    )
}
