// SearchBar.js
import React, { useState } from "react";
import Icon from "react-crud-icons";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent component
  };

  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search by user name"
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Icon name="search" size="medium" />
    </div>
  );
};

export default SearchBar;
