This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Configuration des variables d'environnement

Pour personnaliser vos informations de contact et vos mentions légales, créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# Informations personnelles
BUSINESS_NAME=m-aydin
FIRST_NAME=Murathan
LAST_NAME=Aydin
SIRET=REDACTED_SIRET
ADDRESS=

# Contact
CONTACT_EMAIL=contact@ma-dev.fr
PHONE_NUMBER=REDACTED_PHONE
PHONE_NUMBER_DISPLAY=REDACTED_PHONE_DISPLAY

# Hébergeur
HOST_NAME=OVH
HOST_ADDRESS=2 rue Kellermann, 59100 Roubaix, France
HOST_WEBSITE=https://www.ovh.com
HOST_TYPE=VPS en France

# NextAuth (Authentification)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_clé_secrète_ici

# MongoDB (Base de données)
MONGODB_URI=mongodb://localhost:27017/portfolio
# Ou pour MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# SEO (Optionnel - pour sitemap et données structurées)
NEXT_PUBLIC_SITE_URL=https://ma-dev.fr
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
