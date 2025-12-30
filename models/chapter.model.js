const mongoose = require("mongoose");
const chapterSchema = new mongoose.Schema(
  {
    title: String,
    path: String,
    index: Number, //xac dinh xem dang dung lai o dau
    finished: {
      type: Boolean,
      default: False,
    },
  },
  {
    timestamps: true,
  },
);

const Chapter = mongoose.model("ChapterSchema", chapterSchema, "chapters");
module.exports = Chapter;
