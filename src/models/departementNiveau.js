const mongoose = require('mongoose');

const departementNiveauSchema = new mongoose.Schema({
  montantAnnuelle: {
    type: Number,
    required: true,
  },
  montantTranche1: {
    type: Number,
    required: true,
  },
  montantTranche2: {
    type: Number,
    required: true,
  },
  montantTranche3: {
    type: Number,
    required: true,
  },
  fraisReinscription: {
    type: Number,
    required: true,
  },
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departement',
  },
  niveau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Niveau',
  },
});

const DepartementNiveau = mongoose.model('DepartementNiveau', departementNiveauSchema);

module.exports = DepartementNiveau;
