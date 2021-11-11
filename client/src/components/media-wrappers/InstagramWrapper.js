import React from 'react';
import Picture from './parts/Picture.js'

function generateGallery(galleryArray) {
  const gallery = [];
  galleryArray.forEach((pic, index) => {
    gallery.push(<Picture url={pic} key={index} />)
  })
  
  return gallery;
}

function InstagramWrapper({ data }) {
  return (
    <article className="instagram-wrapper">
      <header className="instagram-wrapper__header">
        <div className="header__profile-pic">
          <img src={data.profilePic} />
        </div>
        <div className="header__bio-wrapper">
          <h2 className="bio-wrapper__name">@{data.bio.name}</h2>
          <div className="bio-wrapper__user-info">
            <h3>{data.bio.posts}</h3>
            <h3>{data.bio.followers}</h3>
            <h3>{data.bio.following}</h3>
          </div>
          <article>{data.bio.info}</article>
        </div>
      </header>
      <section className="instagram-wrapper__gallery">
      {generateGallery(data.gallery)}
      </section>
    </article>
  )
}

export default InstagramWrapper;