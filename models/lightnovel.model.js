const mongoose = require("mongoose");
const lightnovelSchema = new mongoose.Schema(
  {
    title: String,
    volumes: {
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

const Lightnovel = mongoose.model(
  "LightnovelSchema",
  lightnovelSchema,
  "light-novels",
);
module.exports = Lightnovel;
