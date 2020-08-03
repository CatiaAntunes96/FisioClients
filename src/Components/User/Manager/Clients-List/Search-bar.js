import React, { useState } from 'react';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <div>
      <h4>Search Client</h4>
      <input type="text" value={searchValue} onChange={handleChange} />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
