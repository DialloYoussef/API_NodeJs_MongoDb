const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // Reference to the "Department" entity
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
); 

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

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


const mongoose = require("mongoose");
const validator = require("validator");

const paymentSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => v >= 0,
        message: "Amount must be positive",
      },
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;


const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;


const mongoose = require("mongoose");
// Table resultante de Department et Level
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


const validator = require("validator");
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;


const mongoose = require("mongoose");
const moment = require("moment");

const academicYearSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      unique: true,
      default: moment().format("YYYY"),
    },
  },
  { timestamps: true }
);

const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);

module.exports = AcademicYear;


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
