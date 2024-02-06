const express = require("express");
const Niveau = require('../models/niveau');
const router = new express.Router();

// -Create 
router.post("/niveaux", async (req, res, next) => {
  try {
    const niveau = new Niveau(req.body);
    const savedNiveau = await niveau.save();
    res.status(201).json(savedNiveau);
  } catch (error) {
    // Vérifie si l'erreur est due à la contrainte d'unicité sur la propriété "libelle"
    if (error.code === 11000 && error.keyPattern && error.keyPattern.libelle) {
      return res.status(400).json({ error: "Le libellé du niveau doit être unique" });
    }

    console.error("Erreur lors de la création du niveau", error);
    res.status(500).json({ error: "Erreur lors de la création du niveau" });
  }
});

// -Read *
router.get("/niveaux", async (req, res) => {
  try {
    const niveaux = await Niveau.find({});
    res.json(niveaux);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Recuperer un niveau spécifique
router.get("/niveaux/:id", async (req, res, next) => {
  const idNiveau = req.params.id;
  try {
    const niveau = await Niveau.findById(idNiveau);
    if (!niveau) return res.status(404).send("Niveau non trouvé");
    res.json(niveau);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Update
router.patch("/niveaux/:id", async (req, res, next) => {
  const idNiveau = req.params.id;
  const updateInfo = Object.keys(req.body);

  try {
    const niveau = await Niveau.findById(idNiveau);
    updateInfo.forEach((update) => (niveau[update] = req.body[update]));
    await niveau.save();

    if (!niveau) return res.status(404).send("Niveau non trouvé");
    res.json(niveau);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Delete
router.delete("/niveaux/:id", async (req, res, next) => {
  const idNiveau = req.params.id;
  try {
    const niveau = await Niveau.findByIdAndDelete(idNiveau);

    if (!niveau) return res.status(404).send("Niveau non trouvé");
    res.json(niveau);
    console.log("Suppression du niveau");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
