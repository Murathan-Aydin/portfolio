"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/projects-data"
import Link from "next/link"

interface ProjectDetailClientProps {
    project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    return (
        <>
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

                                {project.projectUrl && (
                                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                            Voir le site en ligne
                                            <ExternalLink className="ml-2 w-4 h-4" />
                                        </Button>
                                    </a>
                                )}
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
                                <h2 className="text-2xl font-bold text-foreground mb-6">Fonctionnalités clés</h2>
                                <ul className="space-y-4">
                                    {project.features.map((feature, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                                <Check className="w-4 h-4 text-primary" />
                                            </span>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6">Galerie</h2>
                                <div className="grid gap-4">
                                    {project.gallery.map((image, index) => (
                                        <motion.img
                                            key={index}
                                            src={image}
                                            alt={`${project.title} - Image ${index + 1}`}
                                            className="w-full rounded-lg shadow-md"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-secondary/30 rounded-2xl p-8 mb-8"
                        >
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                                Site web réalisé pour une entreprise en Saône-et-Loire, optimisé pour le référencement local
                                et la performance. Ce projet illustre mon expertise en développement web pour les entreprises
                                locales à Mâcon et dans la région Bourgogne-Franche-Comté.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="text-center bg-secondary/30 rounded-2xl p-12"
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
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
