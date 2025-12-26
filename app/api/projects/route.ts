import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

// GET - Récupérer tous les projets
export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const projects = await Project.find({}).sort({ createdAt: -1 })

        return NextResponse.json({ success: true, data: projects }, { status: 200 })
    } catch (error) {
        console.error("Error fetching projects:", error)
        return NextResponse.json({ success: false, error: "Erreur lors de la récupération des projets" }, { status: 500 })
    }
}

// POST - Créer un nouveau projet
export async function POST(request: NextRequest) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
        }

        await connectDB()

        const body = await request.json()
        const { slug, title, description, longDescription, tags, image, gallery, clientName, projectDate, projectUrl, features } = body

        // Validation des champs requis
        if (!slug || !title || !description || !longDescription || !clientName || !projectDate) {
            return NextResponse.json({ success: false, error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
        }

        // Vérifier si le slug existe déjà
        const existingProject = await Project.findOne({ slug })
        if (existingProject) {
            return NextResponse.json({ success: false, error: "Un projet avec ce slug existe déjà" }, { status: 400 })
        }

        // Utiliser une image par défaut si aucune n'est fournie
        const projectImage = image && image.trim() !== "" ? image : "/placeholder.svg"

        const project = await Project.create({
            slug,
            title,
            description,
            longDescription,
            tags: tags || [],
            image: projectImage,
            gallery: gallery || [],
            clientName,
            projectDate,
            projectUrl: projectUrl || "",
            features: features || [],
        })

        return NextResponse.json({ success: true, data: project }, { status: 201 })
    } catch (error: any) {
        console.error("Error creating project:", error)
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: "Un projet avec ce slug existe déjà" }, { status: 400 })
        }
        return NextResponse.json({ success: false, error: "Erreur lors de la création du projet" }, { status: 500 })
    }
}

