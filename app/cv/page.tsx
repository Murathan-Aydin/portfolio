
import type { Metadata } from 'next'
import { CvDownloadButton } from '@/components/cv-download-button'

export const metadata: Metadata = {
    title: 'CV | Murathan Aydin - Développeur Full-Stack',
    description: 'Consultez le CV de Murathan Aydin, développeur full-stack spécialisé en React, Next.js, PHP et DevOps. Disponible pour de nouveaux projets.',
    keywords: ['CV', 'Murathan Aydin', 'Développeur Full-Stack', 'Epitech', 'React', 'Next.js', 'PHP', 'DevOps', 'Lyon'],
    openGraph: {
        title: 'CV | Murathan Aydin - Développeur Full-Stack',
        description: 'Parcours professionnel et compétences de Murathan Aydin.',
        url: 'https://ma-dev.fr/cv',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    }
}

type Experience = {
    role: string
    company: string
    period: string
    bullets: string[]
}

const cv = {
    identity: {
        name: 'AYDIN Murathan',
        title: 'Alternant Développeur Full-Stack',
        location: 'Lyon (69)',
        phone: '07 71 22 42 66',
        email: 'murathan.aydin@epitech.eu',
        linkedin: 'https://www.linkedin.com/in/murathan-aydin',
        website: 'https://ma-dev.fr',
        drivingLicense: 'Permis B',
        summary:
            'Alternant développeur full-stack spécialisé en API, IoT et automatisation. Expérience en PHP, Python, DevOps et traitement de données énergétiques. Ouvert à une alternance Bac+5 à la suite de mon diplôme.',
    },
    experiences: [
        {
            role: 'Développeur Full-Stack',
            company: 'OID Consultants',
            period: "Septembre 2025 — Aujourd'hui",
            bullets: [
                'API PHP/Python pour le traitement de données en push',
                'Automatisation IoT via SFTP et CRON',
                'Alertes Grafana automatisées',
                'Collecte et stockage de données énergétiques via API',
                'Déploiement Linux sur VM/VPS',
            ],
        },
        {
            role: 'Développeur',
            company: 'Web Academy by Epitech',
            period: 'Novembre 2024 — Aujourd’hui',
            bullets: [
                'AutoTrack : application de gestion de véhicules',
                'Chat temps réel',
                'Projet e-commerce',
            ],
        },
        {
            role: 'Opérateur Polyvalent',
            company: "Missions d'Intérim (Simire, Bressor, Lamberet)",
            period: 'Juin 2023 — Octobre 2024',
            bullets: [
                'Fabrication, production industrielle et assemblage en industrie.',
            ],
        },
        {
            role: 'Responsable magasin',
            company: 'Phone Store Academy',
            period: 'Février 2022 — Mars 2023',
            bullets: [
                'Gestion magasin et relation client',
                'Encadrement de stagiaires et apprentis',
                "Création d'un site web en autodidacte",
            ],
        },
        {
            role: 'Apprenti vendeur',
            company: 'Solution Phone',
            period: 'Juillet 2019 — Juillet 2021',
            bullets: [
                'Réparation et maintenance informatique',
                'Vente, conseil client et services',
            ],
        },
    ] as Experience[],
    education: [
        'Développeur Web — Web Academy by Epitech (2024 — 2026)',
        'Formation Micro-soudure — C.F.T.M Lyon (2021)',
        'CAP Vente multifonction — CIFA Jean-Lameloise (2019 — 2021)',
    ],
    skills: [
        ['Frontend', 'React, Next.js, TypeScript, Angular'],
        ['Backend', 'PHP, Laravel, Python, Java, C#'],
        ['Base de données', 'PostgreSQL, MySQL, MongoDB, Prisma'],
        ['DevOps', 'Linux, Git, GitHub, Docker, CRON'],
        ['Web', 'API REST, SFTP, Grafana, SCSS'],
    ],
    languages: ['Français — langue maternelle', 'Turc — bilingue', 'Anglais — niveau professionnel'],
    softSkills: ['Rigueur', 'Autonomie', "Esprit d'équipe", "Capacité d'adaptation"],
    interests: ['Automobile', 'Randonnée', 'Bénévolat associatif'],
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="mb-3">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-900">{children}</h2>
            <div className="mt-1 h-2 w-24 bg-blue-800" />
        </div>
    )
}

