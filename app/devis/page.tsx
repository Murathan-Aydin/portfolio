import DevisClient from "./devis-client"

export const metadata = {
    title: { absolute: "Demander un Devis — Développeur Web Freelance à Mâcon" },
    description:
        "Décrivez votre projet web et recevez une proposition personnalisée sous 48h. Murathan Aydin, développeur full-stack freelance à Mâcon (71).",
    alternates: { canonical: "https://ma-dev.fr/devis" },
    openGraph: {
        title: "Demander un Devis — Développeur Web Freelance à Mâcon",
        description:
            "Décrivez votre projet web et recevez une proposition personnalisée sous 48h. Murathan Aydin, développeur full-stack freelance à Mâcon (71).",
        url: "https://ma-dev.fr/devis",
        type: "website",
    },
}

export default function DevisPage() {
    return <DevisClient />
}
