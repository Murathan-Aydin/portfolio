import { HeroSection } from "@/components/home/hero/hero-section"
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
