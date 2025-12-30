const cron = require("node-cron");
const defaultConfig = require("./defaultConfig");
const uploadScreenshots = require("./uploadScreenshots");

/*
 /chuong/chuong-number
document.querySelector(".chapter-title-banner").innerText.split(":")[0].split(" ")[1]
*/
let i = 0;

module.exports.getLn = async (website_url) => {
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
    try {
      uploadScreenshots(page, worker, downloadPath, i);
    } catch {
      console.log("lmao loi roi de lam lai");
    }
    i++;
  });
};
