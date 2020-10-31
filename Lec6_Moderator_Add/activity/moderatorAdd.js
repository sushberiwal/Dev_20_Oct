const puppeteer = require("puppeteer");

let tab;
let gBrowser;
(async function () {
  try {
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    gBrowser = browser;
    let pages = await browser.pages();
    let page = pages[0];
    tab = page;
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("#input-1", "tifet30346@gmajs.net");
    await page.type("#input-2", "12345678");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button"),
    ]);
    await page.waitForSelector('a[data-analytics="NavBarProfileDropDown"]', {
      visible: true,
    });
    await page.click('a[data-analytics="NavBarProfileDropDown"]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click('a[data-analytics="NavBarProfileDropDownAdministration"]'),
    ]);
    await page.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {
      visible: true,
    });
    let bothLis = await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
    let manageChallenge = bothLis[bothLis.length - 1];
    // <li>  </li>
    // manage challenge page
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      manageChallenge.click(),
    ]);
    await addModerators();
  } catch (error) {
    console.log(error);
  }
})();

async function addModerators() {
  //get links of all questions on current page !
  // [ "link1" , "link2" , "link3"   ];
  await tab.waitForSelector(".backbone.block-center", { visible: true });
  let allATags = await tab.$$(".backbone.block-center");

  let allLinks = [];

  for (let i = 0; i < allATags.length; i++) {
    let link = await tab.evaluate(function (elem) {
      return elem.getAttribute("href");
    }, allATags[i]);
    let completeLink = "https://www.hackerrank.com" + link;
    allLinks.push(completeLink);
  }

  let allModeratorsAddPromise = [];

  for (let i = 0; i < allLinks.length; i++) {
    let newTab = await gBrowser.newPage();
    let moderatorPromise = addModeratorToAQuestion(allLinks[i], newTab);
    allModeratorsAddPromise.push(moderatorPromise);
  }

  await Promise.all(allModeratorsAddPromise);

  // click on next button if visible and call addModerators() else return;

  let allLis = await tab.$$(".pagination li");
  let nextBtn = allLis[allLis.length - 2];

  let isDisabled = tab.evaluate(function (elem) {
    return elem.classList.contains("disabled");
  }, nextBtn);
  if (isDisabled) {
    return;
  }
  await Promise.all([
    tab.waitForNavigation({ waitUntil: "networkidle0" }),
    nextBtn.click(),
  ]);
  await addModerators();
}

async function addModeratorToAQuestion(link, newTab) {
  try {
    await newTab.goto(link);
    await handleConfirmBtn(newTab);
    await newTab.waitForSelector('li[data-tab="moderators"]', {
      visible: true,
    });
    await Promise.all([
      newTab.waitForNavigation({ waitUntil: "networkidle0" }),
      newTab.click('li[data-tab="moderators"]'),
    ]);
    await newTab.waitForSelector("#moderator", { visible: true });
    await newTab.type("#moderator", "sushant");
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();
  } catch (error) {
    return error;
  }
}

async function handleConfirmBtn(newTab) {
  try {
    await newTab.waitForSelector("#confirm-modal", {
      visible: true,
      timeout: 5000,
    });
    await newTab.click("#confirmBtn");
  } catch (error) {
    console.log("Confirm modal not found !!");
    return;
  }
}
