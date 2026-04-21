import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

// GET - Récupérer un projet par son slug
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await connectDB()
        const { slug } = await params

        const project = await Project.findOne({ slug })

        if (!project) {
            return NextResponse.json({ success: false, error: "Projet non trouvé" }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: project }, { status: 200 })
    } catch (error) {
        console.error("Error fetching project:", error)
        return NextResponse.json({ success: false, error: "Erreur lors de la récupération du projet" }, { status: 500 })
    }
}

// PUT - Mettre à jour un projet
export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
        }

        await connectDB()
        const { slug } = await params

        const body = await request.json()
        const { title, description, longDescription, tags, image, gallery, clientName, projectDate, projectUrl, downloadUrl, features, slug: newSlug } = body

        // Si le slug change, vérifier qu'il n'existe pas déjà
        if (newSlug && newSlug !== slug) {
            const existingProject = await Project.findOne({ slug: newSlug })
            if (existingProject) {
                return NextResponse.json({ success: false, error: "Un projet avec ce slug existe déjà" }, { status: 400 })
            }
        }

        // Utiliser une image par défaut si aucune n'est fournie
        const projectImage = image && image.trim() !== "" ? image : "/placeholder.svg"

        const project = await Project.findOneAndUpdate(
            { slug },
            {
                ...(newSlug && { slug: newSlug }),
                title,
                description,
                longDescription,
                tags: tags || [],
                image: projectImage,
                gallery: gallery || [],
                clientName,
                projectDate,
                projectUrl: projectUrl || "",
                downloadUrl: downloadUrl || "",
                features: features || [],
            },
            { new: true, runValidators: true }
        )

        if (!project) {
            return NextResponse.json({ success: false, error: "Projet non trouvé" }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: project }, { status: 200 })
    } catch (error) {
        console.error("Error updating project:", error)
        if ((error as { code?: number }).code === 11000) {
            return NextResponse.json({ success: false, error: "Un projet avec ce slug existe déjà" }, { status: 400 })
        }
        return NextResponse.json({ success: false, error: "Erreur lors de la mise à jour du projet" }, { status: 500 })
    }
}

// DELETE - Supprimer un projet
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
        }

        await connectDB()
        const { slug } = await params

        const project = await Project.findOneAndDelete({ slug })

        if (!project) {
            return NextResponse.json({ success: false, error: "Projet non trouvé" }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: "Projet supprimé avec succès" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting project:", error)
        return NextResponse.json({ success: false, error: "Erreur lors de la suppression du projet" }, { status: 500 })
    }
}

