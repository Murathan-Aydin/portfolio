"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Combien coûte la création d'un site web ?",
    answer:
      "Le prix varie selon la complexité du projet. Un site vitrine commence à partir de 1500€, tandis qu'un e-commerce ou une application sur mesure nécessite un devis personnalisé. Je vous propose toujours une estimation gratuite avant de commencer.",
  },
  {
    question: "Quels sont les délais de réalisation ?",
    answer:
      "En général, un site vitrine prend 2 à 4 semaines, un e-commerce 4 à 8 semaines. Ces délais dépendent de la réactivité pour les validations et de la complexité du projet. Un planning détaillé vous est fourni dès le début.",
  },
  {
    question: "Proposez-vous la maintenance du site ?",
    answer:
      "Oui, je propose des forfaits de maintenance mensuelle incluant les mises à jour de sécurité, les sauvegardes régulières, le support technique et les modifications mineures. Cela garantit la pérennité de votre site.",
  },
  {
    question: "Le site sera-t-il optimisé pour le référencement ?",
    answer:
      "Absolument. Tous mes sites sont développés avec les bonnes pratiques SEO : structure optimisée, performances élevées, balises méta, sitemap, et conseils pour votre stratégie de contenu.",
  },
  {
    question: "Travaillez-vous uniquement à Mâcon ?",
    answer:
      "Je suis basé à Mâcon mais je travaille avec des clients dans toute la France. Grâce aux outils de communication modernes, la distance n'est jamais un obstacle. Je me déplace également en Saône-et-Loire pour les réunions si nécessaire.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Questions fréquentes</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Trouvez les réponses à vos questions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border-0 shadow-sm px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
