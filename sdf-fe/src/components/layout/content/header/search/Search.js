import React from 'react';
import './Search.css';

function Search() {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search movies, TV..."
        autoComplete="off"
        className="search-box"
      />
    </div>
  );
}

export default Search;

