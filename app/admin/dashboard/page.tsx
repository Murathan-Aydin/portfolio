"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { FolderKanban, Users, Eye, TrendingUp, FileText, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProtectedRoute } from "@/components/admin/protected-route"
import Link from "next/link"

interface DashboardData {
    stats: {
        projects: { value: number; change: string; trend: "up" | "down" }
        visitors: { value: string; change: string; trend: "up" | "down" }
        pageViews: { value: string; change: string; trend: "up" | "down" }
        devis: { value: string; change: string; trend: "up" | "down" }
    }
    recentActivity: Array<{ action: string; project: string; time: string }>
    latestProjects: Array<{ title: string; clientName: string; projectDate: string; image: string; slug: string }>
}

export default function AdminDashboardPage() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const card1Ref = useRef<HTMLDivElement>(null)
    const card2Ref = useRef<HTMLDivElement>(null)

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch("/api/dashboard")
                const result = await response.json()

                if (!response.ok || !result.success) {
                    throw new Error(result.error || "Erreur lors de la récupération des données")
                }

                setDashboardData(result.data)
            } catch (err: any) {
                console.error("Error fetching dashboard data:", err)
                setError(err.message || "Erreur lors du chargement des données")
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    useEffect(() => {
        if (dashboardData && statsRef.current) {
            const cards = statsRef.current.children
            gsap.fromTo(
                Array.from(cards),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
            )
        }
    }, [dashboardData])

    useEffect(() => {
        if (dashboardData) {
            if (card1Ref.current) {
                gsap.fromTo(card1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 })
            }
            if (card2Ref.current) {
                gsap.fromTo(card2Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 })
            }
        }
    }, [dashboardData])

    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-background">
                    <main className="ml-64 p-8">
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                                <p className="text-muted-foreground">Chargement du dashboard...</p>
                            </div>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        )
    }

    if (error || !dashboardData) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-background">
                    <main className="ml-64 p-8">
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <p className="text-destructive mb-4">{error || "Aucune donnée disponible"}</p>
                            </div>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        )
    }

    const stats = [
        {
            title: "Projets",
            value: dashboardData.stats.projects.value,
            change: dashboardData.stats.projects.change,
            trend: dashboardData.stats.projects.trend,
            icon: FolderKanban,
        },
        {
            title: "Visiteurs ce mois",
            value: dashboardData.stats.visitors.value,
            change: dashboardData.stats.visitors.change,
            trend: dashboardData.stats.visitors.trend,
            icon: Users,
        },
        {
            title: "Pages vues",
            value: dashboardData.stats.pageViews.value,
            change: dashboardData.stats.pageViews.change,
            trend: dashboardData.stats.pageViews.trend,
            icon: Eye,
        },
        {
            title: "Demandes de devis",
            value: dashboardData.stats.devis.value,
            change: dashboardData.stats.devis.change,
            trend: dashboardData.stats.devis.trend,
            icon: FileText,
        },
    ]

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
                                    {dashboardData.recentActivity.length > 0 ? (
                                        <div className="space-y-4">
                                            {dashboardData.recentActivity.map((activity, index) => (
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
                                    ) : (
                                        <div className="text-center text-muted-foreground py-8">Aucune activité récente</div>
                                    )}
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
                                    {dashboardData.latestProjects.length > 0 ? (
                                        <div className="space-y-4">
                                            {dashboardData.latestProjects.map((project) => (
                                                <Link
                                                    key={project.slug}
                                                    href={`/admin/projets/${project.slug}/edit`}
                                                    className="flex items-center gap-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors rounded-lg px-2 -mx-2"
                                                >
                                                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
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
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{project.projectDate}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted-foreground py-8">Aucun projet disponible</div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}
