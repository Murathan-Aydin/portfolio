"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, LayoutDashboard, ShieldCheck } from "lucide-react"

const services = [
    {
        icon: Code2,
        title: "Développement Web Moderne",
        description: "Conception d'applications web rapides, dynamiques et optimisées avec des technologies récentes comme React et Next.js.",
        bullets: [
            "Interfaces fluides et responsive",
            "Performance et optimisation SEO",
            "Expérience utilisateur soignée",
        ],
    },
    {
        icon: LayoutDashboard,
        title: "Applications Web Interactives",
        description: "Création de plateformes et outils web sur mesure, adaptés à vos objectifs métiers.",
        bullets: [
            "Dashboards et interfaces dynamiques",
            "Intégration d'API et gestion de données",
            "Fonctionnalités personnalisées",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Architecture & Qualité du Code",
        description: "Développement structuré pour garantir des projets fiables, évolutifs et maintenables.",
        bullets: [
            "Organisation claire et scalable",
            "Bonnes pratiques (clean code, TypeScript)",
            "Réutilisabilité des composants",
        ],
    },
]

export function ServicesSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768

            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current.children,
                    { opacity: 0, y: isMobile ? 10 : 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }

            if (containerRef.current) {
                const cards = containerRef.current.querySelectorAll(".service-card")
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: isMobile ? 20 : 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="services" className="py-24 sm:py-32 bg-[#F8FAFC]" ref={sectionRef}>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                
                {/* Titles */}
                <div ref={titleRef} className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
                        Services digitaux sur mesure
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Des solutions web modernes, performantes et pensées pour répondre concrètement à vos besoins.
                    </p>
                </div>

                {/* Cards Grid */}
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <div key={idx} className="service-card flex">
                            <div className="w-full bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300">

                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                                    <service.icon className="w-6 h-6 text-primary" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {service.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <ul className="space-y-2">
                                    {service.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
