"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function LogoIntro({
    className = "",
    style = {},
}: {
    className?: string
    style?: React.CSSProperties
}) {
    const rootRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<SVGCircleElement>(null)
    const leftRef = useRef<SVGPathElement>(null)
    const slashRef = useRef<SVGPathElement>(null)
    const rightRef = useRef<SVGPathElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const circle = circleRef.current
        const left = leftRef.current
        const slash = slashRef.current
        const right = rightRef.current
        const title = titleRef.current
        const subtitle = subtitleRef.current
        const glow = glowRef.current

        if (!circle || !left || !slash || !right || !title || !subtitle || !glow) return

        const iconPaths = [left, slash, right]

        const setDraw = (el: SVGGeometryElement) => {
            const length = el.getTotalLength()
            gsap.set(el, {
                strokeDasharray: length,
                strokeDashoffset: length,
            })
        }

        setDraw(circle)
        iconPaths.forEach(setDraw)

        gsap.set(title, {
            opacity: 0,
            y: 24,
            scale: 0.98,
            filter: "blur(10px)",
        })

        gsap.set(subtitle, {
            opacity: 0,
            y: 16,
            filter: "blur(8px)",
        })

        gsap.set(glow, {
            opacity: 0,
            scale: 0.85,
        })

        const tl = gsap.timeline()

        tl.to(glow, {
            opacity: 0.45,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
        })

        tl.to(
            circle,
            {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: "power2.inOut",
            },
            0
        )

        tl.to(
            left,
            {
                strokeDashoffset: 0,
                duration: 0.35,
                ease: "power2.out",
            },
            0.45
        )

        tl.to(
            slash,
            {
                strokeDashoffset: 0,
                duration: 0.35,
                ease: "power2.out",
            },
            0.6
        )

        tl.to(
            right,
            {
                strokeDashoffset: 0,
                duration: 0.35,
                ease: "power2.out",
            },
            0.75
        )

        tl.to(
            title,
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.7,
                ease: "power3.out",
            },
            1.05
        )

        tl.to(
            subtitle,
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.55,
                ease: "power2.out",
            },
            1.3
        )

        const handleOverlayVisible = () => tl.restart()
        window.addEventListener("overlay-visible", handleOverlayVisible)

        return () => {
            tl.kill()
            window.removeEventListener("overlay-visible", handleOverlayVisible)
        }
    }, [])

    return (
        <div
            ref={rootRef}
            className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent px-6 ${className}`}
            style={style}
        >
            {/* glow */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute h-80 w-[320px] rounded-full blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(138,217,255,0.12) 40%, rgba(0,0,0,0) 72%)",
                }}
            />

            {/* icône */}
            <div className="relative z-10 mb-10">
                <svg
                    width="220"
                    height="220"
                    viewBox="0 0 220 220"
                    fill="none"
                    className="overflow-visible"
                >
                    <defs>
                        <linearGradient id="logoGradient" x1="30" y1="30" x2="190" y2="190" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8ad9ff" />
                        </linearGradient>
                    </defs>

                    <circle
                        ref={circleRef}
                        cx="110"
                        cy="110"
                        r="68"
                        stroke="url(#logoGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    <path
                        ref={leftRef}
                        d="M88 92 L68 110 L88 128"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        ref={slashRef}
                        d="M110 78 L98 132"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    <path
                        ref={rightRef}
                        d="M132 92 L152 110 L132 128"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* texte */}
            <div className="relative z-10 text-center">
                <h1
                    ref={titleRef}
                    className="text-7xl font-bold tracking-tight md:text-8xl"
                    style={{
                        background: "linear-gradient(135deg, #8ad9ff 0%, #3b82f6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Ma-Dev
                </h1>

                <p
                    ref={subtitleRef}
                    className="mt-8 text-xl text-white/60 md:text-2xl"
                >
                    Développeur Full Stack
                </p>
            </div>
        </div>
    )
}