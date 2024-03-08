import puppeteer from "puppeteer";
import url from "url";

const inputUrl = process.argv[2];

if (!inputUrl) {
  console.error("Please provide a URL as a command line argument.");
  process.exit(1);
}

let urlObj;
try {
  urlObj = new URL(inputUrl);
} catch (err) {
  console.error("The provided argument is not a valid URL.");
  process.exit(1);
}

const validProtocols = ["http:", "https:"];

if (!validProtocols.includes(urlObj.protocol)) {
  console.error("The provided URL must use HTTP or HTTPS protocol.");
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--start-maximized",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-notifications",
      "--disable-geolocation",
      "--disable-infobars",
      "--disable-popup-blocking",
    ],
  });
  const page = await browser.newPage();
  await page.goto(inputUrl);
  await page.screenshot({ path: "example.png" });
  await browser.close();
})();
