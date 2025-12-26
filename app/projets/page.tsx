"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
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

export default function ProjetsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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

    return (
        <>
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Projets web réalisés à Mâcon</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Découvrez une sélection de mes réalisations récentes pour des entreprises à Mâcon et en Saône-et-Loire.
                            Chaque projet est unique et conçu sur mesure pour répondre aux besoins spécifiques de mes clients locaux.
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid md:grid-cols-2 gap-8"
                        >
                            {projects.map((project) => (
                                <motion.div key={project.slug} variants={itemVariants}>
                                    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={project.image || "/placeholder.svg"}
                                                alt={project.title}
                                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {!isLoading && projects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Aucun projet disponible pour le moment</p>
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-20 text-center bg-secondary/30 rounded-2xl p-12"
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
                    </motion.div>
                </div>
            </div>
        </>
    )
}
