const cron = require("node-cron");
const defaultConfig = require("./defaultConfig");
const uploadScreenshots = require("./uploadScreenshots");
const checkProgress = require("./checkProgress");

/*
 /chuong/chuong-number
document.querySelector(".chapter-title-banner").innerText.split(":")[0].split(" ")[1]

lời bạt -> kết thúc volume
chương tiếp -> kết thúc chương
*/
let i = 0;

module.exports.getLn = async (website_url, lightnovelName) => {
  let { lightnovel, volume, chapter } = await checkProgress(lightnovelName);
  let { worker, page, downloadPath } = await defaultConfig(
    website_url,
    "eng",
    1280,
    300,
  );
  if (!worker || !page) {
    console.log("Lai timeout roi sybau");
    process.exit(1);
  } else {
    console.log("ok ngon");
  }
  cron.schedule("1 * * * * *", async () => {
    console.log("Sau 1p anh se chay");
    let updatedChapter = await uploadScreenshots(
      chapter,
      page,
      worker,
      downloadPath,
      i,
    );
    if (updatedChapter.finished) {
      console.log("Het chuong roi gg");
    }
    console.log(updatedChapter);
    i++;
  });
};
