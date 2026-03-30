import { notFound } from "next/navigation"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"
import { ProjectDetailClient } from "./project-detail-client"

export async function generateStaticParams() {
    try {
        await connectDB()
        const projects = await Project.find({}).select("slug").lean()
        return projects.map((project) => ({
            slug: project.slug,
        }))
    } catch (error) {
        console.error("Error generating static params:", error)
        return []
    }
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ma-dev.fr"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params
        await connectDB()
        const project = await Project.findOne({ slug }).lean()

        if (!project) {
            return {
                title: { absolute: "Projet non trouvé | MA.DEV" },
            }
        }

        const imageUrl = project.image
            ? project.image.startsWith("/")
                ? `${BASE_URL}${project.image}`
                : project.image
            : undefined

        return {
            title: { absolute: `${project.title} — Portfolio MA.DEV` },
            description: project.description,
            alternates: { canonical: `${BASE_URL}/projets/${slug}` },
            openGraph: {
                title: `${project.title} — Portfolio MA.DEV`,
                description: project.description,
                url: `${BASE_URL}/projets/${slug}`,
                type: "article",
                ...(imageUrl && { images: [{ url: imageUrl }] }),
            },
        }
    } catch {
        return {
            title: { absolute: "Projet | MA.DEV" },
        }
    }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let projectData = null

    try {
        await connectDB()
        const project = await Project.findOne({ slug }).lean()
        if (project) {
            projectData = JSON.parse(JSON.stringify(project))
        }
    } catch (error) {
        console.error("Error fetching project:", error)
    }

    if (!projectData) {
        notFound()
    }

    const creativeWorkSchema = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: `${projectData!.title} — Site web`,
        url: `${BASE_URL}/projets/${projectData!.slug}`,
        author: { "@id": `${BASE_URL}/#person` },
        inLanguage: "fr-FR",
        about: {
            "@type": "LocalBusiness",
            name: projectData!.clientName,
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
            />
            <ProjectDetailClient project={projectData!} />
        </>
    )
}
