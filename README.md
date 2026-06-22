# FPK-EXPRESS — Dossier Entrepreneurial Interactif

Site statique public présentant le concept entrepreneurial **FPK-EXPRESS** sous la forme d’un dossier interactif, professionnel et prêt à être publié sur GitHub Pages.

Adresse prévue : [https://anabkl.github.io/fpk-express-startup-case/](https://anabkl.github.io/fpk-express-startup-case/)

## Présentation du dossier

Ce site explique le problème étudiant identifié à la FPK Khouribga, la solution proposée, la validation exploratoire, le Business Model Canvas, les faisabilités, les analyses SWOT et PESTEL, le marketing mix, la roadmap, les risques et la stratégie MVP.

Il s’agit d’un dossier public distinct de l’application principale FPK-EXPRESS.

## Objectif pédagogique

- Présenter une démarche entrepreneuriale structurée.
- Relier un problème terrain à une proposition de valeur testable.
- Expliquer les hypothèses du modèle économique sans les présenter comme des résultats réels.
- Montrer la faisabilité d’un MVP numérique léger.
- Préparer une présentation claire devant un professeur ou un jury.

## Définition du produit

FPK-EXPRESS est un intermédiaire numérique entre les étudiants et des snacks partenaires proches du campus.

La plateforme permet de consulter des produits, précommander, choisir un créneau et retirer la commande directement chez le partenaire. Elle ne prépare pas les produits, ne gère pas de stock alimentaire et n’effectue aucune livraison. Le snack partenaire reste responsable de la préparation, de l’hygiène, de la disponibilité, du prix et de la remise de la commande.

## Structure des fichiers

```text
fpk-express-startup-case/
├── assets/
│   ├── favicon.svg
│   ├── hero-network.svg
│   └── logo-mark.svg
├── .nojekyll
├── index.html
├── LICENSE
├── README.md
├── script.js
└── styles.css
```

## Aperçu local

Le site fonctionne sans installation ni compilation.

Option 1 : ouvrir directement `index.html` dans un navigateur.

Option 2 : lancer un serveur local simple :

```bash
python3 -m http.server 8080
```

Puis ouvrir [http://localhost:8080](http://localhost:8080).

## Déploiement GitHub Pages

1. Créer un dépôt GitHub public nommé `fpk-express-startup-case`.
2. Envoyer les fichiers sur la branche `main`.
3. Ouvrir `Settings` → `Pages` dans GitHub.
4. Dans `Build and deployment`, choisir `Deploy from a branch`.
5. Sélectionner la branche `main` et le dossier `/ (root)`.
6. Enregistrer puis attendre la publication.

L’adresse finale sera :

```text
https://anabkl.github.io/fpk-express-startup-case/
```

## Modifier le lien du prototype MVP

Ouvrir `script.js` et remplacer les deux constantes placées en haut du fichier :

```js
const MVP_PROTOTYPE_URL = "https://example.com/fpk-express-mvp";
const PROTOTYPE_REPOSITORY_URL = "https://github.com/your-username/fpk-express";
```

Tous les boutons et liens concernés seront mis à jour automatiquement.

## Exporter le dossier en PDF

1. Ouvrir le site dans le navigateur.
2. Cliquer sur **Imprimer / Enregistrer en PDF** dans la section d’accueil.
3. Choisir **Enregistrer au format PDF** dans la fenêtre d’impression.
4. Activer les arrière-plans graphiques si le navigateur propose cette option.

Une feuille de style dédiée simplifie la mise en page pour le format A4.

## Avertissement sur les hypothèses financières

Le simulateur financier présente uniquement des hypothèses pédagogiques modifiables. Les recettes, coûts, résultats et seuils de rentabilité affichés ne représentent ni des revenus réels ni des bénéfices réels.

## Avertissement sur le paiement et le portefeuille

Le MVP ne collecte, ne conserve et ne transfère aucun argent réel. Le paiement est envisagé au retrait chez le snack partenaire. Le portefeuille FPK est uniquement un concept visuel potentiel. Toute future intégration de paiement mobile nécessitera une formalisation juridique et un partenariat avec un prestataire agréé. WhatsApp reste un canal de support et de communication uniquement.

## Licence

Ce projet est distribué sous licence MIT. Consulter le fichier [LICENSE](LICENSE).
