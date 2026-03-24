"use client"

import { useEffect } from "react"
import { animatePageIn } from "@/lib/animations"
import gsap from "gsap"

const HOLD_DURATION = 1.5

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const overlay = document.getElementById("transition-overlay")

        if (overlay && overlay.style.opacity !== "1") {
            // Premier chargement : l'overlay n'a pas été affiché par animatePageOut
            document.body.style.overflow = "hidden"
            gsap.set(overlay, { opacity: 1 })
            window.dispatchEvent(new Event("overlay-visible"))
            gsap.delayedCall(HOLD_DURATION, animatePageIn)
        } else {
            // Navigation entre pages : l'overlay est déjà visible (animatePageOut l'a montré)
            animatePageIn()
        }
    }, [])

    return (
        <div id="page-content" style={{ opacity: 0 }}>
            {children}
        </div>
    )
}
