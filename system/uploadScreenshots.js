const fs = require("fs");
const { imageSize } = require("image-size");

let baseScroll = 0;
module.exports = async (page, worker, downloadPath, index) => {
  // Set viewport width and height
  await page.evaluate((baseScroll) => {
    window.scrollTo(0, baseScroll);
  }, baseScroll);

  // Capture screenshot
  const imageBuffer = await page.screenshot({
    path: `${downloadPath}/screenshot${index}.jpg`,
  });
  const dimensions = imageSize(imageBuffer);
  console.log(dimensions.width, dimensions.height);

  const ret = await worker.recognize(`${downloadPath}/screenshot${index}.jpg`);
  console.log(ret.data.text);
  baseScroll += dimensions.height;
};
