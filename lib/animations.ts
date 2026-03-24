import gsap from "gsap"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const animatePageIn = () => {
    const content = document.getElementById("page-content")
    const overlay = document.getElementById("transition-overlay")

    const tl = gsap.timeline({ onComplete: () => { document.body.style.overflow = "" } })

    if (overlay) {
        tl.to(overlay, { opacity: 0, duration: 0.4, ease: "power3.out" })
    }

    if (content) {
        tl.fromTo(
            content,
            { opacity: 0, filter: "blur(12px)" },
            { opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out", clearProps: "filter" }
        )
    }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const content = document.getElementById("page-content")
    const overlay = document.getElementById("transition-overlay")

    const HOLD_DURATION = 1.5

    document.body.style.overflow = "hidden"

    const tl = gsap.timeline({ onComplete: () => router.push(href) })

    if (content) {
        tl.to(content, { opacity: 0, filter: "blur(12px)", duration: 0.35, ease: "power3.in" }, 0)
    }

    if (overlay) {
        tl.to(overlay, { opacity: 1, duration: 0.35, ease: "power3.in" }, 0)
    }

    // dispatch quand l'overlay est pleinement visible → repart l'anim SVG depuis le début
    tl.call(() => window.dispatchEvent(new Event("overlay-visible")))

    // durée fixe indépendante de la connexion
    tl.to({}, { duration: HOLD_DURATION })

    if (!content && !overlay) {
        router.push(href)
    }
}
