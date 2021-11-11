import React, { useState } from 'react';
import Form from './components/Form.js'
import MediaWrapper from './components/MediaWrapper.js';
import css from './App.css'

function App() {
  const [searchValue, setSearchValue] = useState();
  // const [showForm, setShowForm] = useState(true);

  return (
    <main className="App">
      <h1>SocialGrab</h1>
      <Form setSearchValue={setSearchValue}/>
      { searchValue && <MediaWrapper searchValue={searchValue} />}
    </main>
  )
}

export default App;