const fs = require("fs");
const path = require("path");
const Lightnovel = require("../models/lightnovel.model");
const Volume = require("../models/volume.model");
const Chapter = require("../models/chapter.model");

module.exports = async (lightnovelName) => {
  //Chua co hoac chua tao
  const lightnovelPath = path.resolve(`./screenshots/${lightnovelName}`);

  if (!fs.existsSync(lightnovelPath)) {
    fs.mkdirSync(lightnovelPath, { recursive: true });
  }
  let ln = await Lightnovel.findOne({ title: lightnovelName });
  if (!ln) {
    console.log("Chua ton tai Lightnovel voi tieu de", lightnovelName);
    ln = new Lightnovel({ title: lightnovelName });
    await ln.save();
    console.log("Cap nhat xong lightnovel");
  }

  let volume = await Volume.findOne({
    finished: false,
    lightNovelId: ln._id,
  });
  if (!volume) {
    const volumeCounts = await Volume.countDocuments({ lightNovelId: ln._id });
    volume = new Volume({
      volNumber: volumeCounts + 1,
      lightNovelId: ln._id,
    });
    await volume.save();
    //Cap nhat volume vo lightnovel
    await Lightnovel.updateOne(
      { _id: ln._id },
      {
        $push: { volumes: volume._id },
      },
    );
    console.log("Cap nhat xong volume");
  }

  let chapter = await Chapter.findOne({
    finished: false,
    volumeId: volume._id,
  });
  if (!chapter) {
    const chapterCounts = await Chapter.countDocuments({
      volumeId: volume._id,
    });
    chapter = new Chapter({
      chapterNumber: chapterCounts + 1,
      volumeId: volume._id,
    });
    await chapter.save();
    await Volume.updateOne(
      { _id: volume._id },
      {
        $push: { chapters: chapter._id },
      },
    );
    console.log("Cap nhat xong chapter");
  }

  return {
    lightnovel: ln,
    volume: volume,
    chapter: chapter,
  };
};
