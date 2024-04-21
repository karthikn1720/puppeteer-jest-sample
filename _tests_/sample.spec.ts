import puppeteer, { Browser, Page } from "puppeteer";


let browser: Browser;
let page: Page;


describe("Portfolio", () => {

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
    await page.goto("https://karthikn1720.github.io/portfolio-v2");
  });

  afterAll(async () => {
    console.log('test completed')
    browser.close();
  })

  it('should be able to submit form', async () => {
    await page.click('#root > div > div > div.header-container.border > div.right.h100 > div > p')
    await page.type('#name', 'karthik')
    await page.type('#email', 'karthik.cs1720@gmail.com')
    await page.type('#message', 'Hello There!')
    await new Promise(r => setTimeout(r, 1000));
    await page.click('.button-container')
    await new Promise(r => setTimeout(r, 5000));
    await page.waitForSelector('.thank-you-container')
    const textData = await page.evaluate(() => {
      const text = document.querySelector('.thank-you-container')
      return text?.innerHTML
    })
    expect(textData).not.toBeNull();
  });
});
