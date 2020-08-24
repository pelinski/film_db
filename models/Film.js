const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    serialNumber: { type: String, unique: true, required: true },
    format: { type: String, default: "35mm" },
    filmType: { type: String, required: true, default: undefined },
    camera: { type: String, default: undefined },
    colorType: { type: String, enum: ["b/w", "color"], default: undefined },
    scan: { type: String, enum: ["CD", "scan", "none"], default: undefined },
    date: {
      year: { type: Number, default: undefined },
      month: [{ type: String, enum: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], default: undefined }]
    },
    location: [{ type: String, default: undefined }],
    comments: { type: String, default: null }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Film", schema);
