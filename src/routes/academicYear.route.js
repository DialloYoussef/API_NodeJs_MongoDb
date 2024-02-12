const express = require("express");
const {
  create,
  read,
  show,
  update,
  deleted,
} = require("../controllers/academicYear.controller");

const router = new express.Router();

// Middleware de body parser pour le format JSON
router.use(express.json());

// Middleware de body parser pour le format URL-encoded
router.use(express.urlencoded({ extended: true }));

// -Create
router.post("/anneesUniversitaires", create);

// -Read *
router.get("/anneesUniversitaires", read);

// -Recuperer une année universitaire spécifique
router.get("/anneesUniversitaires/:id", show);

// -Update
router.patch("/anneesUniversitaires/:id", update);

// -Delete
router.delete("/anneesUniversitaires/:id", deleted);

module.exports = router;
