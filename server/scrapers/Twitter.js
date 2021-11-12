import Scraper from './Scraper.js';
import { tweetParser, twitterBioParser } from '../handlers/parser.js';


class Twitter extends Scraper {
  constructor(username, browser) {
    super(browser);
    this.username = username;
    this.url = `https://twitter.com/${this.username}`;
  }

  async getProfilePicture() {
    await this.page.waitForSelector('img');
    const profilePicture = await this.page.evaluate(() => {
      const pic = document.querySelectorAll('img')[1].src;
      return pic;
    })

    return profilePicture;
  }

  async getTweets() {
    await this.page.waitForSelector('article');
    const tweetsArray = await this.page.evaluate(() => {
      const arr = [];
      const tweets = document.querySelectorAll('article');
      tweets.forEach(tweet => arr.push(tweet.innerText))
      return arr;
    })

    const parsedTweets = tweetParser(tweetsArray);

    return parsedTweets;
  }

  async getBio() {
    await this.page.waitForSelector('main');
    const bioToParse = await this.page.evaluate(() => {
      const bioText = document.querySelector('main').innerText;
      return bioText;
    }) 

    const parsedBio = twitterBioParser(bioToParse);
    return parsedBio;
  }

  async checkFound() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await this.page.evaluate(() => {
      const text = document.querySelector('div[data-testid="emptyState"]')
      if (text)
        return text.innerText;
    })

    if (response && response.match(/this.account.+exist|account suspended/gi)) {
      const err = new Error('Twitter user not found!');
      err.notFound = true;
      throw err
    }
  }

}

export default Twitter