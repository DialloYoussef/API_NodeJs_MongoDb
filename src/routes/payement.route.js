const express = require("express");
const {
  create,
  readAll,
  show,
  update,
  deleted
} = require("../controllers/payement.controller");
const router = new express.Router();

// Middleware de body parser pour le format JSON
router.use(express.json());

// Middleware de body parser pour le format URL-encoded
router.use(express.urlencoded({ extended: true }));

// -Create
router.post("/paiements", create);

// -Read *
router.get("/paiements", readAll);

// -Recuperer un paiement spécifique
router.get("/paiements/:id", show);

// -Update
router.patch("/paiements/:id", update);

// -Delete
router.delete("/paiements/:id", deleted);

module.exports = router;
