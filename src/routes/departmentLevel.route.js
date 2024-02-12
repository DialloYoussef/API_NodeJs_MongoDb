const express = require("express");
const {create, read, show, update, deleted} = require('../controllers/departmentLevel.controller')
const router = new express.Router();

// Middleware de body parser pour le format JSON
router.use(express.json());

// Middleware de body parser pour le format URL-encoded
router.use(express.urlencoded({ extended: true }));

// -Create 
router.post("/departements-niveaux", create);

// -Read *
router.get("/departements-niveaux", read);

// -Recuperer une relation département-niveau spécifique
router.get("/departements-niveaux/:id", show);

// -Update
router.patch("/departements-niveaux/:id", update);

// -Delete
router.delete("/departements-niveaux/:id", deleted);

module.exports = router;
