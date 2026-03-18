"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
    const contentRef = useRef<HTMLDivElement>(null)
    const visualRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768

            // Entry animations — no ScrollTrigger needed, hero is always in viewport
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current.children,
                    { opacity: 0, y: isMobile ? 20 : 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
                )
            }

            if (visualRef.current) {
                gsap.fromTo(
                    visualRef.current,
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: "expo.out" }
                )
            }

            // Parallax scroll effect — fromTo centered so image is at 0 when hero is in view
            if (imageRef.current && visualRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: visualRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <section className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-background flex items-center">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div
                        ref={contentRef}
                        className="relative z-10 w-full flex flex-col items-start pr-0 lg:pr-12"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold tracking-wide text-primary uppercase">
                            MURATHAN AYDIN — DÉVELOPPEUR FULLSTACK
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-foreground leading-[1.05] tracking-tight mb-8">
                            Développeur web <br />
                            <span className="text-primary">Fullstack &</span> <br />
                            <span className="text-primary">Étudiant</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10">
                            Passionné par l&apos;innovation numérique, je conçois et développe des applications web performantes. Actuellement en alternance chez OID Consultants.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
                            <Button asChild size="lg" className="text-base font-semibold px-8 py-7 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all">
                                <Link href="/contact">
                                    Prendre un rendez-vous !
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-base font-semibold px-8 py-7 rounded-2xl border-border bg-white hover:bg-secondary/50 text-foreground transition-all">
                                <Link href="/projets">
                                    Voir mes projets
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span>Disponible pour de nouvelles missions</span>
                        </div>
                    </div>

                    {/* Right Visual with Parallax */}
                    <div
                        ref={visualRef}
                        className="relative h-[650px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-100 group"
                    >
                        <Image
                            ref={imageRef}
                            src="/murathan.jpg"
                            alt="Murathan Aydin profile"
                            fill
                            className="object-cover scale-110 grayscale-[30%] hover:grayscale-0 transition-[filter] duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />

                        {/* Floating Badge (like in screenshot) */}
                        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 animate-float">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-emerald-500" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Statut</p>
                                <p className="text-xs font-semibold text-emerald-600">Ouvert pour de <br />nouveaux missions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
