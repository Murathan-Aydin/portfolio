"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const BLOB_CONFIG = [
    { color: "bg-primary/25",    size: "w-[40vw] h-[40vw]", baseDuration: 14, morphDuration: 9  },
    { color: "bg-cyan-500/20",   size: "w-[35vw] h-[35vw]", baseDuration: 18, morphDuration: 11 },
    { color: "bg-blue-600/20",   size: "w-[50vw] h-[50vw]", baseDuration: 22, morphDuration: 13 },
    { color: "bg-indigo-500/15", size: "w-[30vw] h-[30vw]", baseDuration: 16, morphDuration: 10 },
    { color: "bg-blue-400/20",   size: "w-[45vw] h-[45vw]", baseDuration: 20, morphDuration: 12 },
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
                    scale: () => gsap.utils.random(0.8, 1.2),
                    duration: () => gsap.utils.random(8, 14),
                    repeat: -1,
                    repeatRefresh: true,
                    ease: "sine.inOut",
                })

                // Morphing de forme : nouvelles valeurs à chaque cycle
                gsap.to(blob, {
                    borderRadius: () => {
                        const r = () => Math.round(gsap.utils.random(20, 80))
                        return `${r()}% ${100 - r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`
                    },
                    duration: config.morphDuration,
                    repeat: -1,
                    repeatRefresh: true,
                    ease: "sine.inOut",
                })

                // Rotation lente
                gsap.to(blob, {
                    rotation: i % 2 === 0 ? 360 : -360,
                    duration: config.baseDuration * 4,
                    repeat: -1,
                    ease: "none",
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
                    className={`absolute rounded-full blur-[80px] lg:blur-[120px] will-change-transform ${config.color} ${config.size}`}
                    style={{ borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%" }}
                />
            ))}
{/* 
            <div
                className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                style={{
                    backgroundImage: ``
                }}
            /> */}
        </div>
    )
}
