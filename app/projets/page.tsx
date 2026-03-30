import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"
import type { Project as ProjectType } from "@/lib/types"
import ProjectsClient from "./projets-client"

export const metadata = {
    title: { absolute: "Projets Web à Mâcon — Portfolio Murathan Aydin" },
    description:
        "Découvrez les réalisations web de Murathan Aydin : sites vitrine, applications React/Next.js, projets locaux à Mâcon et en Bourgogne.",
    alternates: { canonical: "https://ma-dev.fr/projets" },
    openGraph: {
        title: "Projets Web à Mâcon — Portfolio Murathan Aydin",
        description:
            "Découvrez les réalisations web de Murathan Aydin : sites vitrine, applications React/Next.js, projets locaux à Mâcon et en Bourgogne.",
        url: "https://ma-dev.fr/projets",
        type: "website",
    },
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ma-dev.fr"

export default async function ProjetsPage() {
    let projects: ProjectType[] = []

    try {
        await connectDB()
        const raw = await Project.find({})
            .select("slug title description tags image clientName projectDate")
            .lean()
        projects = JSON.parse(JSON.stringify(raw))
    } catch (error) {
        console.error("Error fetching projects for page:", error)
    }

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Projets web — Murathan Aydin",
        url: `${BASE_URL}/projets`,
        itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            url: `${BASE_URL}/projets/${p.slug}`,
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <ProjectsClient initialProjects={projects} />
        </>
    )
}
