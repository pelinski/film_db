const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    serialNumber: { type: String, required: true },
    filmId: { album: { type: String, required: true, default: "A" }, number: { type: Number, required: true } },
    format: { type: String, default: "35mm" },
    filmType: { type: String, required: true, default: null },
    ISO: { type: Number, default: null },
    camera: { type: String, default: null },
    colorType: { type: String, enum: ["b/w", "color"], default: null },
    scan: { type: String, enum: ["CD", "scan", "none"], default: null },
    date: {
      year: { type: Number, default: null },
      month: [{ type: String, enum: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], default: null }]
    },
    location: [{ type: String, default: null }],
    comments: { type: String, default: null }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Film", schema);
