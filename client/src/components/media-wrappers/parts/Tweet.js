import React from 'react';

function Tweet({ tweet, profilePic }) {
  return (
    <figure className="tweets__tweet">
      <div className="tweet_picture">
        <img src={profilePic}/>
      </div>
      <article className="tweet_info-wrapper">
        <div className="info-wraper__top">
          { tweet.retweeted && <h3 className="top__name">{tweet.retweeted}</h3> }
          <h3 className="top__name">{tweet.name}</h3>
          <p className="top__username">{tweet.username}</p>
          <span className="top__date">{tweet.date}</span>
        </div>
        <div className="info-wraper__bottom">
          <div className="bottom__description" id="bottom-id">
            <p>{tweet.tweet}</p></div>
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