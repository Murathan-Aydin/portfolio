"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const steps = [
    {
        number: "01",
        title: "Découverte",
        description: "Analyse de vos besoins, de vos objectifs et de votre audience pour définir une stratégie adaptée.",
    },
    {
        number: "02",
        title: "Conception",
        description: "Création de maquettes et de prototypes pour valider l'expérience utilisateur et l'interface.",
    },
    {
        number: "03",
        title: "Développement",
        description: "Développement agile avec des technologies modernes en garantissant performance et sécurité.",
    },
    {
        number: "04",
        title: "Lancement",
        description: "Mise en ligne, tests de qualité, et accompagnement pour une prise en main optimale.",
    },
]

export function MethodSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                }
            })

            if (headerRef.current) {
                tl.fromTo(
                    headerRef.current.children,
                    { opacity: 0, y: isMobile ? 20 : 40, scale: 0.98 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                    }
                )
            }

            if (containerRef.current) {
                const stepCards = containerRef.current.querySelectorAll(".method-step")
                tl.fromTo(
                    stepCards,
                    { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0, scale: 0.95 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                    },
                    "-=0.4"
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="methode" className="py-24 sm:py-32 bg-transparent relative overflow-hidden" ref={sectionRef}>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                
                {/* Header */}
                <div ref={headerRef} className="mb-20 max-w-3xl">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
                        Ma méthode de travail
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Une approche pragmatique pour garantir le succès de vos projets, de l&apos;idée à la mise en ligne.
                    </p>
                </div>

                {/* Steps */}
                <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border p-8 rounded-md backdrop-blur-md bg-white/5">
                    {steps.map((step) => (
                        <div key={step.number} className="method-step flex flex-col">
                            {/* Huge background number */}
                            <div className="text-7xl font-black text-white/5 mb-2 -ml-2 select-none tracking-tighter">
                                {step.number}
                            </div>
                            
                            {/* Title with blue line */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-[2px] bg-primary rounded-full" />
                                <h3 className="text-xl font-bold text-foreground">
                                    {step.title}
                                </h3>
                            </div>
                            
                            {/* Description */}
                            <p className="text-muted-foreground text-sm leading-relaxed pr-4">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
