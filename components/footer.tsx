"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const footerLinks = [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { name: "CGV", href: "/cgv" },
]

export function Footer() {
    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (footerRef.current) {
            gsap.fromTo(
                footerRef.current,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 90%",
                        once: true,
                    },
                }
            )
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    return (
        <footer className="py-8 sm:py-12 bg-white border-t border-border">
            <div className="container mx-auto px-4 sm:px-6">
                <div
                    ref={footerRef}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
                >
                    <Link href="/" className="text-xl sm:text-2xl font-bold text-[#465a66]">
                        MA<span className="text-[#40c9a2]">.DEV</span>
                    </Link>

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">© {new Date().getFullYear()} MA.DEV. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
