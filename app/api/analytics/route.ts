import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import connectDB from "@/lib/mongodb"
import Analytics from "@/models/Analytics"

// Fonction pour déterminer le type d'appareil depuis user-agent
function getDeviceType(userAgent: string | null): "desktop" | "mobile" | "tablet" {
    if (!userAgent) return "desktop"
    const ua = userAgent.toLowerCase()
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet"
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile"
    }
    return "desktop"
}

// Fonction pour déterminer la source de trafic
function getTrafficSource(referrer: string | null): string {
    if (!referrer || referrer === "") return "Direct"
    try {
        const url = new URL(referrer)
        const hostname = url.hostname.toLowerCase()
        
        if (hostname.includes("google")) return "Google"
        if (hostname.includes("bing") || hostname.includes("yahoo")) return "Recherche"
        if (hostname.includes("facebook") || hostname.includes("twitter") || hostname.includes("linkedin") || hostname.includes("instagram")) {
            return "Social"
        }
        return "Référent"
    } catch {
        return "Direct"
    }
}

// Calculer la période de date
function getDateRange(period: string): { start: Date; end: Date } {
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    const start = new Date()

    switch (period) {
        case "week":
            start.setDate(end.getDate() - 7)
            break
        case "month":
            start.setDate(end.getDate() - 30)
            break
        case "quarter":
            start.setMonth(end.getMonth() - 3)
            break
        case "year":
            start.setFullYear(end.getFullYear() - 1)
            break
        default:
            start.setDate(end.getDate() - 30)
    }

    start.setHours(0, 0, 0, 0)
    return { start, end }
}

