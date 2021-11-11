
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

// tweetParser( [
//   "ye\n@kanyewest\n·\n4 Nov 2020\nKANYE 2024\n30.2K\n76.4K\n374K",
//   "ye\n@kanyewest\n·\n3 Nov 2020\nI VOTED \n6.7K\n10.9K\n201.6K",
//   "ye\n@kanyewest\n·\n3 Nov 2020\nKANYE2020 \n2.6K\n4.1K\n77.5K"
// ])
// tweetParser( [
//   "Kygo Retweeted\nDancing Astronaut\n@dancingastro\n·\n29 Oct\n.\n@MartinGarrix\n and \n@KygoMusic\n finally in the studio together \n\n(via martingarrix/IG)\n31\n326\n2K",
//   "Kygo\n@KygoMusic\n·\n15 Oct\n'Undeniable’ ft. \n@xambassadors\n out everywhere!! \n\nhttps://smarturl.it/xUndeniable\n43\n345\n1.2K",
//   "Kygo Retweeted\nMyles Shear\n@ManagerMyles\n·\n5 Oct\nI’m all in let’s go NFT world! \n@BoredApeYC\n148\n75\n1.4K"
// ])
// instagramBioParser('kygomusic\nVerified\nFollow\n239 posts\n4.2m followers\n226 following\nKygo\n\nMusician/Band\n‘Undeniable’ ft. @xambassadors out now👇🏼\nsmarturl.it/xUndeniable'))
twitterBioParser('ye\n1,911 Tweets\nSee new Tweets\nFollow\nye\n@kanyewest\nKANYEWEST.COMJoined July 2010\n212 Following\n30.6M Followers\nTweets\nTweets & replies\nMedia\nLikes\nye’s Tweets\nye\n@kanyewest\n·\n4 Nov 2020\nKANYE 2024\n30.2K\n76.4K\n373.9K\nye\n@kanyewest\n·\n3 Nov 2020\nI VOTED \n6.7K\n10.9K\n201.5K\nye\n@kanyewest\n·\n3 Nov 2020\nKANYE2020 \n2.6K\n4.1K\n77.5K\nye\n@kanyewest\n·\n3 Nov 2020\n2.2K\n3.6K\n63.5K')
export { instagramBioParser, tweetParser, twitterBioParser }