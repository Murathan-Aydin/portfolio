"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TransitionLink } from "@/components/transition-link"

const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Projets", href: "/projets" },
    { name: "Méthode", href: "/#methode" },
    { name: "Contact", href: "/contact" },
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

    // Animation d'entrée du header — opacity only to avoid flash on refresh
    useEffect(() => {
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "transform" }
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
                    className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-card/95 backdrop-blur-3xl border-r border-border z-50 md:hidden shadow-xl"
                >
                    <div className="flex flex-col h-full pt-20">
                        {/* Navigation Links */}
                        <nav className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <TransitionLink
                                        key={link.name}
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors font-medium py-3 px-3 text-base rounded-lg hover:bg-secondary"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </TransitionLink>
                                ))}
                            </div>
                        </nav>

                        {/* Footer avec bouton CTA */}
                        <div className="p-4 sm:p-6 border-t border-border">
                            <TransitionLink
                                href="/devis"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block"
                            >
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-6 text-base">
                                    Demander un devis
                                </Button>
                            </TransitionLink>
                        </div>
                    </div>
                </div>
            )}

            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border" : "bg-transparent"
                    }`}
            >
                <nav className="container mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <TransitionLink href="/" className="text-xl sm:text-2xl font-bold text-foreground">
                            MA<span className="text-primary">.DEV</span>
                        </TransitionLink>

                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            {navLinks.map((link) => (
                                <TransitionLink
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors font-medium"
                                >
                                    {link.name}
                                </TransitionLink>
                            ))}
                            <TransitionLink href="/devis">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm lg:text-base">
                                    Demander un devis
                                </Button>
                            </TransitionLink>
                        </div>

                        <button
                            className="md:hidden p-2 relative z-50 cursor-pointer"
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
