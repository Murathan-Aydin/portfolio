"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

export default function BgAnimate() {
    const [mounted, setMounted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const blob1Ref = useRef<HTMLDivElement>(null)
    const blob2Ref = useRef<HTMLDivElement>(null)
    const blob3Ref = useRef<HTMLDivElement>(null)
    const blobCenterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const ctx = gsap.context(() => {
            if (!blobCenterRef.current || !blob1Ref.current || !blob2Ref.current || !blob3Ref.current) return

            // Utilitaires GSAP rapides et performants pour la liaison avec la souris
            // On fixe "x" et "y" et on paramètre le tweening "power3" ou "power2.out" pour la traîne
            const xCenter = gsap.quickTo(blobCenterRef.current, "x", { duration: 1.2, ease: "power3" })
            const yCenter = gsap.quickTo(blobCenterRef.current, "y", { duration: 1.2, ease: "power3" })

            const xBlob1 = gsap.quickTo(blob1Ref.current, "x", { duration: 2, ease: "power2.out" })
            const yBlob1 = gsap.quickTo(blob1Ref.current, "y", { duration: 2, ease: "power2.out" })

            const xBlob2 = gsap.quickTo(blob2Ref.current, "x", { duration: 3, ease: "power1.out" })
            const yBlob2 = gsap.quickTo(blob2Ref.current, "y", { duration: 3, ease: "power1.out" })

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e
                const cx = window.innerWidth / 2
                const cy = window.innerHeight / 2
                
                // Blob Central : Suit directement la souris (depuis le centre)
                // Comme sa position de base est absolute top-0 left-0, on prend clientX direct ou avec translation
                // Mais s'il est au centre (top-50 left-50), le déplacement correspond au différentiel (clientX - cx)
                xCenter(clientX - cx)
                yCenter(clientY - cy)

                // Parallax subtil inversé pour les blobs des coins
                const dx = (clientX - cx) * 0.1
                const dy = (clientY - cy) * 0.1
                
                xBlob1(-dx)     // Le blob Haut Gauche fuit légèrement en opposé
                yBlob1(-dy)
                
                xBlob2(dx * 1.5) // Le blob Bas Droite suit doucement
                yBlob2(dy * 1.5)
            }

            const handleScroll = () => {
                const scrolled = window.scrollY
                // Effet Parallax au scroll (les blobs montent/descendent à des vitesses différentes)
                gsap.to(blob1Ref.current, { y: -scrolled * 0.3, duration: 0.5, overwrite: "auto" })
                gsap.to(blob3Ref.current, { y: -scrolled * 0.15, duration: 0.5, overwrite: "auto" })
            }

            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("scroll", handleScroll)

            return () => {
                window.removeEventListener("mousemove", handleMouseMove)
                window.removeEventListener("scroll", handleScroll)
            }
        }, containerRef)

        return () => ctx.revert()
    }, [mounted])

    if (!mounted) return null

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
            
            {/* Forme 1 : Blob Haut Droite (Bleu clair/primaire) */}
            <div 
                ref={blob1Ref} 
                className="absolute top-[-5%] right-[-10%] w-[90vw] lg:w-[45vw] h-[90vw] lg:h-[45vw] rounded-full bg-primary/20 blur-[90px] lg:blur-[130px] opacity-100 animate-float" 
            />
            
            {/* Forme 2 : Blob Milieu Gauche (Cyan intense) */}
            <div 
                ref={blob3Ref} 
                className="absolute top-[30%] left-[-20%] w-[80vw] lg:w-[45vw] h-[80vw] lg:h-[45vw] rounded-full bg-cyan-500/20 blur-[100px] lg:blur-[120px] opacity-100 animate-float-slow" 
            />
            
            {/* Forme 3 : Blob Bas Droite (Bleu profond brillant) */}
            <div 
                ref={blob2Ref} 
                className="absolute bottom-[-10%] right-[0%] w-[100vw] lg:w-[50vw] h-[70vw] lg:h-[40vw] rounded-full bg-blue-600/30 blur-[110px] lg:blur-[140px] opacity-100 animate-pulse-soft" 
            />
            
            {/* Forme 4 : Centre - Suit la SOURIS activement */}
            {/* Très visible sur Desktop, caché sur mobile car la souris n'est pas utilisée */}
            <div 
                ref={blobCenterRef} 
                className="hidden lg:block absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-blue-900/30 blur-[100px] opacity-100" 
            />
            
            {/* Superposition du grain de bruit mat par-dessus les formes colorées pour la texture */}
            <div 
                className="absolute inset-0 opacity-[0.20] mix-blend-overlay"  /* Augmentation de l'opacité du grain à 20% pour plus de netteté */
                style={{ 
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" 
                }} 
            />
        </div>
    )
}