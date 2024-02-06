const express = require("express");
const Departement = require('../models/departement');
const router = new express.Router();

// -Create 
router.post("/departements", async (req, res, next) => {
  try {
    const departement = new Departement(req.body);
    const savedDepartement = await departement.save();
    res.status(201).json(savedDepartement);
  } catch (error) {
    // Vérifie si l'erreur est due à la contrainte d'unicité sur la propriété "nom"
    if (error.code === 11000 && error.keyPattern && error.keyPattern.nom) {
      return res.status(400).json({ error: "Le nom du département doit être unique" });
    }

    console.error("Erreur lors de la création du département", error);
    res.status(500).json({ error: "Erreur lors de la création du département" });
  }
});

// -Read *
router.get("/departements", async (req, res) => {
  try {
    const departements = await Departement.find({});
    res.json(departements);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Recuperer un département spécifique
router.get("/departements/:id", async (req, res, next) => {
  const idDepartement = req.params.id;
  try {
    const departement = await Departement.findById(idDepartement);
    if (!departement) return res.status(404).send("Département non trouvé");
    res.json(departement);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Update
router.patch("/departements/:id", async (req, res, next) => {
  const idDepartement = req.params.id;
  const updateInfo = Object.keys(req.body);

  try {
    const departement = await Departement.findById(idDepartement);
    updateInfo.forEach((update) => (departement[update] = req.body[update]));
    await departement.save();

    if (!departement) return res.status(404).send("Département non trouvé");
    res.json(departement);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Delete
router.delete("/departements/:id", async (req, res, next) => {
  const idDepartement = req.params.id;
  try {
    const departement = await Departement.findByIdAndDelete(idDepartement);

    if (!departement) return res.status(404).send("Département non trouvé");
    res.json(departement);
    console.log("Suppression du département");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
