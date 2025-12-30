const mongoose = require("mongoose");
const lightnovelSchema = new mongoose.Schema(
  {
    title: String,
    volumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volume",
      },
    ],
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
  "Lightnovel",
  lightnovelSchema,
  "light-novels",
);
module.exports = Lightnovel;
