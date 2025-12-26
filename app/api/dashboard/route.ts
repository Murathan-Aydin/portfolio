import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"
import Analytics from "@/models/Analytics"

// Fonction pour formater le temps relatif
function getRelativeTime(date: Date): string {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
        return "À l'instant"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
        return `Il y a ${diffInMinutes}min`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
        return `Il y a ${diffInHours}h`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
        return `Il y a ${diffInDays}j`
    }

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) {
        return `Il y a ${diffInWeeks} sem`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    return `Il y a ${diffInMonths} mois`
}

// GET - Récupérer les statistiques du dashboard
export async function GET(request: NextRequest) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
        }

        await connectDB()

        // Calculer la date de début du mois en cours
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        startOfMonth.setHours(0, 0, 0, 0)

        // Récupérer le nombre de projets
        const totalProjects = await Project.countDocuments()

        // Récupérer les projets du mois précédent pour calculer la variation
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
        const projectsLastMonth = await Project.countDocuments({
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        })
        const projectsThisMonth = await Project.countDocuments({
            createdAt: { $gte: startOfMonth },
        })
        const projectsChange = projectsThisMonth - projectsLastMonth

        // Récupérer les statistiques analytics du mois en cours
        const analyticsThisMonth = await Analytics.find({
            date: { $gte: startOfMonth },
        })

        const uniqueVisitors = new Set(analyticsThisMonth.map((a) => a.visitorId).filter(Boolean)).size
        const pageViews = analyticsThisMonth.length

        // Récupérer les statistiques du mois précédent pour calculer les variations
        const analyticsLastMonth = await Analytics.find({
            date: { $gte: startOfLastMonth, $lte: endOfLastMonth },
        })

        const uniqueVisitorsLastMonth = new Set(analyticsLastMonth.map((a) => a.visitorId).filter(Boolean)).size
        const pageViewsLastMonth = analyticsLastMonth.length

        // Calculer les variations en pourcentage
        const visitorsChangeNum =
            uniqueVisitorsLastMonth > 0
                ? ((uniqueVisitors - uniqueVisitorsLastMonth) / uniqueVisitorsLastMonth) * 100
                : 0
        const pageViewsChangeNum =
            pageViewsLastMonth > 0 ? ((pageViews - pageViewsLastMonth) / pageViewsLastMonth) * 100 : 0

        const visitorsChange = visitorsChangeNum.toFixed(1)
        const pageViewsChange = pageViewsChangeNum.toFixed(1)

        // Récupérer les derniers projets
        const latestProjects = await Project.find()
            .sort({ createdAt: -1 })
            .limit(4)
            .select("title clientName projectDate image slug")
            .lean()

        // Récupérer l'activité récente
        const recentProjects = await Project.find()
            .sort({ updatedAt: -1 })
            .limit(5)
            .select("title clientName createdAt updatedAt")
            .lean()

        const recentActivity: Array<{ action: string; project: string; time: string }> = []

        // Ajouter les projets récemment créés/modifiés
        recentProjects.forEach((project) => {
            const createdTime = getRelativeTime(new Date(project.createdAt || new Date()))
            const updatedTime = getRelativeTime(new Date(project.updatedAt || new Date()))

            // Si créé récemment (moins de 7 jours)
            if (project.createdAt && new Date(project.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000) {
                recentActivity.push({
                    action: "Nouveau projet ajouté",
                    project: project.title,
                    time: createdTime,
                })
            }
            // Si modifié récemment (et pas créé récemment)
            else if (
                project.updatedAt &&
                new Date(project.updatedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 &&
                project.createdAt &&
                new Date(project.updatedAt).getTime() !== new Date(project.createdAt).getTime()
            ) {
                recentActivity.push({
                    action: "Projet modifié",
                    project: project.title,
                    time: updatedTime,
                })
            }
        })

        // Ajouter les nouveaux visiteurs uniques récents
        const recentVisitors = await Analytics.find({
            date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            visitorId: { $exists: true, $ne: null },
        })
            .sort({ date: -1 })
            .limit(10)
            .select("date visitorId")
            .lean()

        // Grouper par visiteur unique et prendre le plus récent
        const uniqueRecentVisitors = new Map<string, Date>()
        recentVisitors.forEach((visitor) => {
            if (visitor.visitorId) {
                const existing = uniqueRecentVisitors.get(visitor.visitorId)
                if (!existing || new Date(visitor.date) > existing) {
                    uniqueRecentVisitors.set(visitor.visitorId, new Date(visitor.date))
                }
            }
        })

        // Ajouter les nouveaux visiteurs à l'activité récente
        Array.from(uniqueRecentVisitors.entries())
            .slice(0, 2)
            .forEach(([_, date]) => {
                recentActivity.push({
                    action: "Nouveau visiteur unique",
                    project: "-",
                    time: getRelativeTime(date),
                })
            })

        // Trier l'activité récente par date (plus récent en premier)
        recentActivity.sort((a, b) => {
            // Extraire les valeurs numériques pour le tri
            const getTimeValue = (timeStr: string): number => {
                if (timeStr.includes("min")) return parseInt(timeStr) || 0
                if (timeStr.includes("h")) return parseInt(timeStr) * 60 || 0
                if (timeStr.includes("j")) return parseInt(timeStr) * 60 * 24 || 0
                if (timeStr.includes("sem")) return parseInt(timeStr) * 60 * 24 * 7 || 0
                return 0
            }
            return getTimeValue(b.time) - getTimeValue(a.time)
        })

        // Limiter à 4 activités les plus récentes
        const limitedRecentActivity = recentActivity.slice(0, 4)

        // Pour les demandes de devis, on utilise une valeur par défaut pour l'instant
        // TODO: Créer un modèle Devis si nécessaire
        const devisRequests = 0
        const devisChange = 0

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    projects: {
                        value: totalProjects,
                        change: projectsChange > 0 ? `+${projectsChange}` : projectsChange.toString(),
                        trend: projectsChange >= 0 ? "up" : "down",
                    },
                    visitors: {
                        value: uniqueVisitors.toLocaleString("fr-FR"),
                        change: `${visitorsChangeNum >= 0 ? "+" : ""}${visitorsChange}%`,
                        trend: visitorsChangeNum >= 0 ? "up" : "down",
                    },
                    pageViews: {
                        value: pageViews.toLocaleString("fr-FR"),
                        change: `${pageViewsChangeNum >= 0 ? "+" : ""}${pageViewsChange}%`,
                        trend: pageViewsChangeNum >= 0 ? "up" : "down",
                    },
                    devis: {
                        value: devisRequests.toString(),
                        change: devisChange > 0 ? `+${devisChange}` : devisChange.toString(),
                        trend: devisChange >= 0 ? "up" : "down",
                    },
                },
                recentActivity: limitedRecentActivity,
                latestProjects: latestProjects.map((p) => ({
                    title: p.title,
                    clientName: p.clientName,
                    projectDate: p.projectDate,
                    image: p.image,
                    slug: p.slug,
                })),
            },
        })
    } catch (error: any) {
        console.error("Error fetching dashboard data:", error)
        return NextResponse.json({ success: false, error: "Erreur lors de la récupération des données" }, { status: 500 })
    }
}

