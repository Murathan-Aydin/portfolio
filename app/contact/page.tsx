"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Mail, Phone, MapPin, Send, Check, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { config } from "@/lib/config"
import Link from "next/link"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")
    const containerRef = useRef<HTMLDivElement>(null)
    const successRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (leftRef.current && rightRef.current) {
            const isMobile = window.innerWidth < 768
            gsap.fromTo(
                leftRef.current,
                { opacity: 0, x: isMobile ? 0 : -30 },
                { opacity: 1, x: 0, duration: 0.5, delay: 0.1 }
            )
            gsap.fromTo(
                rightRef.current,
                { opacity: 0, x: isMobile ? 0 : 30 },
                { opacity: 1, x: 0, duration: 0.5, delay: 0.2 }
            )
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de l'envoi du message")
            }

            setIsSubmitted(true)
            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
            console.error("Error sending message:", error)
            setError(error instanceof Error ? error.message : "Erreur lors de l'envoi du message")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div ref={successRef} className="max-w-2xl mx-auto text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Check className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Message envoyé !</h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Merci pour votre message. Je vous recontacterai sous 24h avec une première analyse de votre projet.
                        </p>
                        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mr-4">
                            Envoyer un autre message
                        </Button>
                        <Link href="/">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">{"Retour à l'accueil"}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div ref={containerRef} className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Parlons de votre projet</h1>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            Prêt à donner vie à votre projet web ? Décrivez-moi votre projet et je vous recontacte sous 24h avec une première analyse gratuite.
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2">* Champs obligatoires</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Left Content */}
                        <div ref={leftRef}>
                            <h2 className="text-2xl font-semibold text-foreground mb-6">Travaillons ensemble</h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                {"Que vous ayez une idée précise ou que vous soyez encore en phase de réflexion, je suis là pour vous accompagner. N'hésitez pas à me contacter pour discuter de votre projet."}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <a href={`mailto:${config.email}`} className="font-medium text-foreground hover:text-primary transition-colors">
                                            {config.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Téléphone</p>
                                        <a href={`tel:${config.phone}`} className="font-medium text-foreground hover:text-primary transition-colors">
                                            {config.phoneDisplay}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Localisation</p>
                                        <p className="font-medium text-foreground">Mâcon, Saône-et-Loire</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div ref={rightRef}>
                            <Card className="shadow-lg backdrop-blur-md bg-secondary/40 border">
                                <CardContent className="p-6 sm:p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm ">
                                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                                {error}
                                            </div>
                                        )}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Nom *</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Votre nom"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="bg-secondary/50 border focus-visible:ring-primary"
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
                                                    className="bg-secondary/50 border focus-visible:ring-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Sujet *</Label>
                                            <Input
                                                id="subject"
                                                placeholder="Objet de votre demande"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="bg-secondary/50 border focus-visible:ring-primary"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Décrivez votre projet..."
                                                rows={6}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="bg-secondary/50 border focus-visible:ring-primary resize-none"
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Envoi en cours...
                                                </>
                                            ) : (
                                                <>
                                                    Envoyer le message
                                                    <Send className="ml-2 w-4 h-4" />
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-sm text-muted-foreground text-center">
                                            En soumettant ce formulaire, vous acceptez notre{" "}
                                            <a href="/politique-de-confidentialite" className="text-primary hover:underline">
                                                politique de confidentialité
                                            </a>
                                        </p>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

