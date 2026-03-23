"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const BLOB_CONFIG = [
    { glow: "rgba(59, 130, 246, 0.15)",   size: "w-[35vw] h-[35vw]", baseDuration: 14 },
    { glow: "rgba(6, 182, 212, 0.15)",    size: "w-[25vw] h-[25vw]", baseDuration: 18 },
    { glow: "rgba(37, 99, 235, 0.15)",    size: "w-[45vw] h-[45vw]", baseDuration: 22 },
    { glow: "rgba(99, 102, 241, 0.15)",   size: "w-[20vw] h-[20vw]", baseDuration: 16 },
    { glow: "rgba(96, 165, 250, 0.15)",   size: "w-[30vw] h-[30vw]", baseDuration: 20 },
]

export default function DynamicBlobEngine() {
    const containerRef = useRef<HTMLDivElement>(null)
    const blobRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {

        const ctx = gsap.context(() => {
            blobRefs.current.forEach((blob, i) => {
                if (!blob) return

                const config = BLOB_CONFIG[i]

                // Positionnement initial aléatoire
                gsap.set(blob, {
                    x: gsap.utils.random(0, 70) + "vw",
                    y: gsap.utils.random(0, 60) + "vh",
                    scale: gsap.utils.random(0.85, 1.05),
                })

                // Errance continue : à chaque cycle, une nouvelle position aléatoire
                gsap.to(blob, {
                    x: () => gsap.utils.random(-10, 80) + "vw",
                    y: () => gsap.utils.random(-10, 70) + "vh",
                    duration: () => gsap.utils.random(config.baseDuration * 0.8, config.baseDuration * 1.2),
                    repeat: -1,
                    repeatRefresh: true,
                    ease: "sine.inOut",
                })

                // Respiration de scale
                gsap.to(blob, {
                    scale: () => gsap.utils.random(0.9, 1.1),
                    duration: () => gsap.utils.random(8, 14),
                    repeat: -1,
                    repeatRefresh: true,
                    ease: "sine.inOut",
                })

                // Parallaxe subtile au scroll
                gsap.to(blob, {
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                    },
                    yPercent: (i % 2 === 0 ? 50 : -50),
                    ease: "none",
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
            {BLOB_CONFIG.map((config, i) => (
                <div
                    key={i}
                    ref={(el) => { blobRefs.current[i] = el }}
                    className={`absolute rounded-full will-change-transform bg-background ${config.size}`}
                    style={{ 
                        boxShadow: `
                            30px 30px 60px rgba(0, 0, 0, 0.4), 
                            -10px -10px 40px rgba(255, 255, 255, 0.03),
                            inset 0 0 60px ${config.glow}
                        `
                    }}
                />
            ))}
        </div>
    )
}
