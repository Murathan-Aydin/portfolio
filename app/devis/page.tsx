"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const projectTypes = [
    { id: "site-vitrine", label: "Site vitrine" },
    { id: "e-commerce", label: "E-commerce" },
    { id: "application-web", label: "Application web" },
    { id: "refonte", label: "Refonte de site" },
    { id: "autre", label: "Autre" },
]

const budgetRanges = [
    { id: "less-2k", label: "Moins de 2 000 €" },
    { id: "2k-5k", label: "2 000 € - 5 000 €" },
    { id: "5k-10k", label: "5 000 € - 10 000 €" },
    { id: "more-10k", label: "Plus de 10 000 €" },
]

const services = [
    { id: "developpement", label: "Développement web" },
    { id: "seo", label: "Optimisation SEO" },
    { id: "maintenance", label: "Maintenance" },
    { id: "hebergement", label: "Hébergement" },
]

export default function DevisPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedServices, setSelectedServices] = useState<string[]>([])

    const handleServiceChange = (serviceId: string, checked: boolean) => {
        if (checked) {
            setSelectedServices([...selectedServices, serviceId])
        } else {
            setSelectedServices(selectedServices.filter((id) => id !== serviceId))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <>
                <div className="pt-32 pb-24">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto text-center"
                        >
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Check className="w-10 h-10 text-primary" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Demande envoyée !</h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                Merci pour votre demande de devis. Je reviendrai vers vous dans les 24 à 48 heures avec une proposition
                                personnalisée.
                            </p>
                            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mr-4">
                                Nouvelle demande
                            </Button>
                            <a href="/">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Retour à l'accueil</Button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Demander un devis</h1>
                            <p className="text-lg text-muted-foreground">
                                Décrivez votre projet et recevez une proposition personnalisée sous 48h ouvrés.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                * Champs obligatoires
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-secondary rounded-2xl p-8"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-6">Vos coordonnées</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom *</Label>
                                        <Input id="firstName" placeholder="Votre prénom" required className="border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom *</Label>
                                        <Input id="lastName" placeholder="Votre nom" required className="border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input id="email" type="email" placeholder="votre@email.com" required className="border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input id="phone" type="tel" placeholder="06 00 00 00 00" className="border-primary/50" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="company">Entreprise</Label>
                                        <Input id="company" placeholder="Nom de votre entreprise" className="border-primary/50" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-secondary rounded-2xl p-8"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-6">Type de projet</h2>
                                <RadioGroup defaultValue="site-vitrine" className="grid md:grid-cols-2 gap-4">
                                    {projectTypes.map((type) => (
                                        <div
                                            key={type.id}
                                            className="flex items-center space-x-3 bg-white rounded-lg p-4 border border-primary/50 hover:border-primary transition-colors"
                                        >
                                            <RadioGroupItem value={type.id} id={type.id} />
                                            <Label htmlFor={type.id} className="cursor-pointer">
                                                {type.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-secondary rounded-2xl p-8"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-6">Services souhaités</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {services.map((service) => (
                                        <div
                                            key={service.id}
                                            className="flex items-center space-x-3 bg-white rounded-lg p-4 border border-primary/50 hover:border-primary transition-colors"
                                        >
                                            <Checkbox
                                                id={service.id}
                                                checked={selectedServices.includes(service.id)}
                                                onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                                            />
                                            <Label htmlFor={service.id} className="cursor-pointer">
                                                {service.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-secondary rounded-2xl p-8"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-6">Budget estimé</h2>
                                <RadioGroup defaultValue="2k-5k" className="grid md:grid-cols-2 gap-4">
                                    {budgetRanges.map((budget) => (
                                        <div
                                            key={budget.id}
                                            className="flex items-center space-x-3 bg-white rounded-lg p-4 border border-primary/50 hover:border-primary transition-colors"
                                        >
                                            <RadioGroupItem value={budget.id} id={budget.id} />
                                            <Label htmlFor={budget.id} className="cursor-pointer">
                                                {budget.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="bg-secondary rounded-2xl p-8"
                            >
                                <h2 className="text-xl font-semibold text-foreground mb-6">Votre projet</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="projectDescription">Description du projet *</Label>
                                        <Textarea
                                            id="projectDescription"
                                            placeholder="Décrivez votre projet, vos objectifs, vos attentes..."
                                            className="border-primary/50"
                                            rows={6}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="deadline">Délai souhaité</Label>
                                        <Input id="deadline" placeholder="Ex: 2 mois, Janvier 2025..." className="border-primary/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="references">Sites de référence</Label>
                                        <Textarea id="references" placeholder="Listez des sites web qui vous inspirent..." className="border-primary/50" rows={3} />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                                >
                                    Envoyer ma demande
                                    <Send className="ml-2 w-5 h-5" />
                                </Button>
                                <p className="text-sm text-muted-foreground text-center mt-4">
                                    En soumettant ce formulaire, vous acceptez notre{" "}
                                    <a href="/politique-de-confidentialite" className="text-primary hover:underline">
                                        politique de confidentialité
                                    </a>
                                </p>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
