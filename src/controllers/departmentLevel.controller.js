const DepartementNiveau = require("../models/departmentLevel.model");

const create = async (req, res) => {
  try {
    const departementNiveau = new DepartementNiveau(req.body);
    const savedDepartementNiveau = await departementNiveau.save();
    res.status(201).json(savedDepartementNiveau);
  } catch (error) {
    if (
      error.code === 11000 &&
      (error.keyPattern.departement || error.keyPattern.niveau)
    ) {
      return res.status(400).json({
        error: "La relation entre département et niveau doit être unique",
      });
    }

    console.error(
      "Erreur lors de la création de la relation département-niveau",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la création de la relation département-niveau",
    });
  }
};

const read = async (req, res) => {
  try {
    const departementsNiveaux = await DepartementNiveau.find({});
    res.json(departementsNiveaux);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  try {
    const departementNiveau = await DepartementNiveau.findById(req.params.id);
    if (!departementNiveau)
      return res.status(404).send("Relation département-niveau non trouvée");
    res.json(departementNiveau);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const departementNiveau = await DepartementNiveau.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!departementNiveau)
      return res.status(404).send("Relation département-niveau non trouvée");
    res.json(departementNiveau);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const departementNiveau = await DepartementNiveau.findByIdAndDelete(
      req.params.id
    );

    if (!departementNiveau)
      return res.status(404).send("Relation département-niveau non trouvée");
    res.json(departementNiveau);
    console.log("Suppression de la relation département-niveau");
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
