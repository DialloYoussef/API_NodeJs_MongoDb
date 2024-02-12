const express = require("express");
const {
  create,
  read,
  show,
  update,
  deleted,
} = require("../controllers/department.controller");

const router = new express.Router();

// Middleware de body parser pour le format JSON
router.use(express.json());

// Middleware de body parser pour le format URL-encoded
router.use(express.urlencoded({ extended: true }));

// -Create 
router.post("/departements", create);

// -Read *
router.get("/departements", read);

// -Recuperer un département spécifique
router.get("/departements/:id", show);

// -Update
router.patch("/departements/:id", update);

// -Delete
router.delete("/departements/:id", deleted);

module.exports = router;
