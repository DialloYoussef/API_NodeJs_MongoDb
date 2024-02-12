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
