"use client"

import { motion } from "framer-motion"
import { Search, Palette, Code, Rocket } from "lucide-react"

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Analyse",
        description: "Étude de vos besoins, objectifs et cible pour définir la meilleure stratégie.",
    },
    {
        icon: Palette,
        number: "02",
        title: "Design",
        description: "Création de maquettes modernes et ergonomiques validées ensemble.",
    },
    {
        icon: Code,
        number: "03",
        title: "Développement",
        description: "Développement sur mesure avec les technologies les plus performantes.",
    },
    {
        icon: Rocket,
        number: "04",
        title: "Mise en ligne",
        description: "Déploiement, tests et accompagnement pour un lancement réussi.",
    },
]

export function MethodSection() {
    return (
        <section id="methode" className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Méthode de travail</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Un processus clair et transparent pour votre projet
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Progress Line */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-primary/20">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-primary origin-left"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative"
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        <step.icon className="w-8 h-8 text-primary" />
                                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                                            {step.number}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
