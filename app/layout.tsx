import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { StructuredData } from "@/components/seo/structured-data"
import { VercelAnalytics } from "@/components/vercel-analytics"
import { AnalyticsProvider } from "@/components/analytics-provider"
import BgAnimate from "@/components/bg-animate"

export const metadata: Metadata = {
    title: {
        default: "MA.DEV — Développeur Full-Stack Freelance à Mâcon",
        template: "%s | MA.DEV",
    },
    description:
        "Développeur web freelance à Mâcon. React, Next.js, Node.js. Sites sur mesure, applications web, SEO technique. Devis gratuit sous 48h.",
    keywords: [
        "développeur web freelance Mâcon",
        "développeur Full-Stack",
        "développeur web Saône-et-Loire",
        "création site internet Mâcon",
        "React",
        "Next.js",
        "Node.js",
    ],
    openGraph: {
        title: "MA.DEV — Développeur Full-Stack Freelance à Mâcon",
        description:
            "Développeur web freelance à Mâcon. React, Next.js, Node.js. Sites sur mesure, applications web, SEO. Devis gratuit sous 48h.",
        locale: "fr_FR",
        type: "website",
        url: "https://ma-dev.fr",
        siteName: "MA.DEV",
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
                <BgAnimate />
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
