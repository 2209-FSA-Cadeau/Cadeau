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
    <div className="flex flex-col h-36 rounded-lg bg-orange-200 justify-evenly">
      <div className="flex flex-row justify-evenly">
        <div>
          <select
            onChange={handleRecipient}
            className="h-8 w-32 rounded-lg text-center"
          >
            {recipients.recipients.map((recipient, index) => (
              <option key={index} value={recipient.name}>

                {recipient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-center h-8 w-32 border-2 border-black rounded-lg">
          <div onClick={handleCategory} id="Top Choices">
            Top Choices
          </div>
        </div>
        {Object.keys(currentRecipient).length !== 1 &&
        currentRecipient.recommendations
          ? currentRecipient.recommendations.map((recommendation, index) => (
              <div
                key={index}
                onClick={handleCategory}
                className="flex flex-col justify-center h-8 w-32 rounded-lg border-2 border-black"
              >
                <div id={recommendation.columnName} className="text-center">
                  {recommendation.columnName}
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default SearchBar;
