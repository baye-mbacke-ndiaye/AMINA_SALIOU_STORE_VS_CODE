# AMINA SALIOU STORE — Projet e-commerce

Une première version responsive de la boutique en ligne AMINA SALIOU STORE, avec une direction artistique premium, un catalogue démonstratif, recherche, filtres, favoris, panier et préparation de commande WhatsApp.

## Lancer le projet sous Windows

1. Téléchargez et décompressez le dossier `amina-saliou-store`.
2. Ouvrez Visual Studio Code.
3. Cliquez sur **Fichier → Ouvrir un dossier** et sélectionnez `amina-saliou-store`.
4. Ouvrez `index.html` dans votre navigateur. Vous pouvez aussi installer l'extension VS Code **Live Server**, puis cliquer sur **Go Live**.

Aucune installation de Node.js ou Bash n'est nécessaire pour cette version statique.

## Avant la mise en ligne

### 1. Configurer WhatsApp
Ouvrez `app.js` et remplacez :

```js
whatsapp: "221XXXXXXXXX"
```

par le vrai numéro de la boutique au format international, chiffres uniquement, par exemple `221771234567`.

### 2. Remplacer les produits de démonstration
Les noms, prix, couleurs, catégories et images sont définis dans `STORE.products` au début de `app.js`. Remplacez les exemples par les produits réellement disponibles et vérifiez les droits d'utilisation des images.

### 3. Informations importantes sur cette version
Cette livraison est un **prototype front-end fonctionnel**, pas encore une plateforme de production complète. Le panier et les favoris sont enregistrés dans le navigateur du client. Les commandes sont préparées dans WhatsApp ; aucun paiement n'est encaissé par le site.

Le tableau d'administration sécurisé, la base de données partagée, les comptes clients, la gestion réelle du stock, les notifications, les paiements Wave/Orange Money et la sécurisation serveur ne sont pas inclus dans cette version. Ils doivent être développés et testés avant de traiter des commandes en production.

Ne collectez pas de données sensibles et ne publiez pas le site comme boutique entièrement opérationnelle avant d'avoir configuré les services nécessaires.

## Fichiers

- `index.html` — structure des pages et sections
- `styles.css` — design responsive
- `app.js` — catalogue de démonstration et interactions
- `README.md` — ce guide
