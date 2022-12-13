"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";
import {
  searchOff,
  deleteFilters,
  resetFilterType,
  resetChecklist,
  filterOff,
} from "../../store/shopSlice";

function SearchBar() {
  const recipients = useSelector((state) => state.recipients);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [currentRecipient, setRecipient] = useState(recipients.singleRecipient);

  useEffect(() => {
    if (
      Object.keys(recipients.singleRecipient).length === 1 &&
      Object.keys(currentRecipient).length === 1
    ) {
      dispatch(fetchRecipients(userId));
    }
  }, []);

  useEffect(() => {
    if (
      recipients.recipients.length !== 0 &&
      Object.keys(currentRecipient).length === 1
    ) {
      const currentRecipient = recipients.recipients[0];
      const iterable = {};
      Object.assign(iterable, currentRecipient);
      let score = [...iterable.recommendations];
      score = score.sort((a, b) => b.score - a.score).slice(0, 5);
      iterable.recommendations = score;
      setRecipient(iterable);
    }
  }, [recipients]);

  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleRecipient = (event) => {
    const newRecipient = recipients.recipients.find(
      (recipient) => recipient.name === event.target.value
    );
    const iterable = {};
    Object.assign(iterable, newRecipient);
    const score = [...newRecipient.recommendations]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    iterable.recommendations = score;
    setRecipient(iterable);
    dispatch(searchOff());
    dispatch(deleteFilters());
    dispatch(resetChecklist());
    dispatch(resetFilterType());
    dispatch(filterOff());
    router.push(`/shop/${iterable.name}/TopRecs`);
  };
  
  const handleCategory = (event) => {
    dispatch(searchOff());
    dispatch(deleteFilters());
    dispatch(resetChecklist());
    dispatch(resetFilterType());
    dispatch(filterOff());
    if (event.target.id === "Top Choices")
      router.push(`shop/${currentRecipient.name}/toprecs`);
    else router.push(`/shop/${currentRecipient.name}/${event.target.id}/1`);
  };

  // console.log(currentRecipient, Object.keys(currentRecipient).length)
  return (
    <div className="flex h-36 rounded-md bg-cblue-500 justify-start items-center p-4 gap-[1%] shadow-xl">
      <div className="basis-[20%] h-[80%]">
        <select
          onChange={handleRecipient}
          className="rounded-lg text-center h-full w-full shadow-xl text-lg font-bold cursor-pointer"
        >
          {recipients.recipients.map((recipient, index) => (
            <option key={index} value={recipient.name}>
              {recipient.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCategory}
        className="basis-[10%] h-[80%] bg-white flex justify-center items-center rounded-lg shadow-xl px-4 hover:text-cgold-500"
      >
        <h2>Top Choices</h2>
      </button>
      <div className=" basis-[78%] h-[80%] flex flex-row gap-2 overflow-x-auto scroll-smooth">
        {Object.keys(currentRecipient).length > 1
          ? currentRecipient.recommendations.map((recommendation, index) => (
              <button
                key={index}
                onClick={handleCategory}
                className="flex justify-center items-center rounded-lg w-[20%] min-w-fit px-4 text-white"
              >
                <h3 className="text-center">
                  {recommendation.columnName}
                </h3>
              </button>
            ))
          : ""}
      </div>
    </div>
  );
}

export default SearchBar;
