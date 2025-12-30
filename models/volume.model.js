const mongoose = require("mongoose");
const volumeSchema = new mongoose.Schema(
  {
    volNumber: Number,
    lightNovelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lightnovel",
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
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

const Volume = mongoose.model("Volume", volumeSchema, "volumes");
module.exports = Volume;
