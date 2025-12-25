import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data"
import { ProjectDetailClient } from "./project-detail-client"

export async function generateStaticParams() {
    const projects = getAllProjects()
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        return {
            title: "Projet non trouvé | MA.DEV",
        }
    }

    return {
        title: `${project.title} | MA.DEV`,
        description: project.description,
    }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return <ProjectDetailClient project={project} />
}
