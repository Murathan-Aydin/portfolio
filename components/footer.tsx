"use client"

import { TransitionLink } from "@/components/transition-link"

const footerLinks = [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { name: "CGV", href: "/cgv" },
]

export function Footer() {
    return (
        <footer className="py-8 sm:py-12 bg-transparent border-t border-border backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <TransitionLink href="/" className="text-xl sm:text-2xl font-bold text-foreground">
                        MA<span className="text-primary">.DEV</span>
                    </TransitionLink>

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {footerLinks.map((link) => (
                            <TransitionLink
                                key={link.name}
                                href={link.href}
                                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </TransitionLink>
                        ))}
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">© {new Date().getFullYear()} MA.DEV. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
