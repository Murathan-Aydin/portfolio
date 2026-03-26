import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async headers() {
        return [
            // En-têtes de sécurité sur toutes les routes
            {
                source: "/:path*",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
                ],
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
