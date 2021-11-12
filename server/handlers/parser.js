
function instagramBioParser(bioToParse) {
  const list = ['name', 'verified', 'posts', 'followers', 'following', 'info'];
  const bioObject = {};
  bioObject.verified = false;
  const tokens = bioToParse.split('\n');
 
  for (let i = 0; i < list.length; i++) {
    if (list[i] === 'verified' && tokens[0] === 'Verified') {
      bioObject[list[i]] = true;
      tokens.shift();
      tokens.shift();
      continue;
    }

    if (list[i] === 'info') {
      bioObject[list[i]] = tokens.join('\n');
      break;
    }
    

    bioObject[list[i]] = tokens[0];
    tokens.shift();
  }

  return bioObject
}

function tweetParser(tweetsArray) {
  const parsedTweets = [];
  tweetsArray.forEach(tweet => {
    const list = ['name', 'username', 'date', 'tweet'];
    const nums = ['likes', 'retweets', 'comments'];
    const tokens = tweet.split('\n');
    const tweetObject = {};
    nums.forEach(num => {
      tweetObject[num] = tokens.pop();
    })
  
    if (tokens[0].match(/retweeted/gi))
        list.unshift('retweeted');
    
    for (let i = 0; i < list.length - 1; i++) {
      if (tokens[0] === '·') {
        tokens.shift();
        i--;
        continue;
      }

      tweetObject[list[i]] = tokens[0]
      tokens.shift();
    }

    tweetObject.tweet = tokens.join('');
    parsedTweets.push(tweetObject);
  })

  return parsedTweets;
}

function twitterBioParser(bioToParse) {
  const bioObject = {};
  const list = ['name', 'tweetsNumber', 'following', 'followers'];
  const tokens = bioToParse.split('\n');
  
  for (let i = 0; i < list.length; i++) {
    if (i < 2) {
      bioObject[list[i]] = tokens[0];
      tokens.shift();
      continue;
    }

    if (tokens[0].match(/following|followers/gi)) {
      bioObject[list[i]] = tokens[0];
      tokens.shift();
      continue;
    }

    if (bioObject.following && bioObject.followers) {
      break;
    }

    i--;
    tokens.shift();
  }

  return bioObject;
}

export { instagramBioParser, tweetParser, twitterBioParser }