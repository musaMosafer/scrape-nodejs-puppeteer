// version: 1.0.0
const puppeteer = require("puppeteer");
// import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';
const fs = require("fs");

let scrape = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false }); // this is for a test .. default is true
  //   const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://cryptopanic.com/";
  function trimLastSlash(site) {
    return site.replace(/\/$/, "");
  }
  const url_withoutLastSlash = trimLastSlash(url);
  const domain = "cryptopanic.com";
  let my_wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  };

  console.log("url = " + url);
  // Navigate the page to a URL.
  //   await page.goto(url);
  // await page.goto(website_url, { waitUntil: "networkidle0" });
  const start_ms = new Date().getTime();
  console.log(new Date().getTime());
  await page.goto(url, { timeout: 150000 });
  const ends_ms = new Date().getTime();
  let my_ms = ends_ms - start_ms;
  console.log("ms = " + my_ms);
  let seconds = Math.floor(my_ms / 1000);
  console.log("s = " + seconds);

  console.log("getting page url is finished.");
  // my_wait(5000); //5 seconds in milliseconds

  //   <div class="app-layout"></div>
  // await page
  //   .locator("a.btn[type=button]")
  //   .filter((a) => a.innerText === "Accept")
  //   .click();

  await page.locator(".app-layout>:nth-child(4) a[type=button]").click();
  console.log("clicking is finished.");
  // my_wait(5000); //5 seconds in milliseconds

  let response = await page.evaluate(() => {
    console.log(" page.evaluate is starting! ");
    let wait = (ms) => {
      var start = new Date().getTime();
      var end = start;
      while (end < start + ms) {
        end = new Date().getTime();
      }
    };
    // console.log(document.title);
    // wait(6000); //6 seconds in milliseconds
    // console.log("lets continue!");

    // const privacybox_layout = document.querySelector(".app-layout");
    // const privacybox = privacybox_layout.children[3];
    // const privacy_linkbtn = privacybox.querySelector("a.btn");
    // console.log("privacybox_layout:");
    // console.log(privacybox_layout);
    // console.log("privacybox:");
    // console.log(privacybox);
    // console.log("privacy_linkbtn:");
    // console.log(privacy_linkbtn);

    // console.log("before-link will be clicked!");
    // wait(7000); //7 seconds in milliseconds
    // privacy_linkbtn.click();
    // console.log("after-link is now clicked!");
    // wait(5000); //5 seconds in milliseconds
    // console.log("continue!");

    let items = document.querySelectorAll(".news-row");
    console.log("items.length = " + items.length);
    // console.log(
    //   url_withoutLastSlash +
    //     items[1].querySelector("a.nc-title").getAttribute("href")
    // );
    wait(12000); //6 seconds in milliseconds
    // console.log(items[1].outerHTML);
    // wait(12000); //6 seconds in milliseconds

    let results = [];
    let a = 0;

    items.forEach((item) => {
      try {
        console.log(a++);
        let link = item.querySelector("a.nc-title");
        console.log(link.getAttribute("href"));
        // wait(5000); //6 seconds in milliseconds
        let title = link.querySelector("span>span");
        console.log(title.innerText);
        // wait(5000); //6 seconds in milliseconds

        results.push({
          title: title.innerText,
          link: link.getAttribute("href"),
        });
        // console.log(results);
        // wait(12000); //6 seconds in milliseconds
      } catch (error) {}
    });
    return results;
  });
  browser.close();
  return response;
};

scrape()
  .then((res) => {
    //console.log(res);
    fs.writeFile("cryptopanic.json", JSON.stringify(res), "utf8", () => {
      console.log("files has been created successfully!");
    });
  })
  .catch((_err) => {
    console.log(_err);
  });