function SidebarList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-1.5 text-[13.5px] leading-[1.35] text-slate-700">
            {items.map((item) => (
                <li key={item} className="flex gap-2">
                    <span className="mt-2 text-slate-900">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

export default function CvPage() {
    return (
        <main className="min-h-screen pt-20 py-8 print:bg-white print:py-0">
            <style>{`
                @page {
                size: A4;
                margin: 12mm;
                }
                @media print {
                html, body {
                    background: white;
                }
                body * {
                    visibility: hidden;
                }
                #cv-print-area,
                #cv-print-area * {
                    visibility: visible;
                }
                #cv-print-area {
                    position: absolute;
                    inset: 0;
                    margin: 12mm;
                }
                .cv-sheet {
                    box-shadow: none !important;
                    border: none !important;
                    width: 100% !important;
                    min-height: auto !important;
                    margin: 0 !important;
                }
                .print-hidden {
                    display: none !important;
                }
                a {
                    text-decoration: none !important;
                    color: inherit !important;
                }
                }
                /* Custom class for capturing with html2canvas (fixes modern color parsing) */
                .cv-sheet.print-mode {
                    width: 210mm !important;
                    min-height: 297mm !important;
                    margin: 0 !important;
                    box-shadow: none !important;
                    border: none !important;
                    background-color: #ffffff !important;
                }
                /* Override modern Tailwind colors in PDF generation mode */
                .cv-sheet.print-mode * {
                    outline: none !important;
                    text-shadow: none !important;
                    /* Force standard colors for common CV elements */
                }
                .cv-sheet.print-mode .text-slate-900 { color: #0f172a !important; }
                .cv-sheet.print-mode .text-slate-800 { color: #1e293b !important; }
                .cv-sheet.print-mode .text-slate-700 { color: #334155 !important; }
                .cv-sheet.print-mode .text-slate-500 { color: #64748b !important; }
                .cv-sheet.print-mode .text-blue-800 { color: #1e40af !important; }
                .cv-sheet.print-mode .bg-blue-800 { background-color: #1e40af !important; }
                .cv-sheet.print-mode .bg-slate-100 { background-color: #f1f5f9 !important; }
                .cv-sheet.print-mode .border-slate-200 { border-color: #e2e8f0 !important; }

                @media (max-width: 768px) {
                    .cv-sheet.print-mode header,
                    .cv-sheet.print-mode .grid {
                        grid-template-columns: 1.45fr 0.85fr !important;
                        display: grid !important;
                    }
                }
            `}</style>
            <section
                id="cv-print-area"
                className="cv-sheet mx-auto flex min-h-0 lg:min-h-[297mm] w-full max-w-[210mm] flex-col border border-slate-200 bg-white px-4 py-6 sm:px-8 sm:py-7 shadow-sm print:min-h-0 print:border-0 print:px-0 print:py-0"
            >
                <header className="grid grid-cols-1 md:grid-cols-[1.45fr_0.85fr] gap-6 md:gap-8 border-b border-slate-200 pb-6">
                    <div>
                        <h1 className="text-[24px] sm:text-[26px] font-bold leading-none tracking-tight text-slate-900">
                            {cv.identity.name}
                        </h1>
                        <p className="mt-4 text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.08em] text-blue-800">
                            {cv.identity.title}
                        </p>
                        <p className="mt-4 max-w-full md:max-w-[95%] text-[13.5px] sm:text-[14px] leading-[1.45] text-slate-700">
                            {cv.identity.summary}
                        </p>
                    </div>

                    <ul className="space-y-1.5 md:space-y-2 text-[13px] sm:text-[13.5px] leading-[1.35] text-slate-800">
                        <li><a href={`tel:${cv.identity.phone}`} target="_blank" rel="noreferrer" className="hover:underline">{cv.identity.phone}</a></li>
                        <li className="break-all hover:underline"><a href={`mailto:${cv.identity.email}`} target="_blank" rel="noreferrer">{cv.identity.email}</a></li>
                        <li>
                            <a href={cv.identity.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                                linkedin.com/in/murathan-aydin
                            </a>
                        </li>
                        <li>
                            <a href={cv.identity.website} target="_blank" rel="noreferrer" className="hover:underline">
                                ma-dev.fr
                            </a>
                        </li>
                        <li>{cv.identity.location}</li>
                        <li>{cv.identity.drivingLicense}</li>
                    </ul>
                </header>

                <div className="mt-6 grid flex-1 grid-cols-1 md:grid-cols-[1.5fr_0.82fr] gap-8">
                    <div>
                        <SectionTitle>Expériences</SectionTitle>
                        <div className="space-y-4">
                            {cv.experiences.map((experience) => (
                                <article key={`${experience.role}-${experience.company}`}>
                                    <h3 className="text-[15px] font-bold leading-tight text-slate-900">
                                        {experience.role} — {experience.company}
                                    </h3>
                                    <p className="mt-1 text-[12.5px] uppercase tracking-[0.06em] text-slate-500">
                                        <time>{experience.period}</time>
                                    </p>
                                    <ul className="mt-2 space-y-1.5 text-[13.5px] leading-[1.35] text-slate-700">
                                        {experience.bullets.map((bullet) => (
                                            <li key={bullet} className="flex gap-2">
                                                <span className="mt-2px text-slate-900">•</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>

                        <div className="mt-6">
                            <SectionTitle>Formation</SectionTitle>
                            <ul className="space-y-2.5 text-[13.5px] leading-[1.35] text-slate-700">
                                {cv.education.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <aside>
                        <SectionTitle>Compétences</SectionTitle>
                        <div className="space-y-2.5 text-[13.5px] leading-[1.35] text-slate-700">
                            {cv.skills.map(([label, value]) => (
                                <p key={label}>
                                    <span className="font-semibold text-slate-900">{label} :</span> {value}
                                </p>
                            ))}
                        </div>

                        <div className="mt-6">
                            <SectionTitle>Langues</SectionTitle>
                            <SidebarList items={cv.languages} />
                        </div>

                        <div className="mt-6">
                            <SectionTitle>Soft skills</SectionTitle>
                            <SidebarList items={cv.softSkills} />
                        </div>

                        <div className="mt-6">
                            <SectionTitle>Intérêts</SectionTitle>
                            <SidebarList items={cv.interests} />
                        </div>
                    </aside>
                </div>
            </section>
            <CvDownloadButton />
        </main>
    )
}
