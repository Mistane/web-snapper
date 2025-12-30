const fs = require("fs");
const { imageSize } = require("image-size");
const chapterHelper = require("./updateChapter");
const Chapter = require("../models/chapter.model.js");
const checkInViewport = require("./checkInViewport");

let baseScroll = 22000;
module.exports = async (chapter, page, worker, downloadPath, index) => {
  const el = await page.$('button[title*="Chương tiếp"]');
  if (await el.isIntersectingViewport()) {
    console.log("THay roi haha");
    await el.click();
  } else {
    console.log("sybau chua thay");
  }

  /*
  page
    .locator('button.nav-button[title*="Chương tiếp"]')
    .click()
    .then(async () => {
      console.log("Da thay, anh an day");
      await chapterHelper.updateChapter(chapter, 0);
      console.log(`Chuong thu ${index} Hoan thanh`);
    })
    .catch((err) => {
      console.log("Loi roi");
    });

*/
  await Chapter.updateOne(
    { volumeId: chapter.volumeId },
    {
      $push: { images: { index: index, path: `hello ${index}` } },
    },
  );
  console.log("Da them anh vao chapter");
  // Set viewport width and height
  await page.evaluate((baseScroll) => {
    window.scrollTo(0, baseScroll);
  }, baseScroll);
  baseScroll += 500;

  return chapter;
  /*
  // Capture screenshot
  const imageBuffer = await page.screenshot({
    path: `${downloadPath}/screenshot${index}.jpg`,
  });
  const dimensions = imageSize(imageBuffer);
  console.log(dimensions.width, dimensions.height);

  const ret = await worker.recognize(`${downloadPath}/screenshot${index}.jpg`);
  console.log(ret.data.text);
  baseScroll += dimensions.height;
    */
};
