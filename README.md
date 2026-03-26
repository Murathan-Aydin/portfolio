This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Configuration des variables d'environnement

Pour personnaliser vos informations de contact et vos mentions légales, créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# Informations personnelles
BUSINESS_NAME=
FIRST_NAME=
LAST_NAME=
SIRET=
ADDRESS=

# Contact
CONTACT_EMAIL=
PHONE_NUMBER=
PHONE_NUMBER_DISPLAY=

# Hébergeur
HOST_NAME=
HOST_ADDRESS=
HOST_WEBSITE=
HOST_TYPE=

# NextAuth (Authentification)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=   # générer avec : openssl rand -base64 32

# MongoDB (Base de données)
MONGODB_URI=

# SEO (Optionnel - pour sitemap et données structurées)
NEXT_PUBLIC_SITE_URL=

# SMTP (Envoi d'emails - Contact et Devis)
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
SMTP_TO=
```

**Note :** Pour que les variables soient accessibles côté client (composants React), vous pouvez également utiliser le préfixe `NEXT_PUBLIC_` (ex: `NEXT_PUBLIC_CONTACT_EMAIL`). Le fichier `lib/config.ts` gère automatiquement les deux formats.

**Génération de NEXTAUTH_SECRET :** Pour générer une clé secrète sécurisée, utilisez la commande suivante :
```bash
openssl rand -base64 32
```

Un fichier `.env.local.example` est disponible comme référence.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
