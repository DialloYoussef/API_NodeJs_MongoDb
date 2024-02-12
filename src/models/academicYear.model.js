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
