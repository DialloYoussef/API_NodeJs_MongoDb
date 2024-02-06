const mongoose = require("mongoose");
const validator = require("validator");

const paiementSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => v >= 0,
      message: "Le montant doit être positif",
    },
  },
  // Autres champs pertinents
  //   etudiant: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Etudiant",
  //   },
});

// Modifiez le nom du modèle ici, en utilisant "Paiement"
const Paiement = mongoose.model("Paiement", paiementSchema);

module.exports = {
  Paiement, // Assurez-vous que le nom ici correspond à celui utilisé dans la route
};
