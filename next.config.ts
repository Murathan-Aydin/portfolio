import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // S'assurer que les fichiers statiques sont bien servis
    async headers() {
        return [
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    output: "standalone",
};

export default nextConfig;
