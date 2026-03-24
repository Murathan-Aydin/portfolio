"use client"

import { useState, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Briefcase, Send, Loader2, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                }
            })

            if (containerRef.current) {
                tl.fromTo(
                    containerRef.current,
                    { opacity: 0, scale: 0.92, y: 50 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                    }
                )
            }
        }, containerRef)

        return () => ctx.revert()
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
        } catch (error: unknown) {
            console.error("Error sending message:", error)
            setError(error instanceof Error ? error.message : "Erreur lors de l'envoi du message")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section id="contact" className="py-24 bg-transparent relative px-4 sm:px-6">
            <div className="container mx-auto max-w-7xl">

                {/* Huge Blue Container */}
                <div
                    ref={containerRef}
                    className="bg-card/50 backdrop-blur-2xl border border-white/10 rounded-4xl sm:rounded-[3rem] p-4 py-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-150 h-150 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                        {/* Left Content (Text) */}
                        <div className="text-foreground">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                                Prêt à lancer <br /> votre projet ?
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-lg">
                                Discutons de vos enjeux et trouvons la solution optimale pour concevoir,
                                développer ou moderniser votre application ou site web.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                {/* Email Box */}
                                <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <Mail className="text-white w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-primary-foreground/70 font-medium mb-1 uppercase tracking-wider">
                                        Email
                                    </p>
                                    <p className="font-bold text-lg text-white">
                                        {config.email}
                                    </p>
                                </div>

                                {/* Status Box */}
                                <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                        <Briefcase className="text-white w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-primary-foreground/70 font-medium mb-1 uppercase tracking-wider">
                                        Statut
                                    </p>
                                    <p className="font-bold text-lg text-white">
                                        Ouvert pour de<br />nouveaux projets
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Card */}
                        <div ref={formRef} className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-4 py-8 sm:p-8 shadow-xl">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="w-10 h-10 text-emerald-400" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-foreground mb-3">Message envoyé !</h4>
                                    <p className="text-muted-foreground mb-8">
                                        Merci pour votre message. Je vous recontacterai très rapidement pour échanger sur vos besoins.
                                    </p>
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="outline"
                                        size="lg"
                                        className="rounded-xl w-full text-primary border-primary/20 hover:bg-primary/5"
                                    >
                                        Envoyer un autre message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2 flex flex-col">
                                            <label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Nom</label>
                                            <Input
                                                id="name"
                                                placeholder="Jean Dupont"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="bg-white/5 border-white/10 focus-visible:ring-primary rounded-xl px-4 py-6 text-foreground shadow-none hover:bg-white/10"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 flex flex-col">
                                            <label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Email</label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="jean@exemple.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="bg-white/5 border-white/10 focus-visible:ring-primary rounded-xl px-4 py-6 text-foreground shadow-none hover:bg-white/10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 flex flex-col">
                                        <label htmlFor="subject" className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Sujet du projet</label>
                                        <Input
                                            id="subject"
                                            placeholder="Ex: Création d'une application web..."
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="bg-white/5 border-white/10 focus-visible:ring-primary rounded-xl px-4 py-6 text-foreground shadow-none hover:bg-white/10"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2 flex flex-col">
                                        <label htmlFor="message" className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Votre message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Décrivez votre besoin en détail..."
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="bg-white/5 border-white/10 focus-visible:ring-primary rounded-xl px-4 py-4 text-foreground shadow-none hover:bg-white/10 resize-y"
                                            required                                            
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-base font-bold shadow-lg shadow-primary/30 transition-all mt-4"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                Envoyer le message
                                                <Send className="ml-3 w-5 h-5" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
