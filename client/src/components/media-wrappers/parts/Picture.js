import React from 'react';

function Picture({ url }) {
  return (
    <figure className="gallery__picture">
      <img src={url} ></img>
    </figure>
  )
}

export default Picture