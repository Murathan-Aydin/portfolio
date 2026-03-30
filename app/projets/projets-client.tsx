"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"

interface ProjectsClientProps {
    initialProjects?: Project[]
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects || [])
    const [isLoading, setIsLoading] = useState(initialProjects === undefined)
    const titleRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (initialProjects !== undefined) return

        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects")
                const data = await response.json()

                if (data.success) {
                    setProjects(data.data)
                }
            } catch (error) {
                console.error("Error fetching projects:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProjects()
    }, [])

    useEffect(() => {
        if (isLoading || projects.length === 0) return

        const isMobile = window.innerWidth < 768

        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                { opacity: 1, y: 0, duration: 0.5 }
            )
        }

        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll(".project-card")
            gsap.fromTo(
                cards,
                { opacity: 0, y: isMobile ? 15 : 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    delay: 0.2,
                }
            )
        }

        if (ctaRef.current) {
            gsap.fromTo(
                ctaRef.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.5 }
            )
        }

        return () => {
            gsap.killTweensOf([titleRef.current, containerRef.current, ctaRef.current])
        }
    }, [isLoading, projects])

    return (
        <>
            <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div ref={titleRef} className="text-center mb-12 sm:mb-16">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">Projets web réalisés à Mâcon</h1>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                            Découvrez une sélection de mes réalisations récentes pour des entreprises à Mâcon et en Saône-et-Loire.
                            Chaque projet est unique et conçu sur mesure pour répondre aux besoins spécifiques de mes clients locaux.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div ref={containerRef} className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                            {projects.map((project) => (
                                <div key={project.slug} className="project-card">
                                    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                        <div className="relative overflow-hidden h-64">
                                            <Image
                                                src={project.image || "/placeholder.svg"}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 100vw, 50vw"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <CardContent className="p-6">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {project.clientName} • {project.projectDate}
                                            </p>
                                            <h2 className="text-xl font-semibold text-foreground mb-3">{project.title}</h2>
                                            <p className="text-muted-foreground mb-4">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1 text-sm bg-secondary text-foreground rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link href={`/projets/${project.slug}`}>
                                                <Button variant="ghost" className="group/btn text-primary hover:text-primary/80 p-0">
                                                    Voir le projet
                                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isLoading && projects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Aucun projet disponible pour le moment</p>
                        </div>
                    )}

                    <div
                        ref={ctaRef}
                        className="mt-12 sm:mt-20 text-center bg-secondary/30 rounded-2xl p-8 sm:p-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Un projet en tête ?</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Discutons ensemble de votre projet et voyons comment je peux vous aider à le concrétiser.
                        </p>
                        <Link href="/devis">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Demander un devis gratuit
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
