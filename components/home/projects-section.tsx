"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/lib/types"
import Link from "next/link"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const titleRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects")
                const data = await response.json()

                if (data.success) {
                    // Prendre seulement les 4 premiers projets
                    setProjects(data.data.slice(0, 4))
                }
            } catch (error) {
                console.error("Error fetching projects:", error)
            }
        }

        fetchProjects()
    }, [])

    useEffect(() => {
        if (projects.length === 0) return

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

        // Animation des projets avec stagger
        if (containerRef.current) {
            const projectCards = containerRef.current.querySelectorAll(".project-card")
            gsap.fromTo(
                projectCards,
                { opacity: 0, y: isMobile ? 20 : 40 },
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
    }, [projects])

    return (
        <section id="projets" className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div ref={titleRef} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Projets web réalisés à Mâcon et en Saône-et-Loire</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Découvrez quelques-unes de mes réalisations pour des entreprises locales
                    </p>
                </div>

                {projects.length > 0 && (
                    <div ref={containerRef} className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                        {projects.map((project) => (
                            <div key={project._id || project.slug} className="project-card">
                                <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="px-3 py-1 text-sm bg-secondary text-foreground rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-4 italic">
                                            Projet web réalisé pour une entreprise en Saône-et-Loire, optimisé pour le référencement local et la performance.
                                        </p>
                                        <Link href={`/projets/${project.slug}`}>
                                            <Button variant="ghost" className="group/btn text-primary hover:text-primary/80 p-0">
                                                Voir le projet
                                                <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
