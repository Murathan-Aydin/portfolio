"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
    {
        content:
            "Un travail exceptionnel ! Le site correspond parfaitement à nos attentes. Communication fluide et délais respectés.",
        author: "Marie Dupont",
        role: "Gérante, Restaurant Le Gourmet",
    },
    {
        content:
            "Très professionnel et à l'écoute. Le site e-commerce a boosté nos ventes en ligne de façon significative.",
        author: "Thomas Martin",
        role: "Fondateur, Mode Éthique",
    },
    {
        content: "Une expertise technique remarquable combinée à un vrai sens du design. Je recommande vivement !",
        author: "Sophie Bernard",
        role: "Architecte, Cabinet Bernard",
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

export function TestimonialsSection() {
    return (
        <section id="avis" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ce que disent mes clients</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">La satisfaction client est ma priorité</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <CardContent className="p-8">
                                    <Quote className="w-10 h-10 text-primary/30 mb-4" />
                                    <p className="text-foreground leading-relaxed mb-6">{`"${testimonial.content}"`}</p>
                                    <div className="border-t pt-4">
                                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
