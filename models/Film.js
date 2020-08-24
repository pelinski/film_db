const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    code: { type: String, unique: true, required: true },
    film: { type: String, required: true, default: "unknown" },
    camera: { type: String, default: "unknown" },
    color_type: { type: String, enum: ["b/w", "color"], default: "unknown" },
    scan: { type: String, enum: ["CD", "scan", "none"], default: "none" },
    date: {
      year: { type: Number, default: "unknown" },
      month: { type: String, default: "unknown" }
    },
    comments: { type: String, default: null }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Film", schema);
