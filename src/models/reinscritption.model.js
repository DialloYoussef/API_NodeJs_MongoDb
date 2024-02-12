const mongoose = require("mongoose");

const reinscriptionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    newAcademicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
  },
  { timestamps: true }
);

const Reinscription = mongoose.model("Reinscription", reinscriptionSchema);

module.exports = Reinscription;
