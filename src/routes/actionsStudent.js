const express = require("express");

const Etudiant = require("../models/etudiant");
const { Paiement } = require("../models/paiement");
const Reinscription = require("../models/reinscrire");

const router = new express.Router();



//
// DIFFERENTES ACTIONS DE STUDENTS
//
// -Inscription à un département
router.post("/etudiants/inscription", async (req, res, next) => {
    try {
      const etudiant = new Etudiant(req.body);
      const savedEtudiant = await etudiant.save();
      res.status(201).json(savedEtudiant);
    } catch (error) {
      console.error("Erreur lors de l'inscription de l'étudiant", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'inscription de l'étudiant" });
    }
  });
  
  // -Réinscription à une année universitaire
  router.patch("/etudiants/:id/reinscription", async (req, res, next) => {
    const idEtudiant = req.params.id;
    const nouvelleAnneeUniversitaire = req.body.nouvelleAnneeUniversitaire;
  
    try {
      const etudiant = await Etudiant.findById(idEtudiant);
      if (!etudiant) return res.status(404).send("Étudiant non trouvé");
  
      console.log("Etudiant trouve");
      // Création d'une nouvelle instance de Reinscription
      const reinscription = new Reinscription({
        etudiant: etudiant._id,
        nouvelleAnneeUniversitaire: nouvelleAnneeUniversitaire,
      });
      console.log("Sauvegarde en cours");
      // Sauvegarder la réinscription
      const savedReinscription = await reinscription.save();
      console.log("sauvegarde effectuee");
      res.json(savedReinscription);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  // -Effectuer un paiement
  router.post("/etudiants/:id/paiement", async (req, res, next) => {
    const idEtudiant = req.params.id;
  
    try {
      const etudiant = await Etudiant.findById(idEtudiant);
      if (!etudiant) return res.status(404).send("Étudiant non trouvé");
  
      const paiement = new Paiement({
        libelle: req.body.libelle,
        montant: req.body.montant,
        etudiant: etudiant._id,
      });
  
      const savedPaiement = await paiement.save();
      res.status(201).json(savedPaiement);
    } catch (error) {
      console.error("Erreur lors de l'ajout du paiement", error);
      res.status(500).json({ error: "Erreur lors de l'ajout du paiement" });
    }
  });

module.exports = router;
  