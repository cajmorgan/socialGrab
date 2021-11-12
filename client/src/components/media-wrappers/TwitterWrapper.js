import React from 'react';
import Tweet from './parts/Tweet.js'
import './TwitterWrapper.css';

function generateTweets(tweetsArray, profilePic) {
  const tweets = [];
  tweetsArray.forEach((tweet, index) => {
    tweets.push(<Tweet tweet={tweet} profilePic={profilePic} key={index} />)
  })
  
  return tweets;
}

function TwitterWrapper({ data }) {
  return (
    <article className="twitter-wrapper">
      <header className="twitter-wrapper__header">
        <div className="header__profile-pic">
          <img src={data.profilePic} />
        </div>
        <div className="header__bio-wrapper">
          <h2 className="bio-wrapper__name">{data.bio.name} <span>{data.tweets[0].username}</span></h2>
          <div className="bio-wrapper__user-info">
            <h3>{data.bio.tweetsNumber}</h3>
            <h3>{data.bio.followers}</h3>
            <h3>{data.bio.following}</h3>
          </div>
        </div>
      </header>
      <section className="twitter-wrapper__tweets">
      {generateTweets(data.tweets, data.profilePic)}
      </section>
    </article>
  )
}

export default TwitterWrapper