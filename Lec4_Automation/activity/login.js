// automation code
// puppeteer ke functions => pending promise dete hain
const puppeteer = require("puppeteer");

// build a browser / open a browser
let tab;
let browserOpenPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

browserOpenPromise
  .then(function (browser) {
    let pagesPromise = browser.pages();
    return pagesPromise;
  })
  .then(function (pages) {
    // in array
    let page = pages[0];
    tab = page;
    let pageOpenedPromise = page.goto("https://www.hackerrank.com/auth/login");
    return pageOpenedPromise;
  })
  .then(function () {
    let idTypedPromise = tab.type("#input-1", "tifet30346@gmajs.net");
    return idTypedPromise;
  })
  .then(function () {
    let pwTypedPromise = tab.type("#input-2", "12345678");
    return pwTypedPromise;
  })
  .then(function () {
    let loginBtnClickedPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"
    );
    return loginBtnClickedPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector("#base-card-1-link", {
      visible: true,
    });
    return waitPromise;
  })
  .then(function () {
    let ipKitClikedPromise = tab.click("#base-card-1-link");
    return ipKitClikedPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector('a[data-attr1="warmup"]', {
      visible: true,
    });
    return waitPromise;
  })
  .then(function () {
    let warmupClikedPromise = tab.click('a[data-attr1="warmup"]');
    return warmupClikedPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function () {
    let allQuestionsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allQuestionsPromise;
  })
  .then(function (allQuestions) {
    // [ <a> </a>  ,  <a> </a>  ,  <a> </a>   ]
    let allLinksPromise = [];
    for (let i = 0; i < allQuestions.length; i++) {
    let linkPendingPromise = tab.evaluate(function (elem) { return elem.getAttribute("href"); } , allQuestions[i]);
    allLinksPromise.push(linkPendingPromise);
    }

    let allQuestionsPromise = Promise.all(allLinksPromise);
    return allQuestionsPromise;
  })
  .then(function(allLinks){
      console.log(allLinks);
  })

  .catch(function (error) {
    console.log(error);
  });
