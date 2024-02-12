const express = require("express");

const {
  create,
  read,
  show,
  update,
  deleted,
} = require("../controllers/level.controller");
const router = new express.Router();

// Middleware de body parser pour le format JSON
router.use(express.json());

// Middleware de body parser pour le format URL-encoded
router.use(express.urlencoded({ extended: true }));

// -Create
router.post("/niveaux", create);

// -Read *
router.get("/niveaux", read);

// -Recuperer un niveau spécifique
router.get("/niveaux/:id", show);

// -Update
router.patch("/niveaux/:id", update);

// -Delete
router.delete("/niveaux/:id", deleted);

module.exports = router;
