import { response } from 'express';
import React, { useEffect, useState } from 'react';

async function fetchData(searchValue) {
  const sendData = { instagram: searchValue, twitter: searchValue };

}

function MediaWrapper({ searchValue }) {
  const [data, setData] = useState({});


  useEffect(() => {
    const responseData = await fetchData(searchValue);
    setData(responseData);
  }, [])

  return (
   <section>
     <h1>HIHO</h1>
     <article className="instagram-result"></article>
     { data.instagram }
     <article className="twitter-result"></article>
     { data.twitter }
   </section>
  )
}

export default MediaWrapper;