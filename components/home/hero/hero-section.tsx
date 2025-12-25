"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingBlobs } from "@/components/home/hero/floating-blobs"

export function HeroSection() {
    return (
        <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 grid-rows-reverse items-center min-h-[calc(100vh-6rem)]">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                            Développeur web freelance à Mâcon
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg">
                            Création de sites modernes, performants et sur mesure
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
                                Demander un devis gratuit
                            </Button>
                            <Button variant="outline" size="lg" className="border-2 text-lg px-8 py-6 bg-transparent">
                                Voir mes projets
                            </Button>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
                            <MapPin size={18} className="text-primary" />
                            <span>Basé à Mâcon – Intervention en Saône-et-Loire</span>
                        </div>
                    </motion.div>

                    {/* Right Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] lg:h-[500px]"
                    >
                        <FloatingBlobs />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
