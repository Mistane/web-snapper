const cron = require("node-cron");
const defaultConfig = require("./defaultConfig");
const uploadScreenshots = require("./uploadScreenshots");
const checkProgress = require("./checkProgress");
const Chapter = require("../models/chapter.model.js");
const Lightnovel = require("../models/lightnovel.model.js");
const Volume = require("../models/volume.model.js");

//helper
const chapterHelper = require("./updateChapter");
const volumeHelper = require("./updateVolume");
/*
 /chuong/chuong-number
document.querySelector(".chapter-title-banner").innerText.split(":")[0].split(" ")[1]

lời bạt -> kết thúc volume
chương tiếp -> kết thúc chương
*/

//Di tu vol 1 chap 1 cua 1 series bat ki
module.exports.getLn = async (website_url, lightnovelName) => {
  const baseUrl = website_url.split("/chuong/")[0];
  let data = await checkProgress(lightnovelName, baseUrl);
  let currentProgressUrl;
  let { page } = await defaultConfig(website_url, "eng", 1280, 300);
  if (!page) {
    console.log("Lai timeout roi sybau");
    process.exit(1);
  } else {
    console.log("ok ngon");
  }
  let baseScroll = 250;
  let currentUrl = page.url();
  cron.schedule("1 * * * * *", async () => {
    console.log("Sau 1p anh se chay");
    console.log(`url hien tai : ${currentUrl}`);
    let { lightnovel, volume, chapter, downloadPath } = await checkProgress(
      lightnovelName,
      baseUrl,
    );
    console.log(chapter);
    let currentYIndex = chapter.index;
    currentYIndex += 1;
    const scrollPos = baseScroll;
    await page.evaluate((scrollValue) => {
      window.scrollTo(0, scrollValue);
    }, scrollPos);

    const pageTitle = await page.$(".chapter-title-banner");
    const title = await page.evaluate((el) => {
      if (el) return el.innerText;
    }, pageTitle);
    if (title == "Lời bạt") {
      console.log("Het volume");
      await volumeHelper.markVolumeFinished(volume.volNumber, lightnovel._id);
      await page.goto(lightnovel.lightnovelBaseURL);
      let scrollValue = 300;
    } else {
      // Capture screenshot
      //logic upload screenshot------------------------

      const screenshotPath = `${downloadPath}/screenshot-${currentYIndex}.jpg`;
      await page.screenshot({
        path: screenshotPath,
      });
      await Chapter.updateOne(
        { volumeId: chapter.volumeId, chapterNumber: chapter.chapterNumber },
        {
          $set: { index: currentYIndex, url: currentUrl },
          $push: {
            images: {
              path: screenshotPath,
            },
          },
        },
      );

      //check if next page is available ~ end this chapter
      const el = await page.$('button[title*="Chương tiếp"]');
      if (el && (await el.isIntersectingViewport())) {
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
    }
    baseScroll += currentYIndex * 500 - 40; //40 la de bu lai khoang cach
    //-------------------------------------------
  });
};
