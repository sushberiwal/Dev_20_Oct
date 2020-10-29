const puppeteer = require("puppeteer");

(async function () {
  try {
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("#input-1", "tifet30346@gmajs.net");
    await page.type("#input-2", "12345678");
    await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
  } 
  catch (error) {

  }
})();
