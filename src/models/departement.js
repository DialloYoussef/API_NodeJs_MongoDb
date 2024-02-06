const validator = require("validator");
const mongoose = require('mongoose');

// Définition du schéma pour l'entité "Departement"
const departementSchema = new mongoose.Schema({
  nom: {
    type: String,
    unique: true,   // Contrainte d'unicité
    required: true, // Contrainte de non-nullité
  },
});

// Création du modèle "Departement" basé sur le schéma défini
const Departement = mongoose.model('Departement', departementSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Departement;
