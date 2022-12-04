"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`/shop`); //update this with functionality later
  };

  const handleFilter = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <div className="flex justify-center w-full h-[40px] mb-4 mt-[-6px]">
      <form
        onSubmit={handleSearch}
        className="flex justify-center w-[100%] h-full"
      >
        <span className="basis-1/6 h-full w-full px-2 ">
          <select className="text-center w-full h-full shadow-lg shadow-gray-400 rounded-sm" onChange={handleFilter}>
            <option value="all"> All Categories: </option>
            {/* add a mapping of all categories here! */}
          </select>
        </span>
        <span className="basis-4/6 w-full h-full ">
          <input
            className="w-full h-full shadow-lg shadow-gray-400 rounded-sm"
            name="searchBar"
            type="text"
            placeholder="Search for items..."
          />
        </span>
        <span className="basis-1/6 w-full h-full px-2">
          <button type="submit" className="w-full h-full shadow-lg shadow-gray-400 rounded-sm bg-blue-400">
            {" "}
            Search{" "}
          </button>
        </span>
      </form>
    </div>
  );
}

export default SearchBar;
