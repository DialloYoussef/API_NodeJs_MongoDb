# PaiementPro API

PaiementPro API est une interface robuste pour la gestion efficace des paiements étudiants. Cette API offre des fonctionnalités telles que l'inscription, la réinscription annuelle, et le suivi des paiements, simplifiant ainsi la gestion financière dans un contexte éducatif.

## Fonctionnalités

- **Inscription Étudiant :** Endpoint pour l'inscription des nouveaux étudiants.
- **Réinscription Annuelle :** Endpoint pour la mise à jour de l'année universitaire des étudiants.
- **Suivi des Paiements :** Endpoint pour l'ajout de paiements associés aux étudiants.
- **...**

## Prerequis

1. Cloner le dépôt : `git clone https://github.com/votre-utilisateur/paiementpro-api.git`
2. Installer les dépendances : `npm install`
3. Configurer la base de données 
4. Démarrer le serveur

## Endpoints

- `POST /etudiants/inscription` : Inscrit un nouvel étudiant.
- `PATCH /etudiants/:id/reinscription` : Réinscrit un étudiant pour une nouvelle année universitaire.
- `POST /etudiants/:id/paiement` : Enregistre un paiement pour un étudiant.
- .....


## Licence

Ce projet est sous licence Pidba - voir le fichier [LICENSE](LICENSE) pour plus de détails.
