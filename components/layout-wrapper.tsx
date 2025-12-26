"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith("/admin")

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {!isAdminRoute && <Navbar />}
            <main className="flex-1 bg-white">
                {children}
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    )
}

