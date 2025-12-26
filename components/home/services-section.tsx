"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Globe, ShoppingCart, Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const services = [
    {
        icon: Globe,
        title: "Site vitrine",
        description:
            "Un site web professionnel pour présenter votre activité, vos services et vos valeurs. Design moderne et optimisé pour le référencement.",
    },
    {
        icon: ShoppingCart,
        title: "E-commerce",
        description:
            "Boutique en ligne performante avec gestion des produits, paiements sécurisés et expérience utilisateur optimisée pour convertir.",
    },
    {
        icon: Code2,
        title: "Développement sur mesure",
        description:
            "Applications web personnalisées selon vos besoins spécifiques. Solutions techniques adaptées à votre métier.",
    },
]

export function ServicesSection() {
    const titleRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const isMobile = window.innerWidth < 768

        // Animation du titre
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

        // Animation des cartes avec stagger
        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll(".service-card")
            gsap.fromTo(
                cards,
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
        <section id="services" className="py-16 sm:py-24 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6">
                <div ref={titleRef} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Services de développement web à Mâcon</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Des solutions web adaptées aux besoins des entreprises locales en Saône-et-Loire
                    </p>
                </div>

                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {services.map((service) => (
                        <div key={service.title} className="service-card">
                            <Card className="group relative h-full bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                <CardContent className="p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                                        <service.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
