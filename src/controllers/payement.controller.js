const Paiement = require("../models/payement.model");

const create = async (req, res) => {
  try {
    const paiement = new Paiement(req.body);
    const savedPaiement = await paiement.save();
    res.status(201).json(savedPaiement);
  } catch (error) {
    console.error("Erreur lors de la création du paiement", error);
    res.status(400).json({ error: "Erreur lors de la création du paiement" });
  }
};

const readAll = async (req, res) => {
  try {
    const paiements = await Paiement.find({});
    res.json(paiements);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  const idPaiement = req.params.id;
  try {
    const paiement = await Paiement.findById(idPaiement);
    if (!paiement) return res.status(404).send("Paiement non trouvé");
    res.json(paiement);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const idPaiement = req.params.id;

  try {
    const paiement = await Paiement.findByIdAndUpdate(idPaiement, req.body, {
      new: true,
    });

    if (!paiement) return res.status(404).send("Paiement non trouvé");
    res.json(paiement);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleted = async (req, res) => {
  const idPaiement = req.params.id;
  try {
    const paiement = await Paiement.findByIdAndDelete(idPaiement);

    if (!paiement) return res.status(404).send("Paiement non trouvé");
    res.json(paiement);
    console.log("Suppression du paiement");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  readAll,
  show,
  update,
  deleted,
};
