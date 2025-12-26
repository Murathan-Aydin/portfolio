"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/lib/types"
import Link from "next/link"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
}

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])

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

    return (
        <section id="projets" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Projets web réalisés à Mâcon et en Saône-et-Loire</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Découvrez quelques-unes de mes réalisations pour des entreprises locales
                    </p>
                </motion.div>

                {projects.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {projects.map((project) => (
                            <motion.div key={project._id || project.slug} variants={itemVariants}>
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
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}
