const express = require("express");
const { Paiement } = require('../models/paiement')
const router = new express.Router();

// -Create 
router.post("/paiements", async (req, res, next) => {
  try {
    const paiement = new Paiement(req.body);
    const savedPaiement = await paiement.save();
    res.status(201).json(savedPaiement);
  } catch (error) {
    console.error("Erreur lors de la création du paiement", error);
    res.status(400).json({ error: "Erreur lors de la création du paiement" });
  }
});

// -Read *
router.get("/paiements", async (req, res) => {
  try {
    const paiements = await Paiement.find({});
    res.json(paiements);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Recuperer un paiemnt specifique
router.get("/paiements/:id", async (req, res, next) => {
  const idPaiement = req.params.id;
  try {
    const paiemnt = await Paiement.findById(idPaiement);
    if (!paiemnt) return res.status(404).send("Paiement non trouvé");
    res.json(paiemnt);
  } catch (error) {
    res.status(500).send(error);
  }
});

// -Update
router.patch("/paiement/:id", async (req, res, next) => {
  const idPaiement = req.params.id;
  const updateInfo = Object.keys(req.body);

  try {
    const paiement = await Paiement.findById(idPaiement);
    updateInfo.forEach((update) => (paiement[update] = req.body[update]));
    await paiement.save();

    if (!paiement) return res.status(404).send("Paiement non trouvé");
    res.json(paiement);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete
router.delete("/paiements/:id", async (req, res, next) => {
  const idPaiement = req.params.id;
  try {
    const paiement = await Paiement.findByIdAndDelete(idPaiement);

    if (!paiement) return res.status(404).send("Paiement non trouvé");
    res.json(paiement);
    console.log("suppression");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
