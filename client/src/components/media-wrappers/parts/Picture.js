import React from 'react';

function Picture({ url }) {
  return (
    <figure className="gallery__picture">
      <img src={url} width="300" ></img>
    </figure>
  )
}

export default Picture