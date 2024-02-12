const Niveau = require("../models/level.model");

const create = async (req, res) => {
  try {
    const niveau = new Niveau(req.body);
    const savedNiveau = await niveau.save();
    res.status(201).json(savedNiveau);
  } catch (error) {
    // Vérifie si l'erreur est due à la contrainte d'unicité sur la propriété "label"
    if (error.code === 11000 && error.keyPattern && error.keyPattern.label) {
      return res
        .status(400)
        .json({ error: "Le libellé du niveau doit être unique" });
    }

    console.error("Erreur lors de la création du niveau", error);
    res.status(500).json({ error: "Erreur lors de la création du niveau" });
  }
};

const read = async (req, res) => {
  try {
    const niveaux = await Niveau.find({});
    res.json(niveaux);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  const idNiveau = req.params.id;
  try {
    const niveau = await Niveau.findById(idNiveau);
    if (!niveau) return res.status(404).send("Niveau non trouvé");
    res.json(niveau);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const idNiveau = req.params.id;

  try {
    const niveau = await Niveau.findByIdAndUpdate(idNiveau, req.body, {
      new: true,
    });

    if (!niveau) return res.status(404).send("Niveau non trouvé");
    res.json(niveau);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleted = async (req, res) => {
  const idNiveau = req.params.id;
  try {
    const niveau = await Niveau.findByIdAndDelete(idNiveau);

    if (!niveau) return res.status(404).send("Niveau non trouvé");
    res.json(niveau);
    console.log("Suppression du niveau");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  read,
  show,
  update,
  deleted,
};
