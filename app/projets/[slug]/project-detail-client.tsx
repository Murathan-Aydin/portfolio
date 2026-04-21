"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowLeft, ExternalLink, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import Link from "next/link"

interface ProjectDetailClientProps {
    project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const featuresRef = useRef<HTMLUListElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)
    const cta1Ref = useRef<HTMLDivElement>(null)
    const cta2Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const isMobile = window.innerWidth < 768

        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                { opacity: 1, y: 0, duration: 0.5 }
            )
        }

        if (featuresRef.current) {
            const items = featuresRef.current.querySelectorAll("li")
            gsap.fromTo(
                items,
                { opacity: 0, x: isMobile ? 0 : -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    delay: 0.2,
                }
            )
        }

        if (galleryRef.current) {
            const images = galleryRef.current.querySelectorAll("img")
            gsap.fromTo(
                images,
                { opacity: 0, y: isMobile ? 10 : 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    delay: 0.3,
                }
            )
        }

        if (cta1Ref.current) {
            gsap.fromTo(
                cta1Ref.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.4 }
            )
        }

        if (cta2Ref.current) {
            gsap.fromTo(
                cta2Ref.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                { opacity: 1, y: 0, duration: 0.4, delay: 0.5 }
            )
        }

        return () => {
            gsap.killTweensOf([
                containerRef.current,
                featuresRef.current,
                galleryRef.current,
                cta1Ref.current,
                cta2Ref.current,
            ])
        }
    }, [])

    return (
        <>
            <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div ref={containerRef}>
                        <Link
                            href="/projets"
                            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux projets
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 mb-16">
                            <div>
                                <p className="text-sm text-primary font-medium mb-2">
                                    {project.clientName} • {project.projectDate}
                                </p>
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{project.title}</h1>
                                <p className="text-lg text-muted-foreground mb-8">{project.longDescription}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-4 py-2 text-sm bg-secondary text-foreground rounded-full font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {project.projectUrl && (
                                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                                Voir le site en ligne
                                                <ExternalLink className="ml-2 w-4 h-4" />
                                            </Button>
                                        </a>
                                    )}
                                    {project.downloadUrl && (
                                        <a href={project.downloadUrl} download>
                                            <Button variant="outline">
                                                Télécharger
                                                <Download className="ml-2 w-4 h-4" />
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-full rounded-2xl shadow-xl"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Fonctionnalités clés</h2>
                                <ul ref={featuresRef} className="space-y-4">
                                    {project.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                                <Check className="w-4 h-4 text-primary" />
                                            </span>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Galerie</h2>
                                <div ref={galleryRef} className="grid gap-4">
                                    {project.gallery.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${project.title} - Image ${index + 1}`}
                                            className="w-full rounded-lg shadow-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div
                            ref={cta1Ref}
                            className="bg-secondary/40 backdrop-blur-md border rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8"
                        >
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                                Site web réalisé pour une entreprise en Saône-et-Loire, optimisé pour le référencement local
                                et la performance. Ce projet illustre mon expertise en développement web pour les entreprises
                                locales à Mâcon et dans la région Bourgogne-Franche-Comté.
                            </p>
                        </div>

                        <div
                            ref={cta2Ref}
                            className="text-center bg-secondary/40 backdrop-blur-md border rounded-2xl p-8 sm:p-12"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Vous avez un projet similaire ?</h2>
                            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                Discutons ensemble de votre projet et voyons comment je peux vous aider à le réaliser.
                                En tant que développeur web freelance à Mâcon, je vous accompagne dans la création de votre site internet.
                            </p>
                            <Link href="/devis">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Demander un devis gratuit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
