"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const faqs = [
    {
        question: "Quel est le prix d'un site internet à Mâcon ?",
        answer:
            "Le prix d'un site internet à Mâcon varie selon la complexité du projet. Un site vitrine professionnel commence à partir de 1000€, tandis qu'un e-commerce ou une application sur mesure nécessite un devis personnalisé. Je vous propose toujours une estimation gratuite et sans engagement pour évaluer vos besoins précis.",
    },
    {
        question: "Combien coûte un développeur web freelance à Mâcon ?",
        answer:
            "En tant que développeur web freelance basé à Mâcon, je propose des tarifs transparents adaptés aux entreprises locales. Les prix dépendent du type de projet : site vitrine, e-commerce, ou développement sur mesure. Chaque devis est personnalisé selon vos besoins spécifiques, avec toujours la possibilité d'un devis gratuit pour évaluer votre projet.",
    },
    {
        question: "Pourquoi créer un site web pour une entreprise locale ?",
        answer:
            "Un site web est essentiel pour les entreprises locales à Mâcon et en Saône-et-Loire. Il améliore votre visibilité locale sur Google, permet aux clients de vous trouver facilement, renforce votre crédibilité, et peut générer de nouveaux clients 24/7. Un site optimisé pour le référencement local vous aide à apparaître dans les recherches 'entreprises près de moi'.",
    },
    {
        question: "Travaillez-vous avec des entreprises en Saône-et-Loire ?",
        answer:
            "Oui, je travaille régulièrement avec des entreprises en Saône-et-Loire : artisans, commerçants, indépendants et PME. Basé à Mâcon, je me déplace facilement dans la région pour les réunions et le suivi de projet. Je comprends les enjeux des entreprises locales et adapte mes solutions à vos besoins spécifiques.",
    },
    {
        question: "Quels sont les délais de réalisation d'un site web ?",
        answer:
            "En général, un site vitrine prend 2 à 4 semaines, un e-commerce 4 à 8 semaines. Ces délais dépendent de la réactivité pour les validations et de la complexité du projet. Un planning détaillé vous est fourni dès le début du projet, avec des points d'étape réguliers pour suivre l'avancement.",
    },
    {
        question: "Le site sera-t-il optimisé pour le référencement local ?",
        answer:
            "Absolument. Tous mes sites sont développés avec les bonnes pratiques SEO local : structure optimisée, performances élevées, balises méta, sitemap, et optimisation pour les recherches locales. Je vous conseille également sur votre stratégie de contenu pour améliorer votre visibilité sur Google My Business et les recherches locales.",
    },
    {
        question: "Proposez-vous la maintenance du site ?",
        answer:
            "Oui, je propose des forfaits de maintenance mensuelle incluant les mises à jour de sécurité, les sauvegardes régulières, le support technique et les modifications mineures. Cela garantit la pérennité de votre site et vous permet de vous concentrer sur votre activité principale.",
    },
]

export function FAQSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const isMobile = window.innerWidth < 768

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            })

            if (titleRef.current) {
                tl.fromTo(
                    titleRef.current,
                    { opacity: 0, y: isMobile ? 20 : 40, scale: 0.98 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                    }
                )
            }

            if (contentRef.current) {
                tl.fromTo(
                    contentRef.current,
                    { opacity: 0, y: isMobile ? 30 : 50, scale: 0.98 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.4"
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="faq" className="py-16 sm:py-24 bg-transparent" ref={sectionRef}>
            <div className="container mx-auto px-4 sm:px-6">
                <div ref={titleRef} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Questions fréquentes – Développeur web à Mâcon</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Trouvez les réponses à vos questions sur la création de site internet à Mâcon</p>
                </div>

                <div ref={contentRef} className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="bg-card backdrop-blur-md border border-border rounded-xl shadow-sm px-6"
                            >
                                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
