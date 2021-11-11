import puppeteer from "puppeteer";
import login from '../../login.js';

class Scraper {
  constructor(browser, page) {
    this.browser = browser || null;
    this.page = page || null; 
  }

  async launch(optionsObject) {
    this.browser = await puppeteer.launch(optionsObject);
    return this.browser;
  }

  async goto() {
    await this.page.goto(this.url);
    if (await this.page.url().match(/instagram\.com\/accounts\/login/i)) {
      await this.page.waitForSelector('input');
      await this.page.type('input[name="username"]', login.user);
      await this.page.type('input[name="password"]', login.password);
      await this.page.waitForSelector('button');
      await this.page.click('button[type="submit"]');
    }
  }

  async createPage() {
    this.page = await this.browser.newPage();
  }

  async closePage() {
    await this.page.close();
    this.page = null;
  }

  async closeBrowser() {
    await this.browser.close();
    this.browser = null;
  }

}

export default Scraper
