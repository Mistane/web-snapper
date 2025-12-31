const cron = require("node-cron");
const defaultConfig = require("./defaultConfig");
const uploadScreenshots = require("./uploadScreenshots");
const checkProgress = require("./checkProgress");
const Chapter = require("../models/chapter.model.js");
const Lightnovel = require("../models/lightnovel.model.js");
const Volume = require("../models/volume.model.js");

//helper
const chapterHelper = require("./updateChapter");
/*
 /chuong/chuong-number
document.querySelector(".chapter-title-banner").innerText.split(":")[0].split(" ")[1]

lời bạt -> kết thúc volume
chương tiếp -> kết thúc chương
*/
let i = 0;

module.exports.getLn = async (website_url, lightnovelName) => {
  let { page } = await defaultConfig(website_url, "eng", 1280, 300);
  if (!page) {
    console.log("Lai timeout roi sybau");
    process.exit(1);
  } else {
    console.log("ok ngon");
  }
  let baseScroll = 300;
  let currentUrl = page.url();
  cron.schedule("1 * * * * *", async () => {
    console.log("Sau 1p anh se chay");
    console.log(`url hien tai : ${currentUrl}`);
    let { lightnovel, volume, chapter, downloadPath } =
      await checkProgress(lightnovelName);
    console.log(chapter);
    let currentYIndex = chapter.index;
    currentYIndex += 1;
    const scrollPos = 21000 + currentYIndex * 500 - 40; //40 la de bu lai khoang cach
    await page.evaluate((scrollPos) => {
      window.scrollTo(0, scrollPos);
    }, scrollPos);

    // Capture screenshot
    //logic upload screenshot------------------------

    const screenshotPath = `${downloadPath}/screenshot-${currentYIndex}.jpg`;
    await page.screenshot({
      path: screenshotPath,
    });
    await Chapter.updateOne(
      { volumeId: chapter.volumeId, chapterNumber: chapter.chapterNumber },
      {
        $set: { index: currentYIndex },
        $push: {
          images: {
            url: currentUrl,
            path: screenshotPath,
          },
        },
      },
    );

    //check if next page is available ~ end this chapter
    const el = await page.$('button[title*="Chương tiếp"]');
    if (await el.isIntersectingViewport()) {
      console.log("THay roi haha");
      await chapterHelper.markChapterFinished(
        chapter.chapterNumber,
        volume._id,
      );

      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        el.click(),
      ]);
      let newUrl = page.url();
      console.log(`URL cu la : ${currentUrl}`);
      console.log(`URL moi la : ${newUrl}`);
      currentUrl = newUrl;
      baseScroll = 300;
    }
    //-------------------------------------------
    i++;
  });
};
