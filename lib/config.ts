// Configuration centralisée
// Toutes les valeurs sensibles doivent être définies dans .env.local
// Supporte NEXT_PUBLIC_ pour l'accès côté client et les variables normales côté serveur

const getEnv = (key: string): string => {
    const value = process.env[`NEXT_PUBLIC_${key}`] || process.env[key]
    if (!value) {
        throw new Error(`Variable d'environnement manquante : ${key} (ou NEXT_PUBLIC_${key})`)
    }
    return value
}

export const config = {
    // Informations personnelles
    businessName: getEnv("BUSINESS_NAME"),
    firstName: getEnv("FIRST_NAME"),
    lastName: getEnv("LAST_NAME"),
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    },
    siret: getEnv("SIRET"),
    address: getEnv("ADDRESS"),

    // Contact
    email: getEnv("CONTACT_EMAIL"),
    phone: getEnv("PHONE_NUMBER"),
    phoneDisplay: getEnv("PHONE_NUMBER_DISPLAY"),

    // Hébergeur
    hostName: getEnv("HOST_NAME"),
    hostAddress: getEnv("HOST_ADDRESS"),
    hostWebsite: getEnv("HOST_WEBSITE"),
    hostType: getEnv("HOST_TYPE"),
}

