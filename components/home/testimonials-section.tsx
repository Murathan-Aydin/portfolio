"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
    {
        content:
            "Un travail exceptionnel ! Le site correspond parfaitement à nos attentes. Communication fluide et délais respectés.",
        author: "Marie Dupont",
        role: "Gérante, Restaurant Le Gourmet",
    },
    {
        content:
            "Très professionnel et à l'écoute. Le site e-commerce a boosté nos ventes en ligne de façon significative.",
        author: "Thomas Martin",
        role: "Fondateur, Mode Éthique",
    },
    {
        content: "Une expertise technique remarquable combinée à un vrai sens du design. Je recommande vivement !",
        author: "Sophie Bernard",
        role: "Architecte, Cabinet Bernard",
    },
]

export function TestimonialsSection() {
    const titleRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

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

        if (containerRef.current) {
            const testimonialCards = containerRef.current.querySelectorAll(".testimonial-card")
            gsap.fromTo(
                testimonialCards,
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
        <section id="avis" className="py-16 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6">
                <div ref={titleRef} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Ce que disent mes clients</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">La satisfaction client est ma priorité</p>
                </div>

                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <Card className="h-full bg-card backdrop-blur-md border border-border shadow-sm hover:shadow-md hover:shadow-primary/10 transition-shadow duration-300">
                                <CardContent className="p-8">
                                    <Quote className="w-10 h-10 text-primary/30 mb-4" />
                                    <p className="text-foreground leading-relaxed mb-6">{`"${testimonial.content}"`}</p>
                                    <div className="border-t border-border pt-4">
                                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
