const mongoose = require('mongoose');

// Définition du schéma pour l'entité "Etudiant"
const etudiantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  matricule: {
    type: String,
    required: true,
    unique: true
  },
  // Autres champs pertinents

  // Référence vers l'entité "Departement"
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departement',
    required: true,
  }
});

// Création du modèle "Etudiant" basé sur le schéma défini
const Etudiant = mongoose.model('Etudiant', etudiantSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Etudiant;
