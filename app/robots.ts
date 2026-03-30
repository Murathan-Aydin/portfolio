import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    // Fallback propre pour le développement local
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ma-dev.fr")

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin/", "/api/"],
            },
            { userAgent: "GPTBot", allow: "/" },
            { userAgent: "OAI-SearchBot", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}

