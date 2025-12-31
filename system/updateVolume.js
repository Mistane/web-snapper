const Lightnovel = require("../models/lightnovel.model");
const Volume = require("../models/volume.model");
const Chapter = require("../models/chapter.model");

module.exports.markVolumeFinished = async (volumeNumber, lightnovelId) => {
  await Volume.updateOne(
    {
      volNumber: volumeNumber,
      lightNovelId: lightnovelId,
    },
    {
      finished: true,
    },
  );
};
