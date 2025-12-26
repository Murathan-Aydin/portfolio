# Guide de déploiement

## Configuration Docker avec volume persistant

Les images uploadées sont stockées dans un volume Docker monté pour la persistance :

-   **Volume hôte :** `/var/www/data/portfolio/images/projets`
-   **Volume container :** `/app/public/images/projets`
-   **URL publique :** `/images/projets/[filename].webp`

### Configuration Docker Compose

```yaml
volumes:
    - /var/www/data/portfolio/images/projets:/app/public/images/projets
```

### Solution automatique

Le script `scripts/ensure-uploads-dir.js` est automatiquement exécuté avant `npm start` grâce au hook `prestart` dans `package.json`. Il crée le dossier `public/images/projets` s'il n'existe pas.

### Vérification sur le VPS

1. **Vérifier que le volume est monté :**

    ```bash
    docker exec portfolio ls -la /app/public/images/projets
    ```

2. **Vérifier le dossier sur l'hôte :**

    ```bash
    ls -la /var/www/data/portfolio/images/projets
    ```

3. **Créer le dossier sur l'hôte si nécessaire :**

    ```bash
    mkdir -p /var/www/data/portfolio/images/projets
    chmod 755 /var/www/data/portfolio/images/projets
    ```

4. **Vérifier les permissions :**
    ```bash
    # Le dossier doit être accessible en lecture/écriture par le container
    chmod -R 755 /var/www/data/portfolio/images/projets
    ```

### Après un nouveau build

Après chaque `npm run build` et redémarrage du container, les images dans le volume Docker persisteront :

```bash
# Reconstruire l'image
docker-compose build portfolio

# Redémarrer le container
docker-compose up -d portfolio
```

Le script `prestart` créera automatiquement le dossier dans le container s'il n'existe pas.

### Dépannage

Si les images ne s'affichent toujours pas (erreur 404) :

1. **Vérifier que le volume est bien monté :**

    ```bash
    docker inspect portfolio | grep -A 10 Mounts
    ```

2. **Vérifier les logs du container :**

    ```bash
    docker logs portfolio
    ```

3. **Vérifier les permissions du volume :**

    ```bash
    # Sur l'hôte
    ls -la /var/www/data/portfolio/images/projets

    # Dans le container
    docker exec portfolio ls -la /app/public/images/projets
    ```

4. **Vérifier que Next.js sert les fichiers statiques :**

    - Les fichiers dans `public/images/projets/` devraient être accessibles via `/images/projets/`
    - Vérifier qu'aucun proxy nginx/traefik ne bloque ce chemin

5. **Tester l'upload manuellement :**
    - Se connecter à l'admin et essayer d'uploader une image
    - Vérifier les logs pour voir si l'écriture réussit
