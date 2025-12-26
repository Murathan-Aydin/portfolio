"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { FolderKanban, Users, Eye, TrendingUp, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { projects } from "@/lib/projects-data"

const stats = [
    {
        title: "Projets",
        value: projects.length,
        change: "+2",
        trend: "up",
        icon: FolderKanban,
    },
    {
        title: "Visiteurs ce mois",
        value: "2,847",
        change: "+12.5%",
        trend: "up",
        icon: Users,
    },
    {
        title: "Pages vues",
        value: "12,493",
        change: "+8.2%",
        trend: "up",
        icon: Eye,
    },
    {
        title: "Demandes de devis",
        value: "24",
        change: "-3",
        trend: "down",
        icon: FileText,
    },
]

const recentActivity = [
    { action: "Nouveau projet ajouté", project: "Restaurant Le Gourmet", time: "Il y a 2h" },
    { action: "Projet modifié", project: "Boutique Mode Éthique", time: "Il y a 5h" },
    { action: "Demande de devis reçue", project: "Cabinet d'Architecte", time: "Il y a 1j" },
    { action: "Nouveau visiteur unique", project: "-", time: "Il y a 1j" },
]

export default function AdminDashboardPage() {
    const statsRef = useRef<HTMLDivElement>(null)
    const card1Ref = useRef<HTMLDivElement>(null)
    const card2Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (statsRef.current) {
            const cards = statsRef.current.children
            gsap.fromTo(
                Array.from(cards),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
            )
        }
    }, [])

    useEffect(() => {
        if (card1Ref.current) {
            gsap.fromTo(card1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 })
        }
        if (card2Ref.current) {
            gsap.fromTo(card2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 })
        }
    }, [])

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <main className="ml-64 p-8">
                    <AdminHeader title="Dashboard" description="Vue d'ensemble de votre activité" />

                    <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.title}>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <stat.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div
                                                className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-500"
                                                    }`}
                                            >
                                                {stat.trend === "up" ? (
                                                    <ArrowUpRight className="w-4 h-4" />
                                                ) : (
                                                    <ArrowDownRight className="w-4 h-4" />
                                                )}
                                                {stat.change}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div ref={card1Ref}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-primary" />
                                        Activité récente
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-3 border-b border-border last:border-0"
                                            >
                                                <div>
                                                    <p className="font-medium text-foreground">{activity.action}</p>
                                                    <p className="text-sm text-muted-foreground">{activity.project}</p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div ref={card2Ref}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FolderKanban className="w-5 h-5 text-primary" />
                                        Derniers projets
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {projects.slice(0, 4).map((project) => (
                                            <div
                                                key={project.slug}
                                                className="flex items-center gap-4 py-3 border-b border-border last:border-0"
                                            >
                                                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                                                    <img
                                                        src={project.image || "/placeholder.svg"}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-foreground truncate">{project.title}</p>
                                                    <p className="text-sm text-muted-foreground">{project.clientName}</p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{project.projectDate}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}
