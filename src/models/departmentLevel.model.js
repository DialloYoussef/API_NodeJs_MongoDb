const mongoose = require("mongoose");

const departmentLevelSchema = new mongoose.Schema(
  {
    annualAmount: {
      type: Number,
      required: true,
    },
    tranche1: {
      type: Number,
      required: true,
    },
    tranche2: {
      type: Number,
      required: true,
    },
    tranche3: {
      type: Number,
      required: true,
    },
    reenrollmentFee: {
      type: Number,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },
  },
  { timestamps: true }
);

const DepartmentLevel = mongoose.model(
  "DepartmentLevel",
  departmentLevelSchema
);

module.exports = DepartmentLevel;
