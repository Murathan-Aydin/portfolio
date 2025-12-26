"use client"

import { motion } from "framer-motion"

export function SEOLocalSection() {
    return (
        <section className="py-16 bg-white border-t border-border">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">
                            Développeur web freelance à Mâcon – Accompagnement personnalisé pour votre projet
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            En tant que développeur web freelance basé à Mâcon, je vous accompagne dans la création de votre site internet, 
                            qu'il s'agisse d'un site vitrine pour présenter votre activité, d'une boutique en ligne pour vendre vos produits, 
                            ou d'une application web sur mesure adaptée à vos besoins spécifiques.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Je travaille avec des entreprises de toutes tailles en Saône-et-Loire et en Bourgogne-Franche-Comté : 
                            artisans, commerçants, indépendants, startups et PME. Chaque projet est unique, et je m'adapte à votre 
                            secteur d'activité pour vous proposer une solution web qui correspond à vos objectifs et à votre budget.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Mon approche privilégie l'écoute, la transparence et l'accompagnement personnalisé. De la première 
                            consultation jusqu'à la mise en ligne, je vous guide à chaque étape. Tous mes sites sont optimisés pour 
                            le référencement local, permettant à vos clients potentiels de vous trouver facilement sur Google. 
                            N'hésitez pas à me contacter pour un devis gratuit et sans engagement.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

