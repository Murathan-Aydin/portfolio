import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Mapping des budgets pour l'affichage dans l'email
const budgetRanges = [
    { id: "less-2k", label: "Moins de 2 000 €" },
    { id: "2k-5k", label: "2 000 € - 5 000 €" },
    { id: "5k-10k", label: "5 000 € - 10 000 €" },
    { id: "more-10k", label: "Plus de 10 000 €" },
]

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            projectType,
            services,
            budget,
            projectDescription,
            deadline,
            references,
        } = body

        // Validation des champs requis
        if (!firstName || !lastName || !email || !projectDescription) {
            return NextResponse.json({ success: false, error: "Les champs obligatoires doivent être remplis" }, { status: 400 })
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

        // Préparer le contenu de l'email
        const projectTypeLabels: Record<string, string> = {
            "site-vitrine": "Site vitrine",
            "e-commerce": "E-commerce",
            "application-web": "Application web",
            "refonte": "Refonte de site",
            "autre": "Autre",
        }

        const serviceLabels: Record<string, string> = {
            developpement: "Développement web",
            seo: "Optimisation SEO",
            maintenance: "Maintenance",
            hebergement: "Hébergement",
        }

        const servicesList =
            services && services.length > 0
                ? services.map((s: string) => serviceLabels[s] || s).join(", ")
                : "Aucun service sélectionné"
        const budgetLabel = budgetRanges.find((b) => b.id === budget)?.label || budget || "Non spécifié"
        const projectTypeLabel = projectTypeLabels[projectType] || projectType || "Non spécifié"

        // Email pour vous (notification)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.SMTP_TO,
            replyTo: email,
            subject: `[Devis] Nouvelle demande de ${firstName} ${lastName}`,
            html: `
                <h2>Nouvelle demande de devis</h2>
                
                <h3>Coordonnées</h3>
                <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
                <p><strong>Email :</strong> ${email}</p>
                ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
                ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ""}
                
                <h3>Projet</h3>
                <p><strong>Type de projet :</strong> ${projectTypeLabel}</p>
                <p><strong>Services souhaités :</strong> ${servicesList}</p>
                <p><strong>Budget estimé :</strong> ${budgetLabel}</p>
                ${deadline ? `<p><strong>Délai souhaité :</strong> ${deadline}</p>` : ""}
                
                <h3>Description</h3>
                <p>${projectDescription.replace(/\n/g, "<br>")}</p>
                
                ${references ? `<h3>Sites de référence</h3><p>${references.replace(/\n/g, "<br>")}</p>` : ""}
            `,
            text: `
Nouvelle demande de devis

Coordonnées :
Nom : ${firstName} ${lastName}
Email : ${email}
${phone ? `Téléphone : ${phone}` : ""}
${company ? `Entreprise : ${company}` : ""}

Projet :
Type de projet : ${projectTypeLabel}
Services souhaités : ${servicesList}
Budget estimé : ${budgetLabel}
${deadline ? `Délai souhaité : ${deadline}` : ""}

Description :
${projectDescription}

${references ? `Sites de référence :\n${references}` : ""}
            `,
        }

        // Envoi de l'email
        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { success: true, message: "Votre demande de devis a été envoyée avec succès. Je vous recontacterai sous 48h." },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error sending email:", error)
        return NextResponse.json(
            { success: false, error: "Erreur lors de l'envoi de la demande. Veuillez réessayer plus tard." },
            { status: 500 }
        )
    }
}

