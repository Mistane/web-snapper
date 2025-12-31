const Lightnovel = require("../models/lightnovel.model");
const Volume = require("../models/volume.model");
const Chapter = require("../models/chapter.model");

module.exports.markChapterFinished = async (chapterNumber, volumeId) => {
  await Chapter.updateOne(
    {
      chapterNumber: chapterNumber,
      volumeId: volumeId,
    },
    {
      finished: true,
    },
  );
};
