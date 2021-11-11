import React, { useEffect, useState } from 'react';

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


  useEffect(async () => {
    const responseData = await fetchData(searchValue);
      setData(responseData);
      console.log(responseData);
    
  }, [])

  return (
   <section>
     <h1>HIHO</h1>
     <article className="instagram-result"></article>
     {/* { data.instagram } */}
     <article className="twitter-result"></article>
     {/* { data.twitter } */}
   </section>
  )
}

export default MediaWrapper;