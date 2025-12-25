export interface Project {
    _id?: string
    slug: string
    title: string
    description: string
    longDescription: string
    tags: string[]
    image: string
    gallery: string[]
    clientName: string
    projectDate: string
    projectUrl?: string
    features: string[]
    createdAt?: Date
    updatedAt?: Date
}

export const projects: Project[] = [
    {
        slug: "restaurant-le-gourmet",
        title: "Restaurant Le Gourmet",
        description: "Site vitrine moderne pour un restaurant gastronomique parisien",
        longDescription:
            "Création d'un site vitrine élégant et performant pour Le Gourmet, restaurant étoilé situé au cœur de Paris. Le design met en valeur l'univers culinaire du chef avec des animations fluides et une expérience utilisateur immersive.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
        image: "/modern-restaurant-website-dark-theme.jpg",
        gallery: [
            "/restaurant-homepage-elegant.jpg",
            "/restaurant-menu-page-design.jpg",
            "/restaurant-reservation-system.jpg",
        ],
        clientName: "Le Gourmet",
        projectDate: "Janvier 2024",
        projectUrl: "https://legourmet.example.com",
        features: [
            "Design responsive adapté à tous les écrans",
            "Système de réservation en ligne intégré",
            "Galerie photo immersive",
            "Optimisation SEO avancée",
            "Animations fluides au scroll",
        ],
    },
    {
        slug: "boutique-mode-ethique",
        title: "Boutique Mode Éthique",
        description: "E-commerce pour une marque de mode responsable",
        longDescription:
            "Développement d'une boutique en ligne complète pour une marque de mode éthique et durable. L'accent a été mis sur l'expérience d'achat fluide et la mise en valeur des engagements écologiques de la marque.",
        tags: ["E-commerce", "Stripe", "React"],
        image: "/fashion-ecommerce-website-minimal.jpg",
        gallery: ["/fashion-store-homepage.jpg", "/product-page-fashion.jpg", "/shopping-cart-modern.jpg"],
        clientName: "ÉcoMode",
        projectDate: "Mars 2024",
        projectUrl: "https://ecomode.example.com",
        features: [
            "Catalogue produits avec filtres avancés",
            "Paiement sécurisé via Stripe",
            "Gestion des stocks en temps réel",
            "Programme de fidélité intégré",
            "Interface d'administration personnalisée",
        ],
    },
    {
        slug: "cabinet-architecte",
        title: "Cabinet d'Architecte",
        description: "Portfolio élégant pour un cabinet d'architecture",
        longDescription:
            "Conception d'un portfolio digital pour un cabinet d'architecture renommé. Le site met en valeur les projets architecturaux avec une navigation intuitive et des visuels grand format.",
        tags: ["Next.js", "CMS", "SEO"],
        image: "/architecture-portfolio-website-clean.jpg",
        gallery: [
            "/architecture-homepage-minimal.jpg",
            "/architecture-project-gallery.jpg",
            "/architecture-about-page.jpg",
        ],
        clientName: "Studio Archi",
        projectDate: "Février 2024",
        features: [
            "Portfolio interactif avec filtres par catégorie",
            "CMS headless pour gestion autonome",
            "Optimisation images automatique",
            "Référencement local optimisé",
            "Formulaire de contact avancé",
        ],
    },
    {
        slug: "application-saas",
        title: "Application SaaS",
        description: "Dashboard de gestion pour une startup tech",
        longDescription:
            "Développement d'une application SaaS complète avec tableau de bord analytique, gestion des utilisateurs et intégrations tierces. Interface moderne et intuitive pour une expérience utilisateur optimale.",
        tags: ["React", "Node.js", "PostgreSQL"],
        image: "/saas-dashboard-modern-interface.jpg",
        gallery: ["/dashboard-analytics-modern.jpg", "/user-management-interface.png", "/saas-settings-page.jpg"],
        clientName: "TechFlow",
        projectDate: "Avril 2024",
        projectUrl: "https://techflow.example.com",
        features: [
            "Dashboard analytique en temps réel",
            "Authentification multi-facteurs",
            "API REST documentée",
            "Système de notifications",
            "Export de données en plusieurs formats",
        ],
    },
]

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): Project[] {
    return projects
}
