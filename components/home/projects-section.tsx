"use client"

import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/types"
import Link from "next/link"

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/projects")
                const data = await response.json()

                if (data.success) {
                    setProjects(data.data.slice(0, 3)) // Only show 3 matching the mockup
                }
            } catch (error) {
                console.error("Error fetching projects:", error)
            }
        }

        fetchProjects()
    }, [])

    useLayoutEffect(() => {
        if (projects.length === 0) return

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
                const projectCards = containerRef.current.querySelectorAll(".project-card")
                tl.fromTo(
                    projectCards,
                    { opacity: 0, y: isMobile ? 30 : 50, scale: 0.95 },
                    {
                        opacity: 1,
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

        requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => ctx.revert()
    }, [projects])

    return (
        <section id="projets" className="py-24 bg-transparent relative" ref={sectionRef}>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                
                {/* Header (Text left, Link right) */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
                            Projets récents
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Une sélection de mes travaux, explorant divers univers et empilant des technologies performantes.
                        </p>
                    </div>
                    <Link href="/projets" className="inline-flex items-center text-primary font-bold hover:underline underline-offset-4 group whitespace-nowrap">
                        Voir tous mes travaux
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Projects Grid Container */}
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <Link href={`/projets/${project.slug}`} key={project._id || project.slug} className="group project-card block border py-5 px-4 rounded-3xl backdrop-blur-md bg-white/5">
                                <div className="flex flex-col h-full cursor-pointer">
                                    <div className="relative overflow-hidden aspect-4/3 rounded-3xl bg-white/5 border border-white/5 mb-6">
                                        <img
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col pt-6 mb-2 border-t">
                                        <h3 className="text-xl font-bold flex items-center justify-start gap-2 text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {project.title} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-3">
                                            {project.description}
                                        </p>
                                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-auto">
                                            {project.tags.slice(0, 3).join(" • ")}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        // Fallback UI if no projects are loaded yet to maintain layout structure
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="project-card flex flex-col h-full animate-pulse">
                                <div className="aspect-4/3 rounded-3xl bg-white/5 mb-6 w-full" />
                                <div className="h-6 w-3/4 bg-white/5 rounded mb-2" />
                                <div className="h-4 w-full bg-white/5 rounded mb-1" />
                                <div className="h-4 w-5/6 bg-white/5 rounded" />
                            </div>
                        ))
                    )}
                </div>

            </div>
        </section>
    )
}
