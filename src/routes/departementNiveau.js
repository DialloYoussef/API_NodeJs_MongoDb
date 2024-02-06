const express = require("express");
const DepartementNiveau = require('../models/departementNiveau');
const router = new express.Router();

// -Create 
router.post("/departements-niveaux", async (req, res, next) => {
  try {
    const departementNiveau = new DepartementNiveau(req.body);
    const savedDepartementNiveau = await departementNiveau.save();
    res.status(201).json(savedDepartementNiveau);
  } catch (error) {
    // Vérifie si l'erreur est due à la contrainte d'unicité sur les propriétés "departement" et "niveau"
    if (error.code === 11000 && error.keyPattern && (error.keyPattern.departement || error.keyPattern.niveau)) {
      return res.status(400).json({ error: "La relation entre département et niveau doit être unique" });
    }

    console.error("Erreur lors de la création de la relation département-niveau", error);
    res.status(500).json({ error: "Erreur lors de la création de la relation département-niveau" });
  }
});

// -Read *
router.get("/departements-niveaux", async (req, res) => {
  try {
    const departementsNiveaux = await DepartementNiveau.find({});
    res.json(departementsNiveaux);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Recuperer une relation département-niveau spécifique
router.get("/departements-niveaux/:id", async (req, res, next) => {
  const idDepartementNiveau = req.params.id;
  try {
    const departementNiveau = await DepartementNiveau.findById(idDepartementNiveau);
    if (!departementNiveau) return res.status(404).send("Relation département-niveau non trouvée");
    res.json(departementNiveau);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Update
router.patch("/departements-niveaux/:id", async (req, res, next) => {
  const idDepartementNiveau = req.params.id;
  const updateInfo = Object.keys(req.body);

  try {
    const departementNiveau = await DepartementNiveau.findById(idDepartementNiveau);
    updateInfo.forEach((update) => (departementNiveau[update] = req.body[update]));
    await departementNiveau.save();

    if (!departementNiveau) return res.status(404).send("Relation département-niveau non trouvée");
    res.json(departementNiveau);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Delete
router.delete("/departements-niveaux/:id", async (req, res, next) => {
  const idDepartementNiveau = req.params.id;
  try {
    const departementNiveau = await DepartementNiveau.findByIdAndDelete(idDepartementNiveau);

    if (!departementNiveau) return res.status(404).send("Relation département-niveau non trouvée");
    res.json(departementNiveau);
    console.log("Suppression de la relation département-niveau");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
