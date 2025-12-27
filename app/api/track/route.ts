import { NextRequest, NextResponse } from "next/server"

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.m-aydin.fr"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Faire le proxy vers l'API externe
        const response = await fetch(`${EXTERNAL_API_URL}/api/track`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        // Si l'API externe répond avec succès, retourner la réponse
        if (response.ok) {
            const data = await response.json().catch(() => ({}))
            return NextResponse.json(data, { status: response.status })
        }

        // Si l'API externe retourne une erreur, la logger mais ne pas faire échouer la requête
        // (pour éviter que les erreurs côté API externe impactent l'expérience utilisateur)
        console.error("External API error:", response.status, response.statusText)
        return NextResponse.json({ success: false }, { status: 200 })
    } catch (error) {
        // En cas d'erreur réseau ou autre, logger mais ne pas faire échouer
        console.error("Error proxying to external API:", error)
        return NextResponse.json({ success: false }, { status: 200 })
    }
}

