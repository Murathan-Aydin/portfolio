import { MetadataRoute } from "next"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ma-dev.fr"

    // Pages statiques
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/projets`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/devis`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/politique-de-confidentialite`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cgv`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ]

    // Pages dynamiques (projets)
    let projectPages: MetadataRoute.Sitemap = []
    try {
        await connectDB()
        const projects = await Project.find({}).select("slug updatedAt").lean()

        projectPages = projects.map((project) => ({
            url: `${baseUrl}/projets/${project.slug}`,
            lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }))
    } catch (error) {
        console.error("Error fetching projects for sitemap:", error)
    }

    return [...staticPages, ...projectPages]
}

