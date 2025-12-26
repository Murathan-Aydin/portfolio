"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Search, Palette, Code, Rocket } from "lucide-react"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Analyse",
        description: "Étude de vos besoins, objectifs et cible pour définir la meilleure stratégie.",
    },
    {
        icon: Palette,
        number: "02",
        title: "Design",
        description: "Création de maquettes modernes et ergonomiques validées ensemble.",
    },
    {
        icon: Code,
        number: "03",
        title: "Développement",
        description: "Développement sur mesure avec les technologies les plus performantes.",
    },
    {
        icon: Rocket,
        number: "04",
        title: "Mise en ligne",
        description: "Déploiement, tests et accompagnement pour un lancement réussi.",
    },
]

export function MethodSection() {
    const titleRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const progressLineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const isMobile = window.innerWidth < 768

        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        once: true,
                    },
                }
            )
        }

        if (progressLineRef.current && !isMobile) {
            gsap.fromTo(
                progressLineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 0.8,
                    delay: 0.3,
                    transformOrigin: "left",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            )
        }

        if (containerRef.current) {
            const stepCards = containerRef.current.querySelectorAll(".step-card")
            gsap.fromTo(
                stepCards,
                { opacity: 0, y: isMobile ? 15 : 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: isMobile ? 0.05 : 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        once: true,
                    },
                }
            )
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    return (
        <section id="methode" className="py-16 sm:py-24 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6">
                <div ref={titleRef} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Méthode de travail</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Un processus clair et transparent pour votre projet
                    </p>
                </div>

                <div className="relative">
                    {/* Progress Line */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-primary/20">
                        <div
                            ref={progressLineRef}
                            className="h-full bg-primary origin-left"
                        />
                    </div>

                    <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {steps.map((step) => (
                            <div
                                key={step.title}
                                className="relative step-card"
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <step.icon className="w-8 h-8 text-primary" />
                                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                                            {step.number}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
