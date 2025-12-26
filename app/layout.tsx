import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "MA.DEV | Développeur Web Freelance à Mâcon",
    description:
        "Création de sites web modernes, performants et sur mesure. Développeur web freelance basé à Mâcon, intervention en Saône-et-Loire.",
    generator: "v0.app",
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
                <LayoutWrapper>{children}</LayoutWrapper>
                <Analytics />
            </body>
        </html>
    )
}
