import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import sharp from "sharp"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
    try {
        // Vérifier l'authentification
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ success: false, error: "Aucun fichier fourni" }, { status: 400 })
        }

        // Vérifier que c'est une image
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ success: false, error: "Le fichier doit être une image" }, { status: 400 })
        }

        // Lire le fichier
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Convertir en WebP avec sharp
        const webpBuffer = await sharp(buffer)
            .webp({ quality: 85, effort: 6 })
            .resize(1920, 1080, {
                fit: "inside",
                withoutEnlargement: true,
            })
            .toBuffer()

        // Générer un nom de fichier unique
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const filename = `${timestamp}-${randomString}.webp`

        // Créer le dossier uploads s'il n'existe pas
        const uploadsDir = join(process.cwd(), "public", "uploads")
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true })
        }

        // Sauvegarder le fichier
        const filepath = join(uploadsDir, filename)
        await writeFile(filepath, webpBuffer)

        // Retourner l'URL de l'image
        const imageUrl = `/uploads/${filename}`

        return NextResponse.json({
            success: true,
            url: imageUrl,
            filename: filename,
            size: webpBuffer.length,
        })
    } catch (error: any) {
        console.error("Error uploading image:", error)
        return NextResponse.json(
            { success: false, error: error.message || "Erreur lors de l'upload de l'image" },
            { status: 500 }
        )
    }
}

