
export const metadata = {
    title: "Conditions Générales de Vente | MA.DEV",
    description: "Conditions générales de vente des services de développement web - MA.DEV",
}

export default function CGV() {
    return (
        <>
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl font-bold text-foreground mb-12">Conditions Générales de Vente</h1>

                    <div className="prose prose-lg max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 1 - Objet</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre MA.DEV et
                                ses clients pour toute prestation de services de développement web, création de sites internet et
                                applications.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 2 - Devis et commande</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {"Tout projet fait l'objet d'un devis détaillé gratuit. Le devis est valable 30 jours à compter de sa date d'émission. La commande est considérée comme ferme après signature du devis et versement de l'acompte prévu."}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 3 - Tarifs et paiement</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {"Les prix sont indiqués en euros (TVA non applicable, article 293 B du CGI). Le paiement s'effectue selon les modalités suivantes :"}
                            </p>
                            <ul className="text-muted-foreground space-y-2 mt-4 list-disc pl-6">
                                <li>{"30% d'acompte à la signature du devis"}</li>
                                <li>70% à la livraison du projet</li>
                            </ul>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                Tout retard de paiement entraînera des pénalités de retard au taux légal en vigueur.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 4 - Délais de réalisation</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {"Les délais de réalisation sont donnés à titre indicatif et dépendent de la réactivité du client pour la fourniture des contenus et la validation des étapes. MA.DEV s'engage à respecter les délais convenus dans la mesure du possible."}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 5 - Obligations du client</h2>
                            <p className="text-muted-foreground leading-relaxed">{"Le client s'engage à :"}</p>
                            <ul className="text-muted-foreground space-y-2 mt-4 list-disc pl-6">
                                <li>Fournir les contenus (textes, images, logos) dans les délais convenus</li>
                                <li>Valider les étapes du projet dans un délai raisonnable</li>
                                <li>Régler les factures selon les modalités prévues</li>
                                <li>{"Garantir qu'il dispose des droits sur les contenus fournis"}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 6 - Propriété intellectuelle</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {"Le transfert de propriété du code source et des créations graphiques s'effectue après paiement intégral de la prestation. MA.DEV conserve le droit de mentionner sa réalisation dans son portfolio et ses références commerciales."}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 7 - Garantie et maintenance</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                MA.DEV garantit le bon fonctionnement du site pendant une période de 30 jours suivant la livraison. Les
                                corrections de bugs identifiés pendant cette période sont effectuées gratuitement. Au-delà, un contrat
                                de maintenance peut être proposé.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 8 - Résiliation</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                En cas de résiliation du contrat par le client avant la fin du projet, les sommes déjà versées restent
                                acquises à MA.DEV. Une facturation complémentaire pourra être établie pour le travail réalisé non
                                {"couvert par l'acompte."}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 9 - Limitation de responsabilité</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                La responsabilité de MA.DEV est limitée au montant des sommes effectivement perçues au titre du contrat.
                                MA.DEV ne saurait être tenu responsable des dommages indirects, pertes de données ou manque à gagner.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Article 10 - Droit applicable</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents du
                                ressort du siège social de MA.DEV.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
