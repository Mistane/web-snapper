const Lightnovel = require("../models/lightnovel.model");
const Volume = require("../models/volume.model");
const Chapter = require("../models/chapter.model");

module.exports.updateChapter = async (chapter, index) => {
  if (index == 0) {
    await Chapter.updateOne(
      {
        volumeId: chapter.volumeId,
        finished: false,
      },
      {
        finished: true,
      },
    );
  } else {
    await Chapter.updateOne(
      {
        volumeId: chapter.volumeId,
        finished: false,
      },
      {
        index: index,
      },
    );
  }
};
