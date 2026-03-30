import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero/hero-section"

export const metadata: Metadata = {
    title: { absolute: "Murathan Aydin — Développeur Full-Stack Freelance à Mâcon (71)" },
    description:
        "Développeur web freelance à Mâcon. React, Next.js, Node.js. Sites sur mesure, applications web, SEO. Devis gratuit sous 48h.",
    alternates: { canonical: "https://ma-dev.fr" },
    openGraph: {
        title: "Murathan Aydin — Développeur Full-Stack Freelance à Mâcon (71)",
        description:
            "Développeur web freelance à Mâcon. React, Next.js, Node.js. Sites sur mesure, applications web, SEO. Devis gratuit sous 48h.",
        url: "https://ma-dev.fr",
        type: "website",
    },
}


import { TimelineSection } from "@/components/home/timeline-section"
import { ServicesSection } from "@/components/home/services-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { MethodSection } from "@/components/home/method-section"
import { ContactSection } from "@/components/home/contact-section"
import { config } from "@/lib/config"

export default function Home() {
    return (
        <>
            <HeroSection />
            <TimelineSection />
            <ServicesSection />
            <ProjectsSection />
            <MethodSection />
            <ContactSection email={config.email} />
        </>
    )
}
