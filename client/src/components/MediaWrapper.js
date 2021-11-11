import React, { useEffect, useState } from 'react';
import InstagramWrapper from './media-wrappers/InstagramWrapper.js';

async function fetchData(searchValue) {
  const sendData = { instagram: searchValue, twitter: searchValue };
  const res = await fetch('/scrape', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData)
  });

  const responseData = res.json();
  return responseData;
}

function MediaWrapper({ searchValue }) {
  const [data, setData] = useState({});
  const [isSearching, setIsSearching] = useState(false);


  useEffect(async () => {
    setIsSearching(true);
    const responseData = await fetchData(searchValue);
    setIsSearching(false);
      setData(responseData);
      console.log(responseData);
    
  }, [])

  return (
   <section>
     <h1>HIHO</h1>
     { isSearching && <p>Searching...</p> }
     <article className="instagram-result"></article>
     { data.instagram && !isSearching && < InstagramWrapper data={data.instagram} />}  
     <article className="twitter-result"></article>
     {/* { data.twitter } */}
   </section>
  )
}

export default MediaWrapper;