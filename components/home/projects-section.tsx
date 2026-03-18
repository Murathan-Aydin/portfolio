"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/types"
import Link from "next/link"

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
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

    useEffect(() => {
        if (projects.length === 0) return

        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768

            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current.children,
                    { opacity: 0, y: isMobile ? 10 : 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 85%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }

            if (containerRef.current) {
                const projectCards = containerRef.current.querySelectorAll(".project-card")
                gsap.fromTo(
                    projectCards,
                    { opacity: 0, y: isMobile ? 20 : 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }
        }, containerRef)

        // Refresh after setting up new triggers — in case section is already in viewport
        requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => ctx.revert()
    }, [projects])

    return (
        <section id="projets" className="py-24 sm:py-32 bg-white relative">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                
                {/* Header (Text left, Link right) */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                            Projets récents
                        </h2>
                        <p className="text-lg text-slate-500 leading-relaxed">
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
                            <Link href={`/projets/${project.slug}`} key={project._id || project.slug} className="group project-card block">
                                <div className="flex flex-col h-full cursor-pointer">
                                    <div className="relative overflow-hidden aspect-[4/3] rounded-3xl bg-slate-100 mb-6">
                                        <img
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-3">
                                            {project.description}
                                        </p>
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-auto">
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
                                <div className="aspect-[4/3] rounded-3xl bg-slate-100 mb-6 w-full" />
                                <div className="h-6 w-3/4 bg-slate-100 rounded mb-2" />
                                <div className="h-4 w-full bg-slate-100 rounded mb-1" />
                                <div className="h-4 w-5/6 bg-slate-100 rounded" />
                            </div>
                        ))
                    )}
                </div>

            </div>
        </section>
    )
}
