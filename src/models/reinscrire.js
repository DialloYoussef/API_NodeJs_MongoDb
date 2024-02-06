const mongoose = require('mongoose');

const reinscrireSchema = new mongoose.Schema({
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etudiant',
    required: true,
  },
  nouvelleAnneeUniversitaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnneeUniversitaire',
    required: true,
  },
  // Autres champs pertinents pour la réinscription
});

const Reinscription = mongoose.model('Reinscription', reinscrireSchema);

module.exports = Reinscription;
