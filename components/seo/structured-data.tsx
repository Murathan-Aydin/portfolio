import { config } from "@/lib/config"

export function StructuredData() {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ma-dev.fr")

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#business`,
        name: "MA.DEV — Murathan Aydin Développeur Freelance",
        legalName: config.businessName,
        description:
            "Développeur web freelance à Mâcon spécialisé dans la création de sites internet modernes et performants pour les entreprises locales. Services de développement web, création de sites vitrine, e-commerce et applications sur mesure en Saône-et-Loire.",
        url: baseUrl,
        telephone: config.phone,
        email: config.email,
        priceRange: "€€",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Mâcon",
            addressRegion: "Bourgogne-Franche-Comté",
            postalCode: "71000",
            addressCountry: "FR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 46.3076,
            longitude: 4.8286,
        },
        areaServed: [
            { "@type": "City", name: "Mâcon" },
            { "@type": "AdministrativeArea", name: "Saône-et-Loire" },
            { "@type": "AdministrativeArea", name: "Bourgogne-Franche-Comté" },
            { "@type": "Country", name: "France" },
        ],
        sameAs: [
            // "https://www.linkedin.com/in/[VOTRE-HANDLE]",
            // "https://github.com/[VOTRE-HANDLE]",
            // "https://www.malt.fr/profile/[VOTRE-HANDLE]",
        ],
    }

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: config.fullName,
        jobTitle: "Développeur Full-Stack Freelance",
        url: baseUrl,
        description:
            "Développeur web freelance basé à Mâcon, spécialisé dans la création de sites internet modernes et performants pour les entreprises locales.",
        worksFor: {
            "@type": "Organization",
            name: "MA.DEV",
        },
        email: config.email,
        telephone: config.phone,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Mâcon",
            addressRegion: "Bourgogne-Franche-Comté",
            postalCode: "71000",
            addressCountry: "FR",
        },
        sameAs: [
            // "https://www.linkedin.com/in/[VOTRE-HANDLE]",
            // "https://github.com/[VOTRE-HANDLE]",
            // "https://www.malt.fr/profile/[VOTRE-HANDLE]",
        ],
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: "MA.DEV",
        url: baseUrl,
        inLanguage: "fr-FR",
        publisher: { "@id": `${baseUrl}/#person` },
    }

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Développement web Full-Stack freelance",
        provider: { "@id": `${baseUrl}/#person` },
        serviceType: "Développement web",
        description:
            "Conception et développement d'applications web modernes avec React, Next.js et Node.js pour les startups et PME. Sites vitrines, e-commerce, applications métier sur mesure.",
        areaServed: { "@type": "Country", name: "France" },
        url: baseUrl,
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </>
    )
}