// GET - Récupérer les statistiques analytics
export async function GET(request: NextRequest) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
        }

        await connectDB()

        const { searchParams } = new URL(request.url)
        const period = searchParams.get("period") || "month"

        const { start, end } = getDateRange(period)

        // Récupérer toutes les données analytics dans la période
        const analyticsData = await Analytics.find({
            date: { $gte: start, $lte: end },
        }).sort({ date: 1 })

        if (analyticsData.length === 0) {
            // Retourner des données vides si aucune donnée
            return NextResponse.json({
                success: true,
                data: {
                    stats: {
                        uniqueVisitors: 0,
                        pageViews: 0,
                        averageDuration: "0m 0s",
                        bounceRate: "0%",
                    },
                    visitorsData: [],
                    topPages: [],
                    deviceData: [],
                    sourceData: [],
                },
            })
        }

        // Calculer les statistiques principales
        const uniqueVisitors = new Set(analyticsData.map((a) => a.visitorId).filter(Boolean)).size
        const pageViews = analyticsData.length

        // Calculer la durée moyenne (en secondes)
        const durations = analyticsData.map((a) => a.duration || 0).filter((d) => d > 0)
        const averageDurationSeconds = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0
        const minutes = Math.floor(averageDurationSeconds / 60)
        const seconds = Math.floor(averageDurationSeconds % 60)
        const averageDuration = `${minutes}m ${seconds}s`

        // Calculer le taux de rebond (visiteurs avec une seule page vue)
        const visitorPageCounts = new Map<string, number>()
        analyticsData.forEach((a) => {
            if (a.visitorId) {
                visitorPageCounts.set(a.visitorId, (visitorPageCounts.get(a.visitorId) || 0) + 1)
            }
        })
        const singlePageVisitors = Array.from(visitorPageCounts.values()).filter((count) => count === 1).length
        const totalVisitors = visitorPageCounts.size || 1
        const bounceRate = ((singlePageVisitors / totalVisitors) * 100).toFixed(1)

        // Grouper par date pour le graphique
        const visitorsByDate = new Map<string, { visitors: Set<string>; pageViews: number }>()
        analyticsData.forEach((a) => {
            const dateKey = a.date.toISOString().split("T")[0]
            if (!visitorsByDate.has(dateKey)) {
                visitorsByDate.set(dateKey, { visitors: new Set(), pageViews: 0 })
            }
            const dayData = visitorsByDate.get(dateKey)!
            if (a.visitorId) {
                dayData.visitors.add(a.visitorId)
            }
            dayData.pageViews++
        })

        // Formater les données pour le graphique (prendre un échantillon de dates)
        const sortedDates = Array.from(visitorsByDate.keys()).sort()
        const sampleSize = Math.min(10, sortedDates.length) // Maximum 10 points
        const step = Math.max(1, Math.floor(sortedDates.length / sampleSize))
        const visitorsData = sortedDates
            .filter((_, index) => index % step === 0 || index === sortedDates.length - 1)
            .map((dateKey) => {
                const dayData = visitorsByDate.get(dateKey)!
                const date = new Date(dateKey)
                return {
                    date: `${date.getDate()} ${date.toLocaleDateString("fr-FR", { month: "short" })}`,
                    visitors: dayData.visitors.size,
                    pageViews: dayData.pageViews,
                }
            })

        // Pages les plus vues
        const pageViewsCount = new Map<string, number>()
        analyticsData.forEach((a) => {
            const path = a.path || "/"
            pageViewsCount.set(path, (pageViewsCount.get(path) || 0) + 1)
        })

        const topPages = Array.from(pageViewsCount.entries())
            .map(([path, views]) => {
                let pageName = path
                if (path === "/") {
                    pageName = "Accueil"
                } else {
                    const pathParts = path.split("/").filter(Boolean)
                    const lastPart = pathParts[pathParts.length - 1]
                    if (lastPart) {
                        pageName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
                    }
                }
                return {
                    page: pageName,
                    views,
                    percentage: Math.round((views / pageViews) * 100),
                }
            })
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)

        // Données des appareils
        const deviceCounts = new Map<string, number>()
        analyticsData.forEach((a) => {
            const device = a.device || getDeviceType(a.userAgent || null)
            deviceCounts.set(device, (deviceCounts.get(device) || 0) + 1)
        })

        const deviceData = [
            { name: "Desktop", value: Math.round(((deviceCounts.get("desktop") || 0) / pageViews) * 100), color: "#40c9a2" },
            { name: "Mobile", value: Math.round(((deviceCounts.get("mobile") || 0) / pageViews) * 100), color: "#a3f7b5" },
            { name: "Tablet", value: Math.round(((deviceCounts.get("tablet") || 0) / pageViews) * 100), color: "#e5f9e0" },
        ].filter((d) => d.value > 0)

        // Sources de trafic
        const sourceCounts = new Map<string, number>()
        analyticsData.forEach((a) => {
            const source = getTrafficSource(a.referrer || null)
            sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1)
        })

        const sourceData = Array.from(sourceCounts.entries())
            .map(([source, visitors]) => ({
                source,
                visitors,
            }))
            .sort((a, b) => b.visitors - a.visitors)

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    uniqueVisitors,
                    pageViews,
                    averageDuration,
                    bounceRate: `${bounceRate}%`,
                },
                visitorsData,
                topPages,
                deviceData,
                sourceData,
            },
        })
    } catch (error: any) {
        console.error("Error fetching analytics:", error)
        return NextResponse.json({ success: false, error: "Erreur lors de la récupération des statistiques" }, { status: 500 })
    }
}

// POST - Enregistrer une visite (peut être appelé depuis le frontend)
export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { path, visitorId, sessionId, userAgent, referrer, duration } = body

        if (!path) {
            return NextResponse.json({ success: false, error: "Le chemin est requis" }, { status: 400 })
        }

        const device = getDeviceType(userAgent || null)

        const analytics = await Analytics.create({
            date: new Date(),
            path,
            visitorId,
            sessionId,
            userAgent,
            referrer,
            device,
            duration,
        })

        return NextResponse.json({ success: true, data: analytics }, { status: 201 })
    } catch (error: any) {
        console.error("Error saving analytics:", error)
        return NextResponse.json({ success: false, error: "Erreur lors de l'enregistrement" }, { status: 500 })
    }
}

