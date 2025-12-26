"use client"

import { config } from "@/lib/config"

export function StructuredData() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ma-dev.fr"

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        name: "MA.DEV",
        legalName: config.businessName,
        description: "Développeur web freelance à Mâcon spécialisé dans la création de sites internet modernes et performants",
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
        sameAs: [],
    }

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: config.fullName,
        jobTitle: "Développeur Web Freelance",
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

