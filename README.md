# Projet To-Do List – CI/CD avec GitHub Actions et Netlify

##  Présentation du projet

Cette application est une **To-Do List** développée avec des technologies front-end simples : **HTML**, **CSS** et **JavaScript**. Elle permet à l’utilisateur d’ajouter, cocher, supprimer des tâches, le tout via une interface simple et intuitive.

L’objectif de ce projet est de mettre en place une **démarche de déploiement automatisé (CI/CD)**, à l’aide de **GitHub Actions** pour l'intégration continue, et **Netlify** pour l’hébergement du site.

---

##  Objectifs pédagogiques

- Automatiser le déploiement d’une application web
- Exécuter des tests automatisés avant la mise en production
- Sécuriser les clés d’authentification (Netlify)
- Documenter l’ensemble du processus

---

##  Technologies utilisées

- **HTML / CSS / JavaScript** – Application front-end
- **Selenium WebDriver** – Tests automatisés (JavaScript)
- **GitHub Actions** – Intégration et déploiement continus
- **Netlify** – Hébergement statique et déploiement automatique

---

##  Fonctionnalités de test

Les **tests Selenium** permettent de simuler des actions utilisateurs :
- Ouverture de la page `index.html`
- Ajout de deux tâches
- Cocher une tâche
- Suppression de la tâche cochée
- Vérification que la tâche restante est correcte

---

##  Prérequis

Avant de démarrer en local :

- Avoir **Node.js** et **npm** installés
- Avoir un **compte Netlify** 
- Avoir accès au dépôt **GitHub**

---

##  Installation locale

1. Cloner le dépôt :
```bash
git clone https://github.com/aureliep63/To-Do_List.git
cd To-Do_List
```

2. Installer les dépendances :
```bash
npm install
```

3. Exécuter les tests localement :
```bash
npm run test
```

---

##  Pipeline CI/CD – GitHub Actions
Le déploiement se fait automatiquement grâce à GitHub Actions, via le fichier :
`.github/workflows/deploy.yml`.

Déroulé du pipeline :
* Téléchargement du code depuis la branche main
* Installation des dépendances
* Démarrage d’un serveur HTTP local 
* Installation de Google Chrome & ChromeDriver pour les tests Selenium
* Exécution des tests automatisés
=> Si tous les tests passent, déploiement sur Netlify

---

##  Configuration de Netlify
* Importer le dépôt GitHub sur Netlify
* Copier le `Site ID`
* Générer un Token personnel dans `User Settings > Applications`

---

##  Secrets GitHub
Pour sécuriser le déploiement Netlify, deux variables doivent être ajoutées dans les secrets GitHub (dans le `dépôt > Settings > Secrets and variables > Actions`) :
* NETLIFY_AUTH_TOKEN : _Token généré sur Netlify_
* NETLIFY_SITE_ID : _Site Id copié de Netlify_

---
 
##  Déploiement automatique
Une fois configuré, chaque push sur la branche main :
* Lance les tests
* Déploie le site si tout est OK
=> URL de production : https://thetodolistsimple.netlify.app