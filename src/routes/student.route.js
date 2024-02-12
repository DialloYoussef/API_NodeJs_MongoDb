const express = require("express");
const router = express.Router();
const {
  inscription,
  payement,
  verifStudent,
  paymentStudent,
  deleted,
  show,
  update,
  read,
} = require("../controllers/student.controller");

// Middleware de body parser pour le format JSON
router.use(express.json());

// Middleware de body parser pour le format URL-encoded
router.use(express.urlencoded({ extended: true }));

// -Inscription d'un Etudiant
router.post("/students", inscription);

// -Paiement d'un Etudiant
router.post("/students/:registrationNumber/payments", payement);

// -Route pour afficher la liste de tous les paiements d'un étudiant pour une année universitaire
router.get(
  "/students/:registrationNumber/payments/:academicYearId",
  paymentStudent
);

// Route pour vérifier si un étudiant est conforme aux paiements
router.get("/verify/:registrationNumber", verifStudent);

router.get("/etudiants", read);

// -Recuperer un étudiant spécifique
router.get("/etudiants/:id", show);

// -Update
router.patch("/etudiants/:id", update);

// -Delete
router.delete("/etudiants/:id", deleted);

module.exports = router;
