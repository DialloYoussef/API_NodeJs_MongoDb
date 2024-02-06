const mongoose = require('mongoose');

// Définition du schéma pour l'entité "Niveau"
const niveauSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true, // Champ obligatoire
    unique: true,   // Unicité
  },
  
});

// Création du modèle "Niveau" basé sur le schéma défini
const Niveau = mongoose.model('Niveau', niveauSchema);

// Exportation du modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Niveau;
