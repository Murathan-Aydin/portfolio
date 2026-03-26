import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { checkRateLimit } from "@/lib/rate-limit"

const escapeHtml = (s: string): string =>
    s.replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#039;")

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
        if (!checkRateLimit(`contact:${ip}`, 5, 60_000)) {
            return NextResponse.json(
                { success: false, error: "Trop de requêtes. Veuillez patienter avant de réessayer." },
                { status: 429 }
            )
        }

        const body = await request.json()
        const { name, email, subject, message } = body

        // Validation des champs
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ success: false, error: "Tous les champs sont requis" }, { status: 400 })
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ success: false, error: "Adresse email invalide" }, { status: 400 })
        }

        // Configuration du transporteur SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_PORT === "465", // true pour 465, false pour les autres ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        // Email pour vous (notification)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.SMTP_TO,
            replyTo: email,
            subject: `[Contact Portfolio] ${subject}`,
            html: `
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
                <p><strong>Email :</strong> ${escapeHtml(email)}</p>
                <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
                <hr>
                <p><strong>Message :</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            `,
            text: `
Nouveau message de contact

Nom : ${name}
Email : ${email}
Sujet : ${subject}

Message :
${message}
            `,
        }

        // Envoi de l'email
        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { success: true, message: "Votre message a été envoyé avec succès. Je vous recontacterai sous 24h." },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            { success: false, error: "Erreur lors de l'envoi du message. Veuillez réessayer plus tard." },
            { status: 500 }
        )
    }
}

