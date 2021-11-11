import React, { useState } from 'react';
import Form from './components/Form.js'
import MediaWrapper from './components/MediaWrapper.js';

function App() {
  const [searchValue, setSearchValue] = useState();

  return (
    <main>
      <h1>SocialGrab</h1>
      <Form setSearchValue={setSearchValue}/>
      { searchValue && <MediaWrapper searchValue={searchValue} />}
    </main>
  )
}

export default App;