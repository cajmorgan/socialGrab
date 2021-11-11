import React from 'react';

function Tweet({ tweet, profilePic }) {
  return (
    <figure className="tweets__tweet">
      <div className="tweet_picture">
        <img src={profilePic} width="100" />
      </div>
      <article className="tweet_info-wrapper">
        <div className="info-wraper__top">
          { tweet.retweeted && <h3>{tweet.retweeted}</h3> }
          <h3>{tweet.name}</h3>
          <p>@{tweet.username}</p>
          <span>{tweet.date}</span>
        </div>
        <div className="info-wraper__bottom">
          <div className="bottom__description">{tweet.tweet}</div>
          <div className="bottom__actions">
            <p className="actions__likes">{tweet.likes}</p>
            <p className="actions__comments">{tweet.comments}</p>
            <p className="actions__retweets">{tweet.retweets}</p>
          </div>
        </div>
      </article>
    </figure>
  )
}

export default Tweet