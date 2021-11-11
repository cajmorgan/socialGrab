import fs from 'fs';
import { get } from 'https'

function getName() {
  const name = Date.now();

  return name;
}

function createPic(url, urlToPic) {
  return new Promise((resolve, reject) => {
    const createPhoto = fs.createWriteStream(urlToPic);
    get(url, res => {
      res.pipe(createPhoto);
    })

    createPhoto.on('finish', () => {
      resolve(true);
    })

  })
  
}

async function handleFiles(req, res, next) {
  if (req.results.ig) {
    const generateRandomName = getName();
    const urlToPic = `./client/build/data/${generateRandomName}.jpg`
    await createPic(req.results.ig.profilePic, urlToPic);
    req.results.ig.profilePic = `http://localhost:9000/data/${generateRandomName}.jpg`;
  }

  next();
}

export default handleFiles;