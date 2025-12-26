"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin, Send, Loader2, Check, AlertCircle } from "lucide-react"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { config } from "@/lib/config"

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")
    const titleRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const successRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const isMobile = window.innerWidth < 768

        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: isMobile ? 10 : 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        once: true,
                    },
                }
            )
        }

        if (leftRef.current) {
            gsap.fromTo(
                leftRef.current,
                { opacity: 0, x: isMobile ? 0 : -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: leftRef.current,
                        start: "top 85%",
                        once: true,
                    },
                }
            )
        }

        if (rightRef.current) {
            gsap.fromTo(
                rightRef.current,
                { opacity: 0, x: isMobile ? 0 : 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: rightRef.current,
                        start: "top 85%",
                        once: true,
                    },
                }
            )
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])

    useEffect(() => {
        if (isSubmitted && successRef.current) {
            gsap.fromTo(
                successRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.3 }
            )
        }
    }, [isSubmitted])

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
        } catch (error: any) {
            console.error("Error sending message:", error)
            setError(error.message || "Erreur lors de l'envoi du message")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <section id="contact" className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div ref={titleRef} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Parlons de votre projet</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">Prêt à donner vie à votre projet web ?</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
                    {/* Left Content */}
                    <div ref={leftRef}>
                        <h3 className="text-2xl font-semibold text-foreground mb-6">Travaillons ensemble</h3>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            Que vous ayez une idée précise ou que vous soyez encore en phase de réflexion, je suis là pour vous
                            accompagner. Décrivez-moi votre projet et je vous recontacte sous 24h avec une première analyse gratuite.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium text-foreground">{config.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Téléphone</p>
                                    <p className="font-medium text-foreground">{config.phoneDisplay}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
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
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 sm:p-8">
                                {isSubmitted ? (
                                    <div
                                        ref={successRef}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">Message envoyé !</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Merci pour votre message. Je vous recontacterai sous 24h.
                                        </p>
                                        <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                            Envoyer un autre message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
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
                                                    className="bg-secondary/50 border-0 focus-visible:ring-primary"
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
                                                    className="bg-secondary/50 border-0 focus-visible:ring-primary"
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
                                                className="bg-secondary/50 border-0 focus-visible:ring-primary"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Décrivez votre projet..."
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="bg-secondary/50 border-0 focus-visible:ring-primary resize-none"
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
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
