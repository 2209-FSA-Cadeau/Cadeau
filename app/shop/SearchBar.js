"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipients } from '../../store/recipientSlice'
import { searchOff, deleteFilters, resetFilterType, resetChecklist } from '../../store/shopSlice'

function SearchBar() {
  const recipients = useSelector((state) => state.recipients)
  const dispatch = useDispatch()

  const [currentRecipient, setRecipient] = useState(recipients.singleRecipient)
  
  useEffect(() => {
    if(Object.keys(recipients.singleRecipient).length === 0 && Object.keys(currentRecipient).length === 0){
      dispatch(fetchRecipients(2))
    }
  }, [])

  useEffect(() => {
  if(recipients.recipients.length !== 0 && Object.keys(currentRecipient).length === 0){
    const currentRecipient = recipients.recipients[0]
    const iterable = {}
    Object.assign(iterable, currentRecipient)
    let score = [...iterable.recommendations]
    score = score.sort((a,b) => b.score - a.score).slice(0,5)
    iterable.recommendations = score
    setRecipient(iterable)
  }
  }, [recipients])

  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchOff())
    dispatch(deleteFilters())
    dispatch(resetChecklist())
    dispatch(resetFilterType())
    router.push(`/shop/${currentRecipient.name}/search/1?category=${filterCategory}&value=${event.target.searchBar.value}`); 
  };

  const handleFilter = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleRecipient = (event) => {
    const newRecipient = recipients.recipients.find(recipient => recipient.name === event.target.value)
    const iterable = {}
    Object.assign(iterable, newRecipient)
    const score = [...newRecipient.recommendations].sort((a,b) => b.score - a.score).slice(0,5)
    iterable.recommendations = score
    setRecipient(iterable)
    dispatch(searchOff())
    dispatch(deleteFilters())
    dispatch(resetChecklist())
    dispatch(resetFilterType())
    router.push(`/shop/${iterable.name}/TopRecs`)
  }

  const handleCategory = (event) =>{
    dispatch(searchOff())
    dispatch(deleteFilters())
    dispatch(resetChecklist())
    dispatch(resetFilterType())
    if(event.target.id === "Top Choices") router.push(`shop/${currentRecipient.name}/toprecs`)
    else router.push(`/shop/${currentRecipient.name}/${event.target.id}/1`)
  }

  const categories = ["Books", "Electronics", "Cooking", "Sports", "Outdoors",
                      "Clothing", "Music", "Movies", "Technology", "Games",
                      "Pets", "Home", "Art"]

return (
  <div className="flex flex-col h-36 rounded-lg bg-orange-200 justify-evenly">
    <div className="flex justify-center w-full h-[40px]">
      <form
        onSubmit={handleSearch}
        className="flex justify-center w-[100%] h-full"
      >
        <span className="basis-1/6 h-full w-full px-2 ">
          <select className="text-center w-full h-full rounded-sm" onChange={handleFilter}>
            <option value="all"> All Categories: </option>
           {categories.map((category, index) => (
            <option key={index} value={category}> {category} </option>
           ))}
          </select>
        </span>
        <span className="basis-4/6 w-full h-full ">
          <input
            className="w-full h-full rounded-sm"
            name="searchBar"
            type="text"
            placeholder="Search for items..."
          />
        </span>
        <span className="basis-1/6 w-full h-full px-2">
          <button type="submit" className="w-full h-full rounded-sm bg-blue-400">
            {" "}
            Search{" "}
          </button>
        </span>
      </form>
    </div>
    <div className="flex flex-row justify-evenly">
      <div>
       <select onChange={handleRecipient} className="h-8 w-32 rounded-lg text-center">
          {recipients.recipients.map((recipient, index) => (<option key={index} value={recipient.name}> {recipient.name} </option>))}
       </select>
      </div>
      <div className="flex flex-col justify-center h-8 w-32 border-2 border-black rounded-lg">
       <div onClick={handleCategory} id="Top Choices">
        Top Choices
       </div>
      </div>
      { !currentRecipient ?
          "" :
          Object.keys(currentRecipient).length !== 0 ? 
          currentRecipient.recommendations.map((recommendation, index) => (
              <div key={index} onClick={handleCategory} className="flex flex-col justify-center h-8 w-32 rounded-lg border-2 border-black">
                <div id={recommendation.columnName} className="text-center"> {recommendation.columnName} </div>
              </div>
            )):
            ""
      }  
    </div>
  </div>
  );
}

export default SearchBar;
