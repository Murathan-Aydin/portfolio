"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, Briefcase, GraduationCap } from "lucide-react"

/* ─────────────── DATA ─────────────── */

const EXP_CARDS = [
    {
        dot: "bg-primary", status: "Actuellement", statusDot: "bg-primary",
        badge: "ALTERNANCE", badgeCls: "bg-primary text-primary-foreground",
        title: "Développeur Full Stack",
        period: "Sept 2025 - Présent • OID Consultants", periodCls: "text-primary",
        cardCls: "bg-card border-border backdrop-blur-md",
        desc: "Conception et développement de solutions web et IoT dans le secteur de l'énergie.",
        items: [
            "APIs PHP et Python (traitement de données en push)",
            "Automatisation de processus (SFTP, CRON)",
            "Alertes Grafana / PHPMailer",
            "Déploiement Linux (VM / VPS) avec Git",
            "Collecte de données énergétiques via API",
        ],
        tags: [{ l: "React", c: "bg-primary/20 text-primary-foreground" }, { l: "Next.js", c: "bg-primary/20 text-primary-foreground" }, { l: "Tailwind", c: "bg-primary/20 text-primary-foreground" }],
    },
    {
        dot: "bg-white/20", status: "Passé", statusDot: "bg-white/30",
        badge: "INTÉRIM", badgeCls: "bg-white/10 text-white/70",
        title: "Opérateur Polyvalent",
        period: "Juin 2023 - Nov 2024 • SIMIRE | Bressor | Lamberet", periodCls: "text-muted-foreground",
        cardCls: "bg-card border-border backdrop-blur-md",
        desc: "Missions en intérim dans différentes industries.",
        items: ["Fabrication et assemblage de chaises (Simire)", "Production en fromagerie industrielle (Bressors)", "Assemblage de remorques frigorifiques (Lamberet)"],
        tags: [{ l: "Industrie", c: "bg-white/10 text-white/70" }, { l: "Production", c: "bg-white/10 text-white/70" }],
    },
    {
        dot: "bg-white/20", status: "Passé", statusDot: "bg-white/30",
        badge: "RESPONSABLE", badgeCls: "bg-white/10 text-white/70",
        title: "Responsable Magasin & Réparations",
        period: "Janv 2022 - 2023 • Phone Store Academy", periodCls: "text-muted-foreground",
        cardCls: "bg-card border-border backdrop-blur-md",
        desc: "Gestion opérationnelle d'un point de vente et accompagnement client.",
        items: ["Encadrement de stagiaires et apprentis", "Gestion réparations et relation client", "Création d'un site web en autodidacte"],
        tags: [{ l: "Vente", c: "bg-white/10 text-white/70" }, { l: "Gestion", c: "bg-white/10 text-white/70" }],
    },
    {
        dot: "bg-white/20", status: "Passé", statusDot: "bg-white/30",
        badge: "APPRENTI", badgeCls: "bg-white/10 text-white/70",
        title: "Apprenti Vendeur",
        period: "Juil 2019 - Juil 2021 • Solution Phone", periodCls: "text-muted-foreground",
        cardCls: "bg-card border-border backdrop-blur-md",
        desc: "Réparation, maintenance et vente en magasin de téléphonie.",
        items: ["Réparation et maintenance informatique", "Vente accessoires et services", "Accueil et conseil clients"],
        tags: [{ l: "Vente", c: "bg-white/10 text-white/70" }, { l: "Réparation", c: "bg-white/10 text-white/70" }],
    },
]

