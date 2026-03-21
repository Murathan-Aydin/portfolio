"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Send, Check, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const projectTypes = [
    { id: "site-vitrine", label: "Site vitrine" },
    { id: "e-commerce", label: "E-commerce" },
    { id: "application-web", label: "Application web" },
    { id: "refonte", label: "Refonte de site" },
    { id: "autre_projet", label: "Autre projet" },
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
    { id: "autre_service", label: "Autre service" },
]

export default function DevisPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "site-vitrine",
        budget: "2k-5k",
        projectDescription: "",
        deadline: "",
        references: "",
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const successRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isSubmitted && containerRef.current) {
            const isMobile = window.innerWidth < 768
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                { opacity: 1, y: 0, duration: 0.5 }
            )
        }
    }, [isSubmitted])

    useEffect(() => {
        if (isSubmitted && successRef.current) {
            gsap.fromTo(
                successRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.3 }
            )
        }
    }, [isSubmitted])

    const handleServiceChange = (serviceId: string, checked: boolean) => {
        if (checked) {
            setSelectedServices([...selectedServices, serviceId])
        } else {
            setSelectedServices(selectedServices.filter((id) => id !== serviceId))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/devis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    services: selectedServices,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de l'envoi de la demande")
            }

            setIsSubmitted(true)
        } catch (error) {
            console.error("Error sending devis:", error)
            setError(error instanceof Error ? error.message : "Erreur lors de l'envoi de la demande")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <>
                <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div ref={successRef} className="max-w-2xl mx-auto text-center">
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
                            <Link href="/">
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">{"Retour à l'accueil"}</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div ref={containerRef} className="max-w-3xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Demander un devis</h1>
                            <p className="text-base sm:text-lg text-muted-foreground">
                                Décrivez votre projet et recevez une proposition personnalisée sous 48h ouvrés.
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                                * Champs obligatoires
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            {error && (
                                <div className="flex items-center gap-2 p-3 sm:p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                                    <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Vos coordonnées</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom *</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Votre prénom"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom *</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Votre nom"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="votre@email.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="06 00 00 00 00"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="company">Entreprise</Label>
                                        <Input
                                            id="company"
                                            placeholder="Nom de votre entreprise"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Type de projet</h2>
                                <RadioGroup
                                    value={formData.projectType}
                                    onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                                    className="grid md:grid-cols-2 gap-4"
                                >
                                    {projectTypes.map((type) => (
                                        <Label
                                            key={type.id}
                                            htmlFor={type.id}
                                            className="flex items-center space-x-3 bg-background/20 rounded-lg p-4 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
                                        >
                                            <RadioGroupItem value={type.id} id={type.id} />
                                            <span>{type.label}</span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Services souhaités</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {services.map((service) => (
                                        <Label
                                            key={service.id}
                                            htmlFor={service.id}
                                            className="flex items-center space-x-3 bg-background/20 rounded-lg p-4 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
                                        >
                                            <Checkbox
                                                id={service.id}
                                                checked={selectedServices.includes(service.id)}
                                                onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                                            />
                                            <span>{service.label}</span>
                                        </Label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Budget estimé</h2>
                                <RadioGroup
                                    value={formData.budget}
                                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                                    className="grid md:grid-cols-2 gap-4"
                                >
                                    {budgetRanges.map((budget) => (
                                        <Label
                                            key={budget.id}
                                            htmlFor={budget.id}
                                            className="flex items-center space-x-3 bg-background/20 rounded-lg p-4 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
                                        >
                                            <RadioGroupItem value={budget.id} id={budget.id} />
                                            <span>{budget.label}</span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-6 sm:p-8">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Votre projet</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="projectDescription">Description du projet *</Label>
                                        <Textarea
                                            id="projectDescription"
                                            placeholder="Décrivez votre projet, vos objectifs, vos attentes..."
                                            value={formData.projectDescription}
                                            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                                            rows={6}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="deadline">Délai souhaité</Label>
                                        <Input
                                            id="deadline"
                                            placeholder="Ex: 2 mois, Janvier 2025..."
                                            value={formData.deadline}
                                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="references">Sites de référence</Label>
                                        <Textarea
                                            id="references"
                                            placeholder="Listez des sites web qui vous inspirent..."
                                            value={formData.references}
                                            onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 sm:py-6 text-base sm:text-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            Envoyer ma demande
                                            <Send className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </Button>
                                <p className="text-sm text-muted-foreground text-center mt-4">
                                    En soumettant ce formulaire, vous acceptez notre{" "}
                                    <a href="/politique-de-confidentialite" className="text-primary hover:underline">
                                        politique de confidentialité
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
