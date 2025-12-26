"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith("/admin")

    return (
        <>
            {!isAdminRoute && <Navbar />}
            <main className="min-h-screen bg-white">
                {children}
            </main>
            {!isAdminRoute && <Footer />}
        </>
    )
}