const FORM_CARDS = [
    {
        dot: "bg-cyan-400", status: "En cours", statusDot: "bg-cyan-500",
        badge: "BAC+2", badgeCls: "bg-cyan-500 text-white",
        title: "Développeur Web — Web@cadémie",
        period: "2024 - 2026 • Epitech • Web@cadémie", periodCls: "text-cyan-400",
        cardCls: "bg-cyan-950/20 border-cyan-500/30 backdrop-blur-md",
        desc: "Formation intensive orientée pratique — full-stack, architecture logicielle, méthodologie Agile.",
        items: [],
        tags: [{ l: "PHP | Laravel", c: "bg-cyan-500/20 text-cyan-200" }, { l: "ReactJS | VueJS", c: "bg-cyan-500/20 text-cyan-200" }, { l: "DevOps", c: "bg-cyan-500/20 text-cyan-200" }, { l: "Agile", c: "bg-cyan-500/20 text-cyan-200" }],
    },
    {
        dot: "bg-white/20", status: "Passé", statusDot: "bg-white/30",
        badge: "CERTIFICATION", badgeCls: "bg-white/10 text-white/70",
        title: "Formation Micro-soudure",
        period: "Nov 2021 - Déc 2021 • C.F.T.M Lyon", periodCls: "text-muted-foreground",
        cardCls: "bg-card border-border backdrop-blur-md",
        desc: "Réparation électronique de précision et manipulation de composants sur circuits.",
        items: [],
        tags: [{ l: "Électronique", c: "bg-white/10 text-white/70" }, { l: "Micro-soudure", c: "bg-white/10 text-white/70" }],
    },
    {
        dot: "bg-white/20", status: "Passé", statusDot: "bg-white/30",
        badge: "CAP", badgeCls: "bg-white/10 text-white/70",
        title: "CAP Vente multifonction",
        period: "2019 - 2021 • CIFA Jean-Lameloise", periodCls: "text-muted-foreground",
        cardCls: "bg-card border-border backdrop-blur-md",
        desc: "Techniques de vente, relation client et gestion commerciale en alternance.",
        items: [],
        tags: [{ l: "Vente", c: "bg-white/10 text-white/70" }, { l: "Relation client", c: "bg-white/10 text-white/70" }],
    },
]

/* ─────────────── COMPONENT ─────────────── */

