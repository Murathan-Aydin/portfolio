
import { config } from "@/lib/config"

export const metadata = {
    title: "Politique de confidentialité | MA.DEV",
    description: "Politique de confidentialité et protection des données personnelles - MA.DEV",
}

export default function PolitiqueConfidentialite() {
    return (
        <>
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl font-bold text-foreground mb-12">Politique de confidentialité</h1>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                MA.DEV s'engage à protéger la vie privée des utilisateurs de son site. Cette politique de
                                confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles
                                conformément au Règlement Général sur la Protection des Données (RGPD).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Données collectées</h2>
                            <p className="text-muted-foreground leading-relaxed">Nous pouvons collecter les données suivantes :</p>
                            <ul className="text-muted-foreground space-y-2 mt-4 list-disc pl-6">
                                <li>Nom et prénom</li>
                                <li>Adresse email</li>
                                <li>Numéro de téléphone</li>
                                <li>Nom de l'entreprise</li>
                                <li>Informations relatives à votre projet</li>
                                <li>Données de navigation (cookies, adresse IP)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Finalités du traitement</h2>
                            <p className="text-muted-foreground leading-relaxed">Vos données sont collectées pour :</p>
                            <ul className="text-muted-foreground space-y-2 mt-4 list-disc pl-6">
                                <li>Répondre à vos demandes de devis ou de contact</li>
                                <li>Vous fournir nos services de développement web</li>
                                <li>Améliorer notre site et nos services</li>
                                <li>Respecter nos obligations légales</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Base légale</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Le traitement de vos données repose sur votre consentement et/ou l'exécution d'un contrat. Vous pouvez
                                retirer votre consentement à tout moment en nous contactant.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Conservation des données</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Vos données sont conservées pendant une durée de 3 ans à compter de notre dernier contact, sauf
                                obligation légale de conservation plus longue.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Vos droits</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Conformément au RGPD, vous disposez des droits suivants :
                            </p>
                            <ul className="text-muted-foreground space-y-2 mt-4 list-disc pl-6">
                                <li>Droit d'accès à vos données</li>
                                <li>Droit de rectification</li>
                                <li>Droit à l'effacement</li>
                                <li>Droit à la limitation du traitement</li>
                                <li>Droit à la portabilité</li>
                                <li>Droit d'opposition</li>
                            </ul>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                Pour exercer ces droits, contactez-nous à : {config.email}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer
                                votre navigateur pour refuser les cookies ou être alerté lorsqu'un cookie est envoyé.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Sécurité</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès,
                                modification, divulgation ou destruction non autorisés.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits,
                                contactez-nous à : {config.email}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
