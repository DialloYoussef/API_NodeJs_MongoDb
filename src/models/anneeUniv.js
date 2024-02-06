const mongoose = require('mongoose');
const moment = require('moment');

const anneeUniversitaireSchema = new mongoose.Schema({
  // Propriété "annee" de type String, obligatoire avec la valeur par défaut de l'année en cours
  annee: {
    type: String,
    required: true,
    unique: true,
    default: moment().format('YYYY'),
  },

});

const AnneeUniversitaire = mongoose.model('AnneeUniversitaire', anneeUniversitaireSchema);

module.exports = AnneeUniversitaire;
