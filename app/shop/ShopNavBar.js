"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  searchOff,
  deleteFilters,
  resetFilterType,
  resetChecklist,
  filterOff,
  resetCategories
} from "../../store/shopSlice";

function SearchBar() {
  console.log("top")
  const { recipients, singleRecipient } = useSelector(
    (state) => state.recipients
  );
  const router = useRouter();
  const updatedRecip = useRef(false);
  const { userId, isLoadingRedux } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const path = usePathname();

  const [currentRecipient, setRecipient] = useState(null);
  const [dropdownIsShown, setDropdownIsShown] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecipients(userId));
    }
  }, [isLoadingRedux]);

  useEffect(() => {
    if (updatedRecip.current) {
      console.log("useEffect1")
      let recipientURL;
      if (path.split("/")[2]) {
        recipientURL = path.split("/")[2].split("%20").join(" ");
      }
      const iterable = {};
      if (recipientURL) {
        const prevRecipient = recipients.find(
          (recipient) => recipient.name === recipientURL
        );
        Object.assign(iterable, prevRecipient);
      } else {
        if (singleRecipient.preferences.length !== 0) {
          Object.assign(iterable, singleRecipient);
        } else {
          Object.assign(iterable, recipients[0]);
        }
      }
      let score = [...iterable.recommendations];
      score = score.sort((a, b) => b.score - a.score);
      iterable.recommendations = score;
      setRecipient(iterable);
      if (!recipientURL) {
        router.push(`/shop/${iterable.name}/toprecs/1`);
      }
    } else {
      updatedRecip.current = true;
    }
  }, [recipients]);

  const handleRecipient = (event) => {
    const newRecipient = recipients.find(
      (recipient) => recipient.name === event.target.value
    );
    const iterable = {};
    Object.assign(iterable, newRecipient);
    const score = [...newRecipient.recommendations].sort(
      (a, b) => b.score - a.score
    );
    iterable.recommendations = score;
    setRecipient(iterable);
    dispatch(resetCategories())
    dispatch(searchOff());
    dispatch(deleteFilters());
    dispatch(resetChecklist());
    dispatch(resetFilterType());
    dispatch(filterOff());
    router.push(`/shop/${iterable.name}/toprecs/1`);
  };

  const handleCategory = (category) => {
    dispatch(searchOff());
    dispatch(deleteFilters());
    dispatch(resetChecklist());
    dispatch(resetFilterType());
    dispatch(filterOff());
    if (category === "Top Choices")
      router.push(`shop/${currentRecipient.name}/toprecs/1`);
    else router.push(`/shop/${currentRecipient.name}/${category.columnName}/1`);
  };

  return (
    <div className="flex h-36 rounded-lg bg-cblue-500 justify-start items-center p-4 gap-[1%] shadow-xl overflow-visible">
      <div className="basis-[20%] h-[80%] min-w-fit">
        <select
          onChange={handleRecipient}
          value={currentRecipient && recipients.length > 0 ? currentRecipient.name : ""}
          className="rounded-lg text-center h-full w-full shadow-xl text-lg font-bold cursor-pointer hover:text-cgold-500 focus:border-cblue-300"
        >
          {recipients.map((recipient, index) => (
                <option key={index} value={recipient.name}>
                  {" "}
                  {recipient.name}{" "}
                </option>
              ))}
        </select>
      </div>
      <button
        onClick={() => handleCategory("Top Choices")}
        className="basis-[15%] h-[80%] bg-white flex justify-center items-center rounded-lg shadow-xl px-4 hover:text-cgold-500"
      >
        <h2>Top Choices</h2>
      </button>
      <div className=" basis-[78%] h-[80%] flex flex-row gap-2">
        {currentRecipient
          ? currentRecipient.recommendations.map((recommendation, index) => {
              return index < 6 ? (
                <button
                  key={index}
                  onClick={() => handleCategory(recommendation)}
                  className="flex justify-center items-center rounded-lg w-[20%] min-w-fit px-4 text-cgold-500 border-2 border-cblue-500 hover:border-2 hover:border-white"
                >
                  <h3 className="text-center">{recommendation.columnName}</h3>
                </button>
              ) : (
                ""
              );
            })
          : ""}

        <button
          className="relative  rounded-lg w-[20%] min-w-fit px-4 text-cgold-500 border-2 border-cblue-500 hover:border-2 hover:border-white"
          type="button"
          onBlur={() => setDropdownIsShown(false)}
          // onClick={() => setDropdownIsShown(false)}
        >
          <div
            className="w-full h-full flex justify-center items-center gap-1"
            onClick={() => setDropdownIsShown(!dropdownIsShown)}
          >
            <h3>Other</h3>
            <RiArrowDropDownLine className="scale-[2]" />
          </div>
          <div
            className={`${
              !dropdownIsShown ? "hidden" : ""
            } absolute top-[107%] z-50 w-fit bg-white text-cblue-700 rounded divide-y divide-gray-100 shadow-md`}
          >
            <ul className="py-1 text-lg">
              {currentRecipient
                ? currentRecipient.recommendations.map(
                    (recommendation, index) => {
                      return index >= 6 ? (
                        <li key={index}>
                          <div
                            onClick={() => {
                              setDropdownIsShown(false);
                              handleCategory(recommendation);
                            }}
                            className="h-full w-full py-2 px-4 hover:bg-gray-100"
                          >
                            {recommendation.columnName}
                          </div>
                        </li>
                      ) : (
                        ""
                      );
                    }
                  )
                : ""}
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
