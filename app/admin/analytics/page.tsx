"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Users, Eye, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Globe, Monitor, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProtectedRoute } from "@/components/admin/protected-route"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AnalyticsData {
    stats: {
        uniqueVisitors: number
        pageViews: number
        averageDuration: string
        bounceRate: string
    }
    visitorsData: Array<{ date: string; visitors: number; pageViews: number }>
    topPages: Array<{ page: string; views: number; percentage: number }>
    deviceData: Array<{ name: string; value: number; color: string }>
    sourceData: Array<{ source: string; visitors: number }>
}

export default function AdminAnalyticsPage() {
    const [period, setPeriod] = useState("month")
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const chart1Ref = useRef<HTMLDivElement>(null)
    const chart2Ref = useRef<HTMLDivElement>(null)
    const chart3Ref = useRef<HTMLDivElement>(null)
    const chart4Ref = useRef<HTMLDivElement>(null)

    // Fetch analytics data
    useEffect(() => {
        const fetchAnalytics = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(`/api/analytics?period=${period}`)
                const result = await response.json()

                if (!response.ok || !result.success) {
                    throw new Error(result.error || "Erreur lors de la récupération des données")
                }

                setAnalyticsData(result.data)
            } catch (err: any) {
                console.error("Error fetching analytics:", err)
                setError(err.message || "Erreur lors du chargement des données")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAnalytics()
    }, [period])

    useEffect(() => {
        if (analyticsData && statsRef.current) {
            const cards = statsRef.current.children
            gsap.fromTo(
                Array.from(cards),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
            )
        }
    }, [analyticsData])

    useEffect(() => {
        if (analyticsData) {
            const refs = [chart1Ref, chart2Ref, chart3Ref, chart4Ref]
            refs.forEach((ref, index) => {
                if (ref.current) {
                    gsap.fromTo(
                        ref.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, delay: 0.4 + index * 0.1 }
                    )
                }
            })
        }
    }, [analyticsData])

    // Format stats for display
    const stats = analyticsData
        ? [
              {
                  title: "Visiteurs uniques",
                  value: analyticsData.stats.uniqueVisitors.toLocaleString("fr-FR"),
                  change: "+0%", // TODO: Calculer la variation par rapport à la période précédente
                  trend: "up" as const,
                  icon: Users,
              },
              {
                  title: "Pages vues",
                  value: analyticsData.stats.pageViews.toLocaleString("fr-FR"),
                  change: "+0%", // TODO: Calculer la variation
                  trend: "up" as const,
                  icon: Eye,
              },
              {
                  title: "Durée moyenne",
                  value: analyticsData.stats.averageDuration,
                  change: "+0%", // TODO: Calculer la variation
                  trend: "up" as const,
                  icon: Clock,
              },
              {
                  title: "Taux de rebond",
                  value: analyticsData.stats.bounceRate,
                  change: "-0%", // TODO: Calculer la variation
                  trend: "up" as const,
                  icon: TrendingUp,
              },
          ]
        : []

    if (isLoading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-background">
                    <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                                <p className="text-muted-foreground">Chargement des statistiques...</p>
                            </div>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        )
    }

    if (error || !analyticsData) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-background">
                    <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <p className="text-destructive mb-4">{error || "Aucune donnée disponible"}</p>
                                <p className="text-sm text-muted-foreground">
                                    Les données analytics seront disponibles une fois que des visites auront été enregistrées.
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </ProtectedRoute>
        )
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                    <div className="flex items-center justify-between mb-6">
                        <AdminHeader title="Analytics" description="Statistiques de votre site web" />
                        <Select value={period} onValueChange={setPeriod}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="week">7 derniers jours</SelectItem>
                                <SelectItem value="month">30 derniers jours</SelectItem>
                                <SelectItem value="quarter">3 derniers mois</SelectItem>
                                <SelectItem value="year">12 derniers mois</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

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
                                                className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-primary" : "text-red-500"
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div ref={chart1Ref} className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-primary" />
                                        Visiteurs et pages vues
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {analyticsData.visitorsData.length > 0 ? (
                                        <ChartContainer
                                            config={{
                                                visitors: {
                                                    label: "Visiteurs",
                                                    color: "#0BBAE6",
                                                },
                                                pageViews: {
                                                    label: "Pages vues",
                                                    color: "#5dd5f5",
                                                },
                                            }}
                                            className="h-[300px]"
                                        >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={analyticsData.visitorsData}>
                                                    <defs>
                                                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#0BBAE6" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#0BBAE6" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#5dd5f5" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#5dd5f5" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                                                    <YAxis stroke="#6b7280" fontSize={12} />
                                                    <ChartTooltip content={<ChartTooltipContent />} />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="visitors"
                                                        stroke="#0BBAE6"
                                                        fillOpacity={1}
                                                        fill="url(#colorVisitors)"
                                                        strokeWidth={2}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="pageViews"
                                                        stroke="#5dd5f5"
                                                        fillOpacity={1}
                                                        fill="url(#colorPageViews)"
                                                        strokeWidth={2}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </ChartContainer>
                                    ) : (
                                        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                            Aucune donnée disponible pour cette période
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div ref={chart2Ref}>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Monitor className="w-5 h-5 text-primary" />
                                        Appareils
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {analyticsData.deviceData.length > 0 ? (
                                        <>
                                            <div className="h-[200px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={analyticsData.deviceData}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={50}
                                                            outerRadius={80}
                                                            paddingAngle={2}
                                                            dataKey="value"
                                                        >
                                                            {analyticsData.deviceData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <div className="flex justify-center gap-4 mt-4 flex-wrap">
                                                {analyticsData.deviceData.map((device) => (
                                                    <div key={device.name} className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                                                        <span className="text-sm text-muted-foreground">
                                                            {device.name} ({device.value}%)
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                                            Aucune donnée disponible
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div ref={chart3Ref}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-primary" />
                                        Pages les plus vues
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {analyticsData.topPages.length > 0 ? (
                                        <div className="space-y-4">
                                            {analyticsData.topPages.map((page) => (
                                                <div key={page.page} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium text-foreground">{page.page}</span>
                                                        <span className="text-sm text-muted-foreground">{page.views.toLocaleString("fr-FR")} vues</span>
                                                    </div>
                                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary rounded-full"
                                                            style={{ width: `${page.percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted-foreground py-8">Aucune donnée disponible</div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div ref={chart4Ref}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-primary" />
                                        Sources de trafic
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {analyticsData.sourceData.length > 0 ? (
                                        <ChartContainer
                                            config={{
                                                visitors: {
                                                    label: "Visiteurs",
                                                    color: "#0BBAE6",
                                                },
                                            }}
                                            className="h-[250px]"
                                        >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={analyticsData.sourceData} layout="vertical">
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                    <XAxis type="number" stroke="#6b7280" fontSize={12} />
                                                    <YAxis dataKey="source" type="category" stroke="#6b7280" fontSize={12} width={80} />
                                                    <ChartTooltip content={<ChartTooltipContent />} />
                                                    <Bar dataKey="visitors" fill="#0BBAE6" radius={[0, 4, 4, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </ChartContainer>
                                    ) : (
                                        <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                                            Aucune donnée disponible
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {analyticsData.stats.pageViews === 0 && (
                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground text-center">
                                Aucune donnée analytics disponible. Les statistiques apparaîtront automatiquement une fois que des visites auront été enregistrées.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    )
}
