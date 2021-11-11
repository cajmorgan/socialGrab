import React, { useState } from 'react';
import Form from './components/Form.js'
import MediaWrapper from './components/MediaWrapper.js';
import './reset.css'
import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState();
  // const [showForm, setShowForm] = useState(true);

  return (
    <main className="App">
      <header className="header">
      <h1 className="header__title">SocialGrab</h1>
      </header>
      <Form setSearchValue={setSearchValue}/>
      { searchValue && <MediaWrapper searchValue={searchValue} />}
    </main>
  )
}

export default App;