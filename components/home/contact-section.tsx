"use client"

import { useState, useEffect, useRef } from "react"
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

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current,
                    { opacity: 0, scale: 0.95, y: 30 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            once: true,
                            invalidateOnRefresh: true,
                        },
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
        <section id="contact" className="py-24 sm:py-32 bg-background relative px-4 sm:px-6">
            <div className="container mx-auto max-w-7xl">

                {/* Huge Blue Container */}
                <div
                    ref={containerRef}
                    className="bg-primary rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                        {/* Left Content (Text) */}
                        <div className="text-white">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                                Prêt à lancer <br /> votre projet ?
                            </h2>
                            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-12 max-w-lg">
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
                        <div ref={formRef} className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-3">Message envoyé !</h4>
                                    <p className="text-slate-500 mb-8">
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
                                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Nom</label>
                                            <Input
                                                id="name"
                                                placeholder="Jean Dupont"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="bg-slate-50/50 border-slate-200 focus-visible:ring-primary rounded-xl px-4 py-6 text-slate-900 shadow-none hover:bg-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Email</label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="jean@exemple.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="bg-slate-50/50 border-slate-200 focus-visible:ring-primary rounded-xl px-4 py-6 text-slate-900 shadow-none hover:bg-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Sujet du projet</label>
                                        <Input
                                            id="subject"
                                            placeholder="Ex: Création d'une application web..."
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="bg-slate-50/50 border-slate-200 focus-visible:ring-primary rounded-xl px-4 py-6 text-slate-900 shadow-none hover:bg-white"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Votre message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Décrivez votre besoin en détail..."
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="bg-slate-50/50 border-slate-200 focus-visible:ring-primary rounded-xl px-4 py-4 text-slate-900 resize-none shadow-none hover:bg-white"
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
