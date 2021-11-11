import Scraper from './Scraper.js';
import { instagramBioParser } from '../handlers/parser.js';

class Instagram extends Scraper {
  constructor(username, browser) {
    super(browser);
    this.username = username;
    this.url = `https://instagram.com/${this.username}`;
  }

  async getProfilePicture() {
    await this.page.waitForSelector('img');
    const profilePicture = await this.page.evaluate(() => {
      const pic = document.querySelectorAll('img')[0].src;
      return pic;
    })
    
    return profilePicture;
  }

  async getGallery() {
    await this.page.waitForSelector('img');
    const galleryArray = await this.page.evaluate(() => {
      const nodes = document.querySelectorAll('img');
      const images = [];
      for (let i = 1; i < 7; i++) {
        images.push(nodes[i].src)
      }

      return images;
    })

    return galleryArray;
  }

  async getBio() {
    await this.page.waitForSelector('header');
    const bioToParse = await this.page.evaluate(() => {
      const headerText = document.querySelector('header').innerText;
      return headerText;
    }) 

    const parsedBio = instagramBioParser(bioToParse);
    return parsedBio;
  }

  async checkFound() {
    await this.page.waitForSelector('main');
    const response = await this.page.evaluate(() => {
      const text = document.querySelector('main').innerText
      return text
    })

    if (response.match(/sorry.+ page.+available/gi)) {
      const err = new Error('Instagram user not found!');
      err.notFound = true;
      throw err
    }

  }

  

}

export default Instagram