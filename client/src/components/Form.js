import React, { useState } from 'react';
import './Form.css';

function Form({ setSearchValue }) {
  const [inputState, setInputState] = useState('');

  const handleInput = (e) => {
    setInputState(e.target.value);
  }

  const handleSubmit = (e) => {
    setSearchValue(inputState);
    e.preventDefault();
  }
  
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-wrapper">
        <p className="input-wrapper__at">@</p>
        <input className="input-wrapper__input" type="text" value={inputState} onChange={handleInput}></input>
      </div>
      <input className="input-wrapper__submit" type="submit" value="Grab!"></input>
    </form>
  )
}

export default Form;