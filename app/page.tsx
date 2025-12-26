
import { HeroSection } from "@/components/home/hero/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { MethodSection } from "@/components/home/method-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FAQSection } from "@/components/home/faq-section"
import { ContactSection } from "@/components/home/contact-section"
import { SEOLocalSection } from "@/components/home/seo-local-section"

export default function Home() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <ProjectsSection />
            <MethodSection />
            <TestimonialsSection />
            <FAQSection />
            <SEOLocalSection />
            <ContactSection />
        </>
    )
}
