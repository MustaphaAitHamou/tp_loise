# Projet d'Inscription

Ce projet est une application React qui permet à un utilisateur de s'inscrire via un formulaire en validant plusieurs champs (nom, prénom, email, date de naissance, ville, code postal).  
En fonction de la validation, l'application affiche un toaster de succès ou d'erreur et sauvegarde les données dans le localStorage.

## Table des matières

- [Projet d'Inscription](#projet-dinscription)
  - [Table des matières](#table-des-matières)
  - [Fonctionnalités](#fonctionnalités)
  - [Installation](#installation)
    - [Prérequis](#prérequis)
    - [Cloner le dépôt](#cloner-le-dépôt)

## Fonctionnalités

- **Formulaire d'inscription** : Affiche les champs pour nom, prénom, email, date de naissance, ville et code postal.
- **Validation** :
  - L'utilisateur doit avoir au moins 18 ans.
  - Le code postal doit être au format français (5 chiffres).
  - Les noms et prénoms ne doivent pas contenir de chiffres ou caractères spéciaux non autorisés (seuls les accents, tréma et tiret sont admis).
  - L'adresse email doit être correcte.
- **Bouton "Sauvegarder"** : Désactivé tant que tous les champs ne sont pas remplis.
- **Toasters** : Affichage d'un message de succès en cas de validation et d'erreur avec des messages spécifiques affichés en rouge pour chaque champ invalide.
- **Sauvegarde locale** : Enregistrement des données dans le localStorage.
- **Tests** : Tests unitaires et d'intégration garantissant la fiabilité du formulaire et des fonctions de validation.
- **Déploiement** : Configuration GitHub Actions pour exécuter les tests et déployer l'application sur GitHub Pages.

## Installation

### Prérequis

- Node.js (version LTS recommandée)
- npm (inclus avec Node.js)

### Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/mon-projet-inscription.git
cd mon-projet-inscription
