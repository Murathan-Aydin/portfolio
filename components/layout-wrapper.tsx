"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAnalytics } from "@/hooks/useAnalytics"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith("/admin")

    // Track analytics (le hook gère lui-même l'exclusion des routes admin)
    useAnalytics()

    // Global ScrollTrigger refresh after hydration — fixes sections staying
    // invisible when the browser restores scroll position on refresh
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh()
        }, 200)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            {!isAdminRoute && <Navbar />}
            <main className="flex-1 bg-transparent">
                {children}
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    )
}

