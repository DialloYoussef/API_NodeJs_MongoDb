const moment = require("moment");
const Reinscription = require("../models/reinscritption.model");
const Student = require("../models/student.model");
const DepartmentLevel = require("../models/departmentLevel.model");
const Payment = require("../models/payement.model");
const AcademicYear = require("../models/academicYear.model");
const StudentPaymentRelation = require("../models/studentPayement.model");

const inscription = async (req, res) => {
  try {
    // Création d'un nouvel étudiant
    const student = new Student({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      registrationNumber: req.body.registrationNumber,
      department: req.body.department,
    });

    // Enregistrement de l'étudiant
    await student.save();

    // Recherche des montants associés au département de l'étudiant
    const departmentLevel = await DepartmentLevel.findOne({
      department: student.department,
    });

    if (!departmentLevel) {
      return res.status(500).json({
        error:
          "Impossible de trouver les montants associés au département de l'étudiant",
      });
    }

    // Création d'une réinscription associée à l'étudiant pour l'année en cours
    const currentAcademicYear = await AcademicYear.findOne({}); // À adapter selon votre modèle AcademicYear
    const reinscription = new Reinscription({
      student: student._id,
      newAcademicYear: currentAcademicYear._id,
    });

    // Enregistrement de la réinscription
    await reinscription.save();

    // Création d'un paiement pour les frais de réinscription
    // const reenrollmentPayment = new Payment({
    //   label: "Frais de réinscription",
    //   amount: departmentLevel.reenrollmentFee,
    // });

    // // Enregistrement du paiement
    // await reenrollmentPayment.save();

    // // Ajout du paiement à la liste des paiements de l'étudiant
    // student.payments.push(reenrollmentPayment._id);
    // await student.save();

    res.status(201).json(student);
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'étudiant", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'inscription de l'étudiant" });
  }
};

const payement = async (req, res) => {
  const registrationNumber = req.params.registrationNumber;

  try {
    // Recherche de l'étudiant par son numéro d'inscription
    const student = await Student.findOne({ registrationNumber });

    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }

    // Création d'un paiement associé à l'étudiant
    const payment = new Payment({
      label: req.body.label,
      amount: req.body.amount,
    });

    // Enregistrement du paiement
    await payment.save();

    // Création d'une relation entre l'étudiant, le paiement et l'année universitaire
    const paymentRelation = new StudentPaymentRelation({
      student: student._id,
      payment: payment._id,
      academicYear: req.body.academicYear, // On passe l'ID de l'année universitaire appropriée ici
    });

    // Enregistrement de la relation
    await paymentRelation.save();

    res.status(201).json(payment);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du paiement", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement du paiement" });
  }
};

const verifStudent = async (req, res) => {
  const registrationNumber = req.params.registrationNumber;

  try {
    const student = await Student.findOne({ registrationNumber });

    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }

    const studentPayments = await StudentPaymentRelation.find({
      student: student._id,
    }).populate("payment academicYear");

    const currentMonth = new Date().getMonth() + 1; // +1 car les mois sont indexés à partir de 0

    const departmentLevel = await DepartmentLevel.findOne({
      department: student.department,
    });

    if (!departmentLevel) {
      return res
        .status(500)
        .json({ error: "Configuration de département non trouvée" });
    }

    let requiredAmount = 0;

    // Déterminer la tranche correspondante en fonction du mois actuel
    if (currentMonth >= 10 && currentMonth <= 12) {
      requiredAmount = departmentLevel.tranche1;
    } else if (currentMonth >= 1 && currentMonth <= 3) {
      requiredAmount = departmentLevel.tranche2;
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      requiredAmount = departmentLevel.tranche3;
    }

    const totalPaidCurrentYear = studentPayments.reduce((acc, relation) => {
      const payment = relation.payment;
      const academicYear = relation.academicYear;

      // Vérifier si le paiement est pour l'année universitaire actuelle
      if (academicYear && academicYear.year === moment().format("YYYY")) {
        acc += payment.amount;
      }

      return acc;
    }, 0);

    const remainingAmount = requiredAmount - totalPaidCurrentYear;
    const remainingAmountForYear = remainingAmount < 0 ? 0 : remainingAmount;
    const isCompliant = totalPaidCurrentYear >= requiredAmount;

    res.json({
      registrationNumber: student.registrationNumber,
      totalPaid: totalPaidCurrentYear,
      requiredAmount,
      remainingAmount,
      remainingAmountForYear,
      isCompliant,
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de la conformité", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la vérification de la conformité" });
  }
};

const paymentStudent = async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const academicYearId = req.params.academicYearId;

  try {
    // Recherche de l'étudiant par son numéro d'inscription
    const student = await Student.findOne({ registrationNumber });

    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }

    // Recherche des paiements de l'étudiant pour l'année universitaire spécifiée
    const paymentRelations = await StudentPaymentRelation.find({
      student: student._id,
      academicYear: academicYearId,
    }).populate("payment");

    // Extrait les paiements de la relation
    const payments = paymentRelations.map((relation) => relation.payment);

    // Calcul du montant total payé
    const totalPaid = payments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );

    res.json({
      payments,
      totalPaid,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des paiements de l'étudiant",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des paiements de l'étudiant",
    });
  }
};

const deleted = async (req, res) => {
  const idEtudiant = req.params.id;
  try {
    const etudiant = await Etudiant.findByIdAndDelete(idEtudiant);

    if (!etudiant) return res.status(404).send("Étudiant non trouvé");
    res.json(etudiant);
    console.log("Suppression de l'étudiant");
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res) => {
  const idEtudiant = req.params.id;
  try {
    const etudiant = await Etudiant.findById(idEtudiant);
    if (!etudiant) return res.status(404).send("Étudiant non trouvé");
    res.json(etudiant);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const idEtudiant = req.params.id;

  try {
    const etudiant = await Etudiant.findByIdAndUpdate(idEtudiant, req.body, {
      new: true,
    });

    if (!etudiant) return res.status(404).send("Étudiant non trouvé");
    res.json(etudiant);
  } catch (error) {
    res.status(500).send(error);
  }
};

const read = async (req, res) => {
  try {
    const etudiants = await Etudiant.find({});
    res.json(etudiants);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  inscription,
  payement,
  verifStudent,
  paymentStudent,
  deleted,
  show,
  update,
  read,
};
