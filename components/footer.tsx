"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const footerLinks = [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { name: "CGV", href: "/cgv" },
]

export function Footer() {
    return (
        <footer className="py-12 bg-white border-t border-border">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <Link href="/" className="text-2xl font-bold text-[#465a66]">
                        MA<span className="text-[#40c9a2]">.DEV</span>
                    </Link>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MA.DEV. Tous droits réservés.</p>
                </motion.div>
            </div>
        </footer>
    )
}
