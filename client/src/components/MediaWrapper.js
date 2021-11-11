import React, { useEffect, useState } from 'react';
import InstagramWrapper from './media-wrappers/InstagramWrapper.js';
import TwitterWrapper from './media-wrappers/TwitterWrapper.js';
import './MediaWrapper.css';

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
   <section className="media-wrapper">
     { isSearching && <p>Searching...</p> }
     { data.ig && !isSearching && <InstagramWrapper data={data.ig} />}  
     { data.twitter && !isSearching && <TwitterWrapper data={data.twitter} /> }
   </section>
  )
}

export default MediaWrapper;