import { config } from "@/lib/config"

export const metadata = {
    title: "Mentions légales | MA.DEV",
    description: "Mentions légales du site MA.DEV - Développeur web freelance",
}

export default function MentionsLegales() {
    return (
        <>
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl font-bold text-foreground mb-12">Mentions légales</h1>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Éditeur du site</h2>
                            <p className="text-muted-foreground leading-relaxed">Le site MA.DEV est édité par :</p>
                            <ul className="text-muted-foreground space-y-2 mt-4">
                                <li>
                                    <strong>Raison sociale :</strong> {config.businessName}
                                </li>
                                <li>
                                    <strong>Nom :</strong> {config.lastName}
                                </li>
                                <li>
                                    <strong>Prénom :</strong> {config.firstName}
                                </li>
                                <li>
                                    <strong>Statut :</strong> Auto-entrepreneur / Entreprise individuelle
                                </li>
                                <li>
                                    <strong>SIRET :</strong> {config.siret}
                                </li>
                                {config.address && (
                                    <li>
                                        <strong>Adresse :</strong> {config.address}
                                    </li>
                                )}
                                <li>
                                    <strong>Email :</strong> {config.email}
                                </li>
                                <li>
                                    <strong>Téléphone :</strong> {config.phoneDisplay}
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hébergeur</h2>
                            <p className="text-muted-foreground leading-relaxed">Le site est hébergé par :</p>
                            <ul className="text-muted-foreground space-y-2 mt-4">
                                <li>
                                    <strong>Société :</strong> {config.hostName}
                                </li>
                                <li>
                                    <strong>Type d'hébergement :</strong> {config.hostType}
                                </li>
                                <li>
                                    <strong>Adresse :</strong> {config.hostAddress}
                                </li>
                                <li>
                                    <strong>Site web :</strong> <a href={config.hostWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{config.hostWebsite}</a>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Propriété intellectuelle</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) est la
                                propriété exclusive de MA.DEV ou de ses partenaires. Toute reproduction, représentation, modification,
                                publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé
                                utilisé, est interdite sauf autorisation écrite préalable.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Responsabilité</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                MA.DEV s'efforce de fournir sur son site des informations aussi précises que possible. Toutefois, il ne
                                pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour,
                                qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Liens hypertextes</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Le site peut contenir des liens hypertextes vers d'autres sites. MA.DEV n'exerce aucun contrôle sur ces
                                sites et décline toute responsabilité quant à leur contenu ou aux éventuels dommages résultant de leur
                                utilisation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Droit applicable</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux
                                français seront seuls compétents.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
