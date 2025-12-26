"use client"

import { motion } from "framer-motion"
import { Globe, ShoppingCart, Code2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
    {
        icon: Globe,
        title: "Site vitrine",
        description:
            "Un site web professionnel pour présenter votre activité, vos services et vos valeurs. Design moderne et optimisé pour le référencement.",
    },
    {
        icon: ShoppingCart,
        title: "E-commerce",
        description:
            "Boutique en ligne performante avec gestion des produits, paiements sécurisés et expérience utilisateur optimisée pour convertir.",
    },
    {
        icon: Code2,
        title: "Développement sur mesure",
        description:
            "Applications web personnalisées selon vos besoins spécifiques. Solutions techniques adaptées à votre métier.",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
}

export function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Services de développement web à Mâcon</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Des solutions web adaptées aux besoins des entreprises locales en Saône-et-Loire
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {services.map((service) => (
                        <motion.div key={service.title} variants={itemVariants}>
                            <Card className="group relative h-full bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                <CardContent className="p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                                        <service.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
