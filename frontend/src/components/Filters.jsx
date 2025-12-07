import React, { useState } from "react";

const Filters = ({ onFilter, onSearch, onSort }) => {
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleFilter = () => {
    onFilter({ category, month });
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleSort = (by) => {
    onSort(by);
  };

  return (
    <div className="card filters">
      <div className="form-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <div className="form-row">
        <input
          placeholder="Search by title or description"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="form-row">
        <span>Sort by:</span>
        <button onClick={() => handleSort("date")}>Date</button>
        <button onClick={() => handleSort("amount")}>Amount</button>
      </div>
    </div>
  );
};

export default Filters;
