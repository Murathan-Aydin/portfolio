"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Arrow } from "@radix-ui/react-select"
import { ArrowDown } from "lucide-react"

const TEXTS = [
    `Je suis Murathan`,
    `Développeur Full-Stack`,
    `Je crée des expériences digitales uniques et innovantes.`// il faut un texte court
]

export function HeroSection() {
    const introRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const textRefs = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // --- Intro : disparaît au scroll ---
        if (introRef.current) {
            gsap.to(introRef.current, {
                opacity: 0, // L'intro devient transparente
                y: -60, // L'intro remonte légèrement en disparaissant {ici je veu un effet en translation + opacity}
                scale: 0.95, // L'intro rétrécit légèrement
                scrollTrigger: {
                    trigger: introRef.current, // L'animation est déclenchée par l'élément intro
                    start: "top top", // L'animation commence dès que le top de l'intro atteint le top du viewport
                    end: "center top", // L'animation se termine quand le bas de l'intro atteint le top du viewport
                    scrub: 1, // L'animation suit le scroll
                },
            })
        }

        // --- Parallax textes + shrink conteneur ---
        const section = sectionRef.current
        const els = textRefs.current
        if (!section || els.some(el => !el)) return

        gsap.set(els[0], { opacity: 1, y: 0 })
        els.slice(1).forEach(el => gsap.set(el, { opacity: 0, y: 80 }))

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        })

        els.forEach((_, i) => {
            if (i < els.length - 1) {
                tl.to(els[i], { opacity: 0, y: -80, duration: 1 })
                tl.to(els[i + 1], { opacity: 1, y: 0, duration: 1 }, "<0.4")
            }
        })

        // Phase 1 : dernier texte remonte et sort (rapide)
        tl.to(els[els.length - 1], { y: -220, opacity: 0, duration: 1 })

        // Phase 2 : ScrollTrigger séparé — démarre quand on est à 75% du scroll de la section
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                y: -180,
                scale: 0.72,
                scrollTrigger: {
                    trigger: section,
                    start: "75% top",
                    end: "bottom top",
                    scrub: 1,
                },
            })
        }

        // --- Flèche descend et disparaît au scroll ---
        if (arrowRef.current && introRef.current) {
            gsap.to(arrowRef.current, {
                y: 100, // Déplacement vers le bas (parallax par rapport au parent)
                opacity: 0,
                scrollTrigger: {
                    trigger: introRef.current,
                    start: "top top",
                    end: "center top", // Disparaît en synchronisation avec l'intro
                    scrub: 1,
                }
            })
        }
        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <>
            {/* Intro — plein écran, disparaît au scroll */}
            <div className="relative h-[150vh]">
                <div
                    ref={introRef}
                    className="sticky top-0 h-dvh md:h-screen flex items-center justify-center"
                >
                    <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] md:text-[clamp(2rem,5vw,4rem)] font-extrabold text-center px-4 leading-[1.1] tracking-tight">
                        Vous cherchez un développeur ?
                    </h1>
                    <span ref={arrowRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-200/90" >
                        <ArrowDown className="w-10 h-10" />
                    </span>
                    {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-10 flex flex-row items-center justify-between">
                        <span className="text-md uppercase tracking-wider ">scroll</span>
                        <span className="text-md uppercase tracking-wider ">scroll</span>
                    </div> */}
                </div>
            </div>

            {/* Parallax section */}
            <section
                ref={sectionRef}
                className="relative "
                style={{ height: `${TEXTS.length * 80}vh` }}
            >
                <div className="sticky top-[20vh] mb-10 h-fit overflow-hidden flex items-center justify-center px-[2%] md:px-[5%]">
                    {/* Conteneur centré avec marges */}
                    <div ref={containerRef} className="relative w-full h-[60vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        {/* Image de fond */}
                        <Image
                            src="/bg_hero_1.jpeg"
                            alt="Hero Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Overlay sombre avec teinte bleue foncée du thème */}
                        <div className="absolute inset-0 bg-background/60" />

                        {/* Textes centrés */}
                        <div className="relative z-10 h-full flex items-center justify-center px-6">
                            <div className="relative w-full h-48 md:h-64 flex items-center justify-center">
                                {TEXTS.map((text, i) => (
                                    <div
                                        key={i}
                                        ref={el => { textRefs.current[i] = el }}
                                        className="absolute inset-0 flex items-center justify-center text-center"
                                    >
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md max-w-5xl">
                                            {text}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
