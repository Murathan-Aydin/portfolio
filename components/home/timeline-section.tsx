"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, ChevronDown, Briefcase, GraduationCap } from "lucide-react"

export function TimelineSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState<"experience" | "formation">("experience")

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768

            if (leftRef.current) {
                gsap.fromTo(
                    leftRef.current,
                    { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }

            if (rightRef.current) {
                const cards = rightRef.current.querySelectorAll(".timeline-card")
                gsap.fromTo(
                    cards,
                    { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="py-24 bg-background overflow-hidden" ref={sectionRef}>
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Left Column: Intro */}
                    <div ref={leftRef} className="lg:col-span-5 sticky top-32 pr-0 lg:pr-8">
                        <div className="inline-flex items-center gap-2 mb-4 text-xs font-bold tracking-[0.2em] text-primary uppercase">
                            MURATHAN AYDIN
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                            Expérience & <br />
                            <span className="text-primary">Formation</span>
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                            Alternant développeur full-stack, je conçois des applications web modernes et participe à des projets techniques autour du développement, de la data et de l&apos;automatisation.<br />
                            En parallèle de ma formation à la Web@cadémie by Epitech, je développe mes compétences en PHP, Laravel, JavaScript et DevOps à travers des projets concrets.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-foreground font-medium">
                                <CheckCircle2 className="text-primary w-5 h-5" />
                                <span>Autonomie</span>
                            </div>
                            <div className="flex items-center gap-3 text-foreground font-medium">
                                <CheckCircle2 className="text-primary w-5 h-5" />
                                <span>Persévérance</span>
                            </div>
                            <div className="flex items-center gap-3 text-foreground font-medium">
                                <CheckCircle2 className="text-primary w-5 h-5" />
                                <span>Rigueur</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Timeline Cards */}
                    <div ref={rightRef} className="lg:col-span-7">

                        {/* Tabs */}
                        <div className="flex gap-2 mb-10 p-1.5 bg-gray-100 rounded-2xl w-fit">
                            <button
                                onClick={() => setActiveTab("experience")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === "experience"
                                    ? "bg-white text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Briefcase className="w-4 h-4" />
                                Expérience
                            </button>
                            <button
                                onClick={() => setActiveTab("formation")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === "formation"
                                    ? "bg-white text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <GraduationCap className="w-4 h-4" />
                                Formation
                            </button>
                        </div>

                        {/* Experience Tab */}
                        {activeTab === "experience" && (
                            <div className="relative pl-8 sm:pl-12">
                                <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-8 w-0.5 bg-gray-100" />
                                <div className="space-y-10">

                                    <div className="timeline-card relative">
                                        <div className="absolute -left-[45px] sm:-left-[53px] top-6 w-8 h-8 rounded-full bg-primary border-4 border-background shadow-sm flex items-center justify-center z-10" />

                                        <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                                    Actuellement
                                                </div>
                                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                                                    ALTERNANCE
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                                Développeur Full Stack
                                            </h3>
                                            <p className="text-primary font-semibold text-sm mb-4">
                                                Sept 2025 - Présent • OID Consultants
                                            </p>
                                            <div className="text-muted-foreground leading-relaxed text-sm mb-6">
                                                <p>Conception et développement de solutions web et IoT dans le secteur de l&apos;énergie.</p>
                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm pl-4 mt-2">
                                                    <li>Développement d&apos;APIs en PHP et Python (traitement de données en push)</li>
                                                    <li>Automatisation de processus (SFTP, CRON)</li>
                                                    <li>Mise en place d&apos;alertes (Grafana, PHPMailer)</li>
                                                    <li>Déploiement sur serveurs Linux (VM / VPS) avec Git</li>
                                                    <li>Collecte et gestion de données énergétiques via API</li>
                                                </ul>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">React</span>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">Next.js</span>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">Tailwind</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="timeline-card relative">
                                        <div className="absolute -left-[45px] sm:-left-[53px] top-6 w-8 h-8 rounded-full bg-primary border-4 border-background shadow-sm flex items-center justify-center z-10" />

                                        <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                                    Actuellement
                                                </div>
                                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                                                    ALTERNANCE
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                                Operateur polyvalent
                                            </h3>
                                            <p className="text-primary font-semibold text-sm mb-4">
                                                2023 - 2024 • SIMIRE | Bressor | Lamberet
                                            </p>
                                            <div className="text-muted-foreground leading-relaxed text-sm mb-6">
                                                <p>Conception et développement de solutions web et IoT dans le secteur de l&apos;énergie.</p>
                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm pl-4 mt-2">
                                                    <li>Développement d&apos;APIs en PHP et Python (traitement de données en push)</li>
                                                    <li>Automatisation de processus (SFTP, CRON)</li>
                                                    <li>Mise en place d&apos;alertes (Grafana, PHPMailer)</li>
                                                    <li>Déploiement sur serveurs Linux (VM / VPS) avec Git</li>
                                                    <li>Collecte et gestion de données énergétiques via API</li>
                                                </ul>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">React</span>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">Next.js</span>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">Tailwind</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="timeline-card relative">
                                        <div className="absolute -left-[45px] sm:-left-[53px] top-6 w-8 h-8 rounded-full bg-primary border-4 border-background shadow-sm flex items-center justify-center z-10" />

                                        <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                                    2022 - 2023
                                                </div>
                                                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                                                    Résponsable de magasin
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                                Employé polyvalent - Vente & Service
                                            </h3>
                                            <p className="text-primary font-semibold text-sm mb-4">
                                                Janvier 2022 - 2023 • Phone Store Acedemy
                                            </p>
                                            <div className="text-muted-foreground leading-relaxed text-sm mb-6">
                                                <p>Gestion opérationnelle d&apos;un point de vente et accompagnement client.</p>
                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm pl-4 mt-2">
                                                    <li>Encadrement de stagiaires et apprentis)</li>
                                                    <li>Gestion des réparations et de la relation client</li>
                                                    <li>Création d&apos;un site web et d&apos;un outils interne en autodidacte</li>
                                                </ul>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">React</span>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">Next.js</span>
                                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">Tailwind</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Formation Tab */}
                        {activeTab === "formation" && (
                            <div className="relative pl-8 sm:pl-12">
                                <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-8 w-0.5 bg-gray-100" />
                                <div className="space-y-10">

                                    <div className="timeline-card relative">
                                        <div className="absolute -left-[45px] sm:-left-[53px] top-6 w-8 h-8 rounded-full bg-cyan-400 border-4 border-background shadow-sm flex items-center justify-center z-10" />

                                        <div className="bg-[#F0FDFB] border border-cyan-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                                    En cours
                                                </div>
                                                <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full">
                                                    BAC+4 / BAC+5
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                                Expert en Technologies de l&apos;Information
                                            </h3>
                                            <p className="text-cyan-600 font-semibold text-sm mb-4">
                                                Nov 2024 - 2026 • Epitech • Web@cademie
                                            </p>
                                            <div className="text-muted-foreground leading-relaxed text-sm mb-6">
                                                <p>Réalisation de projets web complets dans un environnement pédagogique orienté pratique.</p>
                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm pl-4 mt-2">
                                                    <li>Applications web (gestion, e-commerce, réseau social, chat)</li>
                                                    <li>Développement full-stack (React, Node.js, PHP)</li>
                                                    <li>Travail en méthodologie Agile</li>
                                                </ul>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-lg">PHP | Laravel</span>
                                                <span className="px-3 py-1.5 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-lg">ReactJS | VueJS</span>
                                                <span className="px-3 py-1.5 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-lg">DevOps</span>
                                                <span className="px-3 py-1.5 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-lg">Agile</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="timeline-card relative">
                                        <div className="absolute -left-[45px] sm:-left-[53px] top-6 w-8 h-8 rounded-full bg-gray-200 border-4 border-background flex items-center justify-center z-10 text-gray-400">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>

                                        <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-3xl shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                                                    Passé
                                                </div>
                                                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">
                                                    CAP
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground mb-2">
                                                CAP Vente
                                            </h3>
                                            <p className="text-gray-600 font-semibold text-sm mb-4">
                                                CAP Vente multifonction
                                            </p>
                                            <div className="text-muted-foreground leading-relaxed text-sm mb-6">
                                                <p>Gestion opérationnelle d&apos;un point de vente et accompagnement client.</p>
                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm pl-4 mt-2">
                                                    <li>Encadrement de stagiaires et apprentis</li>
                                                    <li>Gestion des réparations et de la relation client</li>
                                                    <li>{"Création d'un site web en autodidacte"}</li>
                                                </ul>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">Vente</span>
                                                <span className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">SQL</span>
                                                <span className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">Algorithmique</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </section>
    )
}
