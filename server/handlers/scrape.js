import { Scraper, Instagram, Twitter } from '../scrapers/index.js';

async function scrape(req, res, next) {
  const resultsObj = {};
  const body = req.body;
  let scraper, instagram, twitter;
  if (!body.instagram && !body.twitter) {
    const err = new Error('bad request!')
    err.status = 400;
    return next(err);
  }

  try {
    scraper = new Scraper(true);
    const browser = await scraper.launch({ headless: false, userDataDir: './data' });

    if (body.instagram) {
      const igObj = {};
      instagram = new Instagram(body.instagram, browser);
      await instagram.createPage();
      await instagram.goto();
      await instagram.checkFound();
      igObj.profilePic = await instagram.getProfilePicture();
      igObj.gallery = await instagram.getGallery();
      igObj.bio = await instagram.getBio();
      resultsObj.ig = igObj;
      await instagram.closePage();
    }

    if (body.twitter) {
      const twitterObj = {};
      twitter = new Twitter(body.twitter, browser);
      await twitter.createPage();
      await twitter.goto();
      await twitter.checkFound();
      twitterObj.profilePic = await twitter.getProfilePicture();
      twitterObj.bio = await twitter.getBio();
      twitterObj.tweets = await twitter.getTweets();
      resultsObj.twitter = twitterObj;
      await twitter.closePage();
    }
    
    req.results = resultsObj; 
    await scraper.closeBrowser();
    next();

  } catch (err) {
    console.log(err.message);
    if (err.notFound)
      err.status = 404;
    
    await scraper.closeBrowser();
    return next(err);
  }
  
}


export default scrape;