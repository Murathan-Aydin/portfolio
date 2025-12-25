// Configuration centralisée
// Utilise les variables d'environnement avec des valeurs par défaut
// Supporte NEXT_PUBLIC_ pour l'accès côté client et les variables normales côté serveur

const getEnv = (key: string, defaultValue: string): string => {
    // Priorité : NEXT_PUBLIC_ (client) puis variable normale (serveur)
    return process.env[`NEXT_PUBLIC_${key}`] || process.env[key] || defaultValue
}

export const config = {
    // Informations personnelles
    businessName: getEnv("BUSINESS_NAME", "m-aydin"),
    firstName: getEnv("FIRST_NAME", "Murathan"),
    lastName: getEnv("LAST_NAME", "Aydin"),
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    },
    siret: getEnv("SIRET", "REDACTED_SIRET"),
    address: getEnv("ADDRESS", ""),

    // Contact
    email: getEnv("CONTACT_EMAIL", "contact@ma-dev.fr"),
    phone: getEnv("PHONE_NUMBER", "REDACTED_PHONE"),
    phoneDisplay: getEnv("PHONE_NUMBER_DISPLAY", "REDACTED_PHONE_DISPLAY"),

    // Hébergeur
    hostName: getEnv("HOST_NAME", "OVH"),
    hostAddress: getEnv("HOST_ADDRESS", "2 rue Kellermann, 59100 Roubaix, France"),
    hostWebsite: getEnv("HOST_WEBSITE", "https://www.ovh.com"),
    hostType: getEnv("HOST_TYPE", "VPS en France"),
}

