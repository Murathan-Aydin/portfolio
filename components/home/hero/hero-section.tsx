"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingBlobs } from "@/components/home/hero/floating-blobs"

export function HeroSection() {
    const contentRef = useRef<HTMLDivElement>(null)
    const visualRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const isMobile = window.innerWidth < 768

        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: isMobile ? 20 : 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            )
        }

        if (visualRef.current) {
            gsap.fromTo(
                visualRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.6, delay: 0.1, ease: "power2.out" }
            )
        }
    }, [])

    return (
        <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
                    {/* Left Content */}
                    <div
                        ref={contentRef}
                        className="relative z-10 w-full"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                            Développeur web freelance à Mâcon
                        </h1>
                        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg">
                            Création de sites modernes, performants et sur mesure pour les entreprises de Mâcon et de Saône-et-Loire. Accompagnement personnalisé et devis gratuit.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg">
                                <Link href="/devis">Demander un devis gratuit</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg border-2">
                                <Link href="/projets">Voir mes projets</Link>
                            </Button>
                        </div>
                        <div className="mt-6 sm:mt-8 flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                            <MapPin size={18} className="text-primary flex-shrink-0" />
                            <span>Basé à Mâcon – Intervention en Saône-et-Loire</span>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div
                        ref={visualRef}
                        className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full"
                    >
                        <FloatingBlobs />
                    </div>
                </div>
            </div>
        </section>
    )
}
