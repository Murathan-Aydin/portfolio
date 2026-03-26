import { config } from "@/lib/config"

export function StructuredData() {
    // Fallback propre pour le développement local
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ma-dev.fr")

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        name: "MA.DEV",
        legalName: config.businessName,
        description: "Développeur web freelance à Mâcon spécialisé dans la création de sites internet modernes et performants pour les entreprises locales. Services de développement web, création de sites vitrine, e-commerce et applications sur mesure en Saône-et-Loire.",
        url: baseUrl,
        telephone: config.phone,
        email: config.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Mâcon",
            addressRegion: "Bourgogne-Franche-Comté",
            postalCode: "71000",
            addressCountry: "FR",
        },
        areaServed: [
            {
                "@type": "City",
                name: "Mâcon",
            },
            {
                "@type": "AdministrativeArea",
                name: "Saône-et-Loire",
            },
            {
                "@type": "AdministrativeArea",
                name: "Bourgogne-Franche-Comté",
            },
        ],
        priceRange: "€€",
        serviceArea: {
            "@type": "GeoCircle",
            geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: "46.3067",
                longitude: "4.8333",
            },
        },
        sameAs: [
            // Ajoutez vos réseaux sociaux ici si disponibles
            // Exemple: "https://www.linkedin.com/in/votre-profil",
        ],
    }

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: config.fullName,
        jobTitle: "Développeur Web Freelance",
        description: "Développeur web freelance basé à Mâcon, spécialisé dans la création de sites internet modernes et performants pour les entreprises locales.",
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
            // Ajoutez vos réseaux sociaux ici si disponibles
            // Exemple: "https://www.linkedin.com/in/votre-profil",
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
        </>
    )
}

