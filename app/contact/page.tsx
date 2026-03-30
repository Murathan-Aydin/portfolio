import { config } from "@/lib/config"
import ContactClient from "./contact-client"

export const metadata = {
    title: { absolute: "Contact — Développeur Web Freelance à Mâcon" },
    description:
        "Contactez Murathan Aydin, développeur web freelance à Mâcon. Réponse sous 24h pour tout projet web.",
    alternates: { canonical: "https://ma-dev.fr/contact" },
    openGraph: {
        title: "Contact — Développeur Web Freelance à Mâcon",
        description:
            "Contactez Murathan Aydin, développeur web freelance à Mâcon. Réponse sous 24h pour tout projet web.",
        url: "https://ma-dev.fr/contact",
        type: "website",
    },
}

export default function ContactPage() {
    return (
        <ContactClient
            email={config.email}
            phone={config.phone}
            phoneDisplay={config.phoneDisplay}
        />
    )
}
