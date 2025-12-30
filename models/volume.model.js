const mongoose = require("mongoose");
const volumeSchema = new mongoose.Schema(
  {
    volNumber: Number,
    chapters: {
      type: Array,
      default: [],
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Volume = mongoose.model("Volume", volumeSchema, "volumes");
module.exports = Volume;
