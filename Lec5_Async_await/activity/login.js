const puppeteer = require("puppeteer");
const challenges = require("./challenges");
// [  {} , {} , {} , {} ,{}  ]

(async function () {
  try {
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    })
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("#input-1", "tifet30346@gmajs.net");
    await page.type("#input-2", "12345678");    
    await Promise.all([ page.waitForNavigation({waitUntil:"networkidle0"})   , page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button") ]);
    await page.waitForSelector('a[data-analytics="NavBarProfileDropDown"]' , {visible:true}); 
    await page.click('a[data-analytics="NavBarProfileDropDown"]');
    await Promise.all([ page.waitForNavigation({waitUntil:"networkidle0"})   , page.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
    await page.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await page.$$(".nav-tabs.nav.admin-tabbed-nav li");
    let manageChallenge = bothLis[bothLis.length-1];
    // <li>  </li>   
    await Promise.all([ page.waitForNavigation({waitUntil:"networkidle0"})   , manageChallenge.click() ]);
    await Promise.all([ page.waitForNavigation({waitUntil:"networkidle0"})   , page.click(".btn.btn-green.backbone.pull-right")]);
    // pending promise to create one challenge
    // await createChallenge(challenges[0]);
  } 
  catch (error) {

  }
})();


// async function createChallenge(challenge){

// }
