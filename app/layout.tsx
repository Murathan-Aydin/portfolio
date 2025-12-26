import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { StructuredData } from "@/components/seo/structured-data"
import { VercelAnalytics } from "@/components/vercel-analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Développeur Web Freelance à Mâcon | Création Site Internet Saône-et-Loire",
    description:
        "Développeur web freelance à Mâcon spécialisé dans la création de sites internet modernes et performants. Accompagnement personnalisé pour artisans, commerçants et PME en Saône-et-Loire. Devis gratuit.",
    keywords: [
        "développeur web Mâcon",
        "création site internet Mâcon",
        "freelance web Saône-et-Loire",
        "développeur web Bourgogne",
        "création site web Mâcon",
        "développeur freelance Mâcon",
        "site internet Mâcon",
    ],
    openGraph: {
        title: "Développeur Web Freelance à Mâcon | MA.DEV",
        description: "Création de sites web modernes et performants à Mâcon et en Saône-et-Loire. Devis gratuit.",
        locale: "fr_FR",
        type: "website",
    },
    generator: "Next.js",
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
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
                <StructuredData />
                <LayoutWrapper>{children}</LayoutWrapper>
                <VercelAnalytics />
            </body>
        </html>
    )
}
