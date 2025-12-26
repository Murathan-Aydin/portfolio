"use client"

import { useEffect, useState } from "react"

// Composant qui charge Vercel Analytics uniquement si on est sur Vercel
// Sur un VPS auto-hébergé, ce composant ne chargera rien
export function VercelAnalytics() {
    const [AnalyticsComponent, setAnalyticsComponent] = useState<React.ComponentType | null>(null)

    useEffect(() => {
        // Vérifier si on est sur Vercel
        // Sur un VPS, ces conditions seront false
        const isVercel = 
            (typeof process !== "undefined" && process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined) ||
            (typeof window !== "undefined" && 
             (window.location.hostname.includes("vercel.app") || 
              window.location.hostname.includes("vercel.com")))

        if (!isVercel) {
            // Ne pas charger Vercel Analytics si on n'est pas sur Vercel
            return
        }

        // Charger dynamiquement Vercel Analytics uniquement sur Vercel
        import("@vercel/analytics/react")
            .then((module) => {
                setAnalyticsComponent(() => module.Analytics)
            })
            .catch(() => {
                // Ignorer silencieusement si le module n'est pas disponible
            })
    }, [])

    if (!AnalyticsComponent) {
        return null
    }

    return <AnalyticsComponent />
}
