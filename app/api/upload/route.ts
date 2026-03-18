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

        // Créer le dossier images/projets s'il n'existe pas (volume Docker)
        const imagesDir = join(process.cwd(), "public", "images", "projets")
        if (!existsSync(imagesDir)) {
            try {
                await mkdir(imagesDir, { recursive: true, mode: 0o755 })
            } catch (mkdirError) {
                console.error("Error creating images directory:", mkdirError)
                // Si le dossier ne peut pas être créé, on essaie quand même d'écrire le fichier
                // (peut-être que le dossier existe mais existsSync a échoué)
            }
        }

        // Sauvegarder le fichier
        const filepath = join(imagesDir, filename)
        try {
            await writeFile(filepath, webpBuffer)

            // S'assurer que le fichier a les bonnes permissions (lecture pour tous)
            const { chmod } = await import("fs/promises")
            await chmod(filepath, 0o644).catch((err) => {
                console.warn("Could not set file permissions:", err)
            })
        } catch (writeError) {
            console.error("Error writing file:", writeError)
            // Vérifier si c'est un problème de permissions ou de dossier
            if ((writeError as { code?: string }).code === "ENOENT" || (writeError as { code?: string }).code === "EACCES") {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Erreur de permissions. Vérifiez que le dossier public/images/projets existe et est accessible.",
                    },
                    { status: 500 }
                )
            }
            throw writeError
        }

        // Retourner l'URL de l'image
        const imageUrl = `/images/projets/${filename}`

        return NextResponse.json({
            success: true,
            url: imageUrl,
            filename: filename,
            size: webpBuffer.length,
        })
    } catch (error) {
        console.error("Error uploading image:", error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Erreur lors de l'upload de l'image" },
            { status: 500 }
        )
    }
}

