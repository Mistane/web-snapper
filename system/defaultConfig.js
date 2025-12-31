const puppeteer = require("puppeteer");

module.exports = async (websiteURL, language, defaultWidth, defaultHeight) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: defaultWidth, height: defaultHeight });
    await page.goto(websiteURL, { waitUntil: "networkidle0" });
    return {
      page: page,
    };
  } catch {
    return {
      page: null,
    };
  }
};
