const AnneeUniversitaire = require("../models/academicYear.model");

const create = async (req, res) => {
  try {
    const anneeUniversitaire = new AnneeUniversitaire(req.body);
    const savedAnneeUniversitaire = await anneeUniversitaire.save();
    res.status(201).json(savedAnneeUniversitaire);
  } catch (error) {
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
};

const read = async (req, res) => {
  try {
    const anneesUniversitaires = await AnneeUniversitaire.find({});
    res.json(anneesUniversitaires);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  try {
    const anneeUniversitaire = await AnneeUniversitaire.findById(req.params.id);
    if (!anneeUniversitaire)
      return res.status(404).send("Année universitaire non trouvée");
    res.json(anneeUniversitaire);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const anneeUniversitaire = await AnneeUniversitaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!anneeUniversitaire)
      return res.status(404).send("Année universitaire non trouvée");
    res.json(anneeUniversitaire);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const anneeUniversitaire = await AnneeUniversitaire.findByIdAndDelete(
      req.params.id
    );

    if (!anneeUniversitaire)
      return res.status(404).send("Année universitaire non trouvée");
    res.json(anneeUniversitaire);
    console.log("Suppression");
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
