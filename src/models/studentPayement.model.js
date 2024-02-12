const mongoose = require("mongoose")

const studentPaymentRelationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
  },
  { timestamps: true }
);

const StudentPaymentRelation = mongoose.model(
  "StudentPaymentRelation",
  studentPaymentRelationSchema
);

module.exports = StudentPaymentRelation;
