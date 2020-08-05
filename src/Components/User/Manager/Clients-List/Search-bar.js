import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  function handleChange(e) {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  }

  return (
    <div>
      <h4>Search Client</h4>
      <input type="text" value={searchValue} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
