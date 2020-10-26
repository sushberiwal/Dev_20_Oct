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
    let pwTypedPromise = tab.type("#input-2" , "12345678");
    return pwTypedPromise;
  })
  .then(function(){
      let loginBtnClickedPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
      return loginBtnClickedPromise;
  })
  .then(function(){
      console.log("logged in !!!");
  })
  .catch(function(error){
      console.log(error);
  })
