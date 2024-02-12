const Departement = require("../models/department.model");

const create = async (req, res) => {
  try {
    const departement = new Departement(req.body);
    const savedDepartement = await departement.save();
    res.status(201).json(savedDepartement);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.nom) {
      return res
        .status(400)
        .json({ error: "Le nom du département doit être unique" });
    }

    console.error("Erreur lors de la création du département", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création du département" });
  }
};

const read = async (req, res) => {
  try {
    const departements = await Departement.find({});
    res.json(departements);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  try {
    const departement = await Departement.findById(req.params.id);
    if (!departement) return res.status(404).send("Département non trouvé");
    res.json(departement);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const departement = await Departement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!departement) return res.status(404).send("Département non trouvé");
    res.json(departement);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const departement = await Departement.findByIdAndDelete(req.params.id);

    if (!departement) return res.status(404).send("Département non trouvé");
    res.json(departement);
    console.log("Suppression du département");
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
