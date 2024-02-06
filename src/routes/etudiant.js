const express = require("express");

const Etudiant = require("../models/etudiant");

const router = new express.Router();

// -Create
// router.post("/etudiants/inscription", async (req, res, next) => {
//   try {
//     const etudiant = new Etudiant(req.body);
//     const savedEtudiant = await etudiant.save();
//     res.status(201).json(savedEtudiant);
//   } catch (error) {
//     console.error("Erreur lors de l'inscription de l'étudiant", error);
//     res
//       .status(500)
//       .json({ error: "Erreur lors de l'inscription de l'étudiant" });
//   }
// });

// -Read *

router.get("/etudiants", async (req, res) => {
  try {
    const etudiants = await Etudiant.find({});
    res.json(etudiants);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Recuperer un étudiant spécifique
router.get("/etudiants/:id", async (req, res, next) => {
  const idEtudiant = req.params.id;
  try {
    const etudiant = await Etudiant.findById(idEtudiant);
    if (!etudiant) return res.status(404).send("Étudiant non trouvé");
    res.json(etudiant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Update
router.patch("/etudiants/:id", async (req, res, next) => {
  const idEtudiant = req.params.id;
  const updateInfo = Object.keys(req.body);

  try {
    const etudiant = await Etudiant.findById(idEtudiant);
    updateInfo.forEach((update) => (etudiant[update] = req.body[update]));
    await etudiant.save();

    if (!etudiant) return res.status(404).send("Étudiant non trouvé");
    res.json(etudiant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Delete
router.delete("/etudiants/:id", async (req, res, next) => {
  const idEtudiant = req.params.id;
  try {
    const etudiant = await Etudiant.findByIdAndDelete(idEtudiant);

    if (!etudiant) return res.status(404).send("Étudiant non trouvé");
    res.json(etudiant);
    console.log("Suppression de l'étudiant");
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
