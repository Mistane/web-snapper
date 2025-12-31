const mongoose = require("mongoose");
const chapterSchema = new mongoose.Schema(
  {
    chapterNumber: Number,
    title: String,
    images: [
      {
        url: String,
        path: String,
      },
    ],
    index: {
      type: Number,
      default: 0,
    }, //xac dinh xem dang dung lai o dau
    finished: {
      type: Boolean,
      default: false,
    },
    volumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volume",
    },
  },
  {
    timestamps: true,
  },
);

const Chapter = mongoose.model("Chapter", chapterSchema, "chapters");
module.exports = Chapter;
