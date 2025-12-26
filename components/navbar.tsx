"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Projets", href: "/projets" },
    { name: "Méthode", href: "/#methode" },
    { name: "Avis", href: "/#avis" },
    { name: "Contact", href: "/#contact" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const headerRef = useRef<HTMLElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Animation d'entrée du header
    useEffect(() => {
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                { y: -100 },
                { y: 0, duration: 0.6, ease: "power2.out" }
            )
        }
    }, [])

    // Animation overlay et menu mobile (sidebar)
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
            
            if (overlayRef.current) {
                gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
            }
            
            if (menuRef.current) {
                gsap.fromTo(
                    menuRef.current,
                    { x: "-100%" },
                    { x: 0, duration: 0.3, ease: "power2.out" }
                )
            }
        } else {
            document.body.style.overflow = "unset"
            
            if (overlayRef.current) {
                gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 })
            }
            
            if (menuRef.current) {
                gsap.to(menuRef.current, { x: "-100%", duration: 0.3, ease: "power2.in" })
            }
        }
        
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobileMenuOpen])

    return (
        <>
            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar Menu */}
            {isMobileMenuOpen && (
                <div
                    ref={menuRef}
                    className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 md:hidden shadow-xl"
                >
                    <div className="flex flex-col h-full">
                        {/* Header du menu mobile */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                            <Link 
                                href="/" 
                                className="text-xl sm:text-2xl font-bold text-[#465a66]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                MA<span className="text-[#40c9a2]">.DEV</span>
                            </Link>
                            <button
                                className="p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                                aria-label="Fermer le menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors font-medium py-3 px-3 text-base rounded-lg hover:bg-secondary"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* Footer avec bouton CTA */}
                        <div className="p-4 sm:p-6 border-t border-border">
                            <Link 
                                href="/devis" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block"
                            >
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-6 text-base">
                                    Demander un devis
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-white"
                    }`}
            >
                <nav className="container mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-xl sm:text-2xl font-bold text-[#465a66]">
                            MA<span className="text-[#40c9a2]">.DEV</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/devis">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm lg:text-base">
                                    Demander un devis
                                </Button>
                            </Link>
                        </div>

                        <button
                            className="md:hidden p-2 relative z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}
