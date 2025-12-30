const puppeteer = require("puppeteer");
const fs = require("fs");
const { createWorker } = require("tesseract.js");
const path = require("path");

module.exports = async (websiteURL, language, defaultWidth, defaultHeight) => {
  try {
    const worker = await createWorker(language);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: defaultWidth, height: defaultHeight });
    await page.goto(websiteURL, { waitUntil: "networkidle0" });
    const downloadPath = path.resolve("./screenshots3");

    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }
    return {
      worker: worker,
      page: page,
      downloadPath: downloadPath,
    };
  } catch {
    return {
      worker: null,
      page: null,
      downloadPath: null,
    };
  }
};