export function TimelineSection() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const rightColRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState<"experience" | "formation">("experience")

    const cards = activeTab === "experience" ? EXP_CARDS : FORM_CARDS

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const mm = gsap.matchMedia()

        // ── DESKTOP ANIMATION ──
        mm.add("(min-width: 1024px)", () => {
            const wrapper = wrapperRef.current
            const track = trackRef.current
            const rightCol = rightColRef.current
            if (!wrapper || !track || !rightCol) return

            const cardEls = Array.from(track.querySelectorAll<HTMLElement>(".desktop-card"))
            if (cardEls.length < 2) return

            const N = cardEls.length

            gsap.set(track, { x: 0 })
            gsap.set(cardEls, { scale: 1, opacity: 1, transformOrigin: "left center" })

            const trackLeft = track.getBoundingClientRect().left
            const lastCardLeft = cardEls[N - 1].getBoundingClientRect().left
            const dist = lastCardLeft - trackLeft
            if (dist <= 0) return

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    pin: true,
                    pinSpacing: true,
                    start: "top top",
                    end: `+=${dist}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            })

            tl.to(track, { x: -dist, ease: "none", duration: dist }, 0)

            cardEls.forEach((card, i) => {
                if (i < N - 1) {
                    const cardLeftRel = card.getBoundingClientRect().left - trackLeft
                    tl.to(card, {
                        scale: 0.4,
                        opacity: 0,
                        ease: "power2.inOut",
                        duration: card.offsetWidth * 0.8 
                    }, cardLeftRel)
                }
            })
        })

        // ── MOBILE ANIMATION ──
        mm.add("(max-width: 1023px)", () => {
            const mobileCards = gsap.utils.toArray<HTMLElement>(".mobile-card")
            
            mobileCards.forEach((card) => {
                gsap.fromTo(card, 
                    { opacity: 0, y: 50, scale: 0.95 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        duration: 0.6, 
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                )
            })
        })

        return () => mm.revert()
    }, [activeTab])

    return (
        <section id="timeline" className="mt-20 relative">

            {/* ── Desktop : split-screen pinné ── */}
            <div
                ref={wrapperRef}
                className="hidden lg:flex h-screen items-center overflow-hidden"
            >
                <div className="w-full py-[10%] px-6 flex items-center h-full bg-transparent z-60">

                    {/* Gauche — texte fixe */}
                    <div className="relative z-10 bg-transparent backdrop-blur-md w-[50%] h-full shrink-0 p-8 border rounded-md">
                        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">
                            MURATHAN AYDIN
                        </p>
                        <h2 className="text-5xl font-extrabold text-foreground mb-6 leading-tight">
                            Expérience & <br />
                            <span className="text-primary">Formation</span>
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            Alternant développeur full-stack, je conçois des applications web modernes et participe
                            à des projets techniques autour du développement, de la data et de l&apos;automatisation.
                            En parallèle de ma formation à la Web@cadémie by Epitech, je développe mes compétences
                            en PHP, Laravel, JavaScript et DevOps.
                        </p>
                        <div className="space-y-3">
                            {["Autonomie", "Persévérance", "Rigueur"].map(v => (
                                <div key={v} className="flex items-center gap-3 text-foreground font-medium">
                                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                                    {v}
                                </div>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 mt-10 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab("experience")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === "experience" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <Briefcase className="w-4 h-4" />
                                Expérience
                            </button>
                            <button
                                onClick={() => setActiveTab("formation")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === "formation" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <GraduationCap className="w-4 h-4" />
                                Formation
                            </button>
                        </div>
                    </div>

                    <div className="w-1 h-1 bg-red-600">
                        {/* ligne de separation rouge */}
                    </div>

                    {/* Droite — track horizontal */}
                    <div ref={rightColRef} className="flex-1 h-full overflow-visible">
                        {/* On ajoute un padding-left massif pour que la 1ère carte soit alignée à droite de l'écran initialement */}
                        <div ref={trackRef} className="flex gap-6 will-change-transform h-full pl-[50%] lg:pl-[17vw]">
                            {/* L'animation GSAP s'adaptera automatiquement grâce au calcul dynamique des positions (cardLeftRel) */}
                            {cards.map((card, i) => (
                                <CardItem key={`${activeTab}-${i}`} card={card} isMobile={false} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Mobile : scroll vertical classique avec reveal ── */}
            <div className="lg:hidden px-4 pt-32 pb-16">
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4">MURATHAN AYDIN</p>
                <h2 className="text-4xl font-extrabold text-foreground mb-6 leading-tight">
                    Expérience & <span className="text-primary">Formation</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                    Alternant développeur full-stack, je conçois des applications web modernes et participe à des projets techniques autour du développement, de la data et de l&apos;automatisation.
                    En parallèle de ma formation à la Web@cadémie by Epitech, je développe mes compétences en PHP, Laravel, JavaScript et DevOps.
                </p>

                <div className="flex gap-2 mb-12 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit backdrop-blur-sm">
                    <button onClick={() => setActiveTab("experience")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "experience" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}>
                        <Briefcase className="w-4 h-4" /> Expérience
                    </button>
                    <button onClick={() => setActiveTab("formation")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "formation" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}>
                        <GraduationCap className="w-4 h-4" /> Formation
                    </button>
                </div>

                <div className="space-y-6">
                    {cards.map((card, i) => (
                        <div key={`mob-${activeTab}-${i}`} className="mobile-card flex justify-center w-full">
                            <CardItem card={card} isMobile={true} />
                        </div>
                    ))}
                </div>
            </div>



        </section>
    )
}

/* ─────────────── CARD ─────────────── */

type CardData = (typeof EXP_CARDS)[number]

function CardItem({ card, isMobile = false }: { card: CardData, isMobile?: boolean }) {
    const defaultCls = isMobile 
        ? "w-full max-w-lg h-auto" 
        : "desktop-card w-[50%] h-[80%] shrink-0 top-0";

    return (
        <div className={`timeline-card ${defaultCls}`}>
            <div className={`border p-5 lg:p-6 rounded-3xl shadow-sm h-full flex flex-col ${card.cardCls}`}>
                <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                        <span className={`w-2 h-2 rounded-full ${card.statusDot}`} />
                        {card.status}
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${card.badgeCls}`}>
                        {card.badge}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{card.title}</h3>
                <p className={`font-semibold text-sm mb-3 ${card.periodCls}`}>{card.period}</p>
                <p className="text-muted-foreground text-sm mb-3">{card.desc}</p>
                {card.items.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 pl-1 mb-4 text-muted-foreground text-sm">
                        {card.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                )}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {card.tags.map((tag, j) => (
                        <span key={j} className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${tag.c}`}>
                            {tag.l}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
