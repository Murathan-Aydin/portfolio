import type { NextConfig } from "next";

const securityHeaders = [
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
    {
        key: "Content-Security-Policy",
        // Tighten progressively: remove 'unsafe-eval' once all scripts are audited
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data:",
            "connect-src 'self' https://api.m-aydin.fr",
        ].join("; "),
    },
];

const nextConfig: NextConfig = {
    async headers() {
        return [
            // En-têtes de sécurité sur toutes les routes
            {
                source: "/:path*",
                headers: securityHeaders,
            },
            // Cache longue durée pour les images statiques
            {
                source: "/images/:path*",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
                ],
            },
        ];
    },
    output: "standalone",
};

export default nextConfig;
