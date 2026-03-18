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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params
        await connectDB()
        const project = await Project.findOne({ slug }).lean()

        if (!project) {
            return {
                title: "Projet non trouvé | MA.DEV",
            }
        }

        return {
            title: `${project.title} | MA.DEV`,
            description: project.description,
        }
    } catch {
        return {
            title: "Projet | MA.DEV",
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

    return <ProjectDetailClient project={projectData!} />
}
