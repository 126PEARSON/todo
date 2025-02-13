// Search.js
import React, { useState, useEffect } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300); // 300ms delay
    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search tasks"
    />
  );
};

export default Search;
