"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Générer un ID visiteur unique (stocké dans localStorage)
function getVisitorId(): string {
    if (typeof window === "undefined") return ""
    
    let visitorId = localStorage.getItem("visitorId")
    if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
        localStorage.setItem("visitorId", visitorId)
    }
    return visitorId
}

// Générer un ID de session (stocké dans sessionStorage)
function getSessionId(): string {
    if (typeof window === "undefined") return ""
    
    let sessionId = sessionStorage.getItem("sessionId")
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
        sessionStorage.setItem("sessionId", sessionId)
    }
    return sessionId
}

// Détecter le type d'appareil
function getDeviceType(): "desktop" | "mobile" | "tablet" {
    if (typeof window === "undefined") return "desktop"
    
    const ua = navigator.userAgent.toLowerCase()
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet"
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile"
    }
    return "desktop"
}

// Hook pour tracker les visites
export function useAnalytics() {
    const pathname = usePathname()
    const startTimeRef = useRef(0)
    const beforeUnloadHandlerRef = useRef<(() => void) | null>(null)

    useEffect(() => {
        // Ne pas tracker les routes admin
        if (pathname?.startsWith("/admin") || pathname?.startsWith("/api")) {
            return
        }

        startTimeRef.current = Date.now()

        // Attendre un peu pour s'assurer que la page est chargée
        const timeout = setTimeout(() => {
            const visitorId = getVisitorId()
            const sessionId = getSessionId()
            const userAgent = navigator.userAgent
            const referrer = document.referrer || null

            // Enregistrer la visite
            fetch("/api/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    path: pathname,
                    visitorId,
                    sessionId,
                    userAgent,
                    referrer,
                    device: getDeviceType(),
                }),
            }).catch((error) => {
                console.error("Error tracking analytics:", error)
            })

            // Enregistrer la durée de visite quand l'utilisateur quitte la page
            const handleBeforeUnload = () => {
                const duration = Math.floor((Date.now() - startTimeRef.current) / 1000) // en secondes
                navigator.sendBeacon(
                    "/api/analytics",
                    JSON.stringify({
                        path: pathname,
                        visitorId,
                        sessionId,
                        userAgent,
                        referrer,
                        device: getDeviceType(),
                        duration,
                    })
                )
            }

            window.addEventListener("beforeunload", handleBeforeUnload)
            beforeUnloadHandlerRef.current = handleBeforeUnload
        }, 1000)

        return () => {
            clearTimeout(timeout)
            if (beforeUnloadHandlerRef.current) {
                window.removeEventListener("beforeunload", beforeUnloadHandlerRef.current)
                beforeUnloadHandlerRef.current = null
            }
        }
    }, [pathname])
}
