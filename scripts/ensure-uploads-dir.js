#!/usr/bin/env node

/**
 * Script pour s'assurer que le dossier public/images/projets existe
 * À exécuter avant le démarrage de l'application en production
 * Ce dossier est monté via un volume Docker pour la persistance
 */

const { existsSync, mkdirSync } = require("fs");
const { join } = require("path");

const imagesDir = join(process.cwd(), "public", "images", "projets");

try {
	if (!existsSync(imagesDir)) {
		mkdirSync(imagesDir, { recursive: true });
		console.log("✅ Dossier public/images/projets créé avec succès");
	} else {
		console.log("✅ Dossier public/images/projets existe déjà");
	}
} catch (error) {
	console.error(
		"❌ Erreur lors de la création du dossier images/projets:",
		error.message
	);
	process.exit(1);
}
