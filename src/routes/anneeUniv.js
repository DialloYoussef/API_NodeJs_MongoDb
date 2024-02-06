const express = require("express");
const AnneeUniversitaire = require("../models/anneeUniv");
const router = new express.Router();

// -Create
router.post("/anneesUniversitaires", async (req, res, next) => {
  try {
    const anneeUniversitaire = new AnneeUniversitaire(req.body);
    const savedAnneeUniversitaire = await anneeUniversitaire.save();
    res.status(201).json(savedAnneeUniversitaire);
  } catch (error) {
    // Vérifie si l'erreur est due à la contrainte d'unicité sur la propriété "annee"
    if (error.code === 11000 && error.keyPattern && error.keyPattern.annee) {
      return res
        .status(400)
        .json({ error: "L'année universitaire doit être unique" });
    }

    console.error("Erreur lors de la création de l'année universitaire", error);
    res
      .status(400)
      .json({ error: "Erreur lors de la création de l'année universitaire" });
  }
});

// -Read *
router.get("/anneesUniversitaires", async (req, res) => {
  try {
    const anneesUniversitaires = await AnneeUniversitaire.find({});
    res.json(anneesUniversitaires);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Recuperer une année universitaire spécifique
router.get("/anneesUniversitaires/:id", async (req, res, next) => {
  const idAnneeUniversitaire = req.params.id;
  try {
    const anneeUniversitaire = await AnneeUniversitaire.findById(
      idAnneeUniversitaire
    );
    if (!anneeUniversitaire)
      return res.status(404).send("Année universitaire non trouvée");
    res.json(anneeUniversitaire);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Update
router.patch("/anneeUniversitaire/:id", async (req, res, next) => {
  const idAnneeUniversitaire = req.params.id;
  const updateInfo = Object.keys(req.body);

  try {
    const anneeUniversitaire = await AnneeUniversitaire.findById(
      idAnneeUniversitaire
    );
    updateInfo.forEach(
      (update) => (anneeUniversitaire[update] = req.body[update])
    );
    await anneeUniversitaire.save();

    if (!anneeUniversitaire)
      return res.status(404).send("Année universitaire non trouvée");
    res.json(anneeUniversitaire);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Delete
router.delete("/anneesUniversitaires/:id", async (req, res, next) => {
  const idAnneeUniversitaire = req.params.id;
  try {
    const anneeUniversitaire = await AnneeUniversitaire.findByIdAndDelete(
      idAnneeUniversitaire
    );

    if (!anneeUniversitaire)
      return res.status(404).send("Année universitaire non trouvée");
    res.json(anneeUniversitaire);
    console.log("Suppression");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
