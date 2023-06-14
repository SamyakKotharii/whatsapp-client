import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";

const Sidebar = ({ onSelectNumber }) => {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get(
          "https://darkhorsestockscloud.onrender.com/numbers"
        );
        setNumbers(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchNumbers();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await axios.get(
          `https://darkhorsestockscloud.onrender.com/search/${searchTerm}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if (searchTerm !== "") {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSelectNumber = (number) => {
    setSelectedNumber(number);
    onSelectNumber(number);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setSearchTerm(e.target.value);
  // };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setSearchResults([]);
    }
  };

  return (
    <div className="sidebar">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
        />
      </div>
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h3>Search Results</h3>
          {searchResults.map((result) => (
            <div
              key={result._id}
              className={`sidebar-number ${
                selectedNumber === result.from ? "selected" : ""
              }`}
              onClick={() => handleSelectNumber(result.from)}
            >
              {result.from}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {numbers.map((number) => (
            <div
              key={number}
              className={`sidebar-number ${
                selectedNumber === number ? "selected" : ""
              }`}
              onClick={() => handleSelectNumber(number)}
            >
              {number}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
