"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  deleteSingleFilter,
  changeFilterType,
  addChecklist,
  deleteChecklist,
  filterOff,
  searchOff,
  deleteFilters,
  resetChecklist,
  resetFilterType,
} from "../../store/shopSlice";

const ShoppingSideBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let path = usePathname();
  let searchParams = useSearchParams();

  const { checklist, filterType } = useSelector((state) => state.shop);

  const [filterCategory, setFilterCategory] = useState("all");

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchOff());
    dispatch(deleteFilters());
    dispatch(resetChecklist());
    dispatch(resetFilterType());
    dispatch(filterOff());
    path = path.split("/");
    path[3] = "search";
    path = path.join("/");
    path =
      path += `?category=${filterCategory}&value=${event.target.searchBar.value}`;
    router.push(path);
  };

  const handleSearchFilter = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleFilter = (event) => {
    if (!checklist[event.target.id]) {
      dispatch(changeFilterType("add"));
      dispatch(addChecklist({ [event.target.id]: event.target.value }));
    } else {
      if (checklist[event.target.id] === event.target.value) {
        dispatch(changeFilterType("subtract"));
        dispatch(deleteSingleFilter(event.target.id));
        dispatch(deleteChecklist(event.target.id));
      }
    }
  };

  useEffect(() => {
    if (!checklist.prices && !checklist.ratings && !checklist.reviews) {
      if (filterType === "subtract") {
        path = path.split("/");
        path[path.length - 2] = "1";
        path.splice(path.length - 1, 1);
        path = path.join("/");
        if (path.includes("search")) {
          const category = searchParams.get("category");
          const value = searchParams.get("value");
          path += `?category=${category}&value=${value}`;
        }
        dispatch(filterOff());
        console.log("three", path);
        router.push(path);
      }
    } else {
      //you either toggle in
      // or already toggled to begin with
      path = path.split("/");

      if (path.includes("filter")) {
        path[path.length - 2] = "1"; //already toggled in
      } else {
        path[path.length - 1] = "1"; // toggled in for first time
      }

      path = path.join("/");

      //shop/recipient/category/1
      //shop/recipient/search/1
      //shop/recipient/category/1/filter
      //shop/recipient/search/1/filter

      let filters = "";
      for (let keys in checklist) {
        if (checklist[keys]) {
          if (filters.length === 0) {
            filters += `${keys}=${checklist[keys]}`;
          } else {
            filters += `&${keys}=${checklist[keys]}`;
          }
        }
      }

      if (path.includes("search")) {
        const category = searchParams.get("category");
        const value = searchParams.get("value");
        path += `?category=${category}&value=${value}`;
      }

      //shop/recipient/category/1
      //shop/recipient/search/1?category & value

      //shop/recipient/category/1/filter
      //shop/recipient/search/1/filter?category & value

      if (path.includes("filter")) {
        if (path.includes("search")) {
          path = path + "&" + filters;
        } else {
          path = path + "?" + filters;
        }
      } else {
        if (path.includes("search")) {
          const question = path.indexOf("?");
          path =
            path.slice(0, question) + "/filter" + path.slice(question) + "&";
          path += filters;
        } else {
          path += "/filter?";
          path += filters;
        }
      }
      console.log(path);
      router.push(path);
    }
  }, [checklist]);

  const categories = [
    "Books",
    "Electronics",
    "Cooking",
    "Sports",
    "Outdoors",
    "Clothing",
    "Music",
    "Movies",
    "Technology",
    "Games",
    "Pets",
    "Home",
    "Art",
  ];

  const ratings = ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];
  const prices = ["Up to $25", "$25-$50", "$50-$100", "$100-$200", "$200+"];
  const reviews = ["<10", "10-100", "100-250", "250-500", "500-1000", "1000+"];

  const checklistOn =
    "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
  const checklistOff = checklistOn + " pointer-events-none";

  return (
    <div className="flex flex-col justify-start h-full bg-cgold-200 rounded-md shadow-xl p-2">
      <div className="flex justify-center w-full h-[40px]">
        <form
          onSubmit={handleSearch}
          className="flex justify-center w-[100%] h-full"
        >
          <span className="basis-1/6 h-full w-full px-2 ">
            <select
              className="text-center w-full h-full rounded-sm"
              onChange={handleFilter}
            >
              <option value="all"> All Categories: </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
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
            <button
              type="submit"
              className="w-full h-full rounded-sm bg-blue-400"
            >
              Search
            </button>
          </span>
        </form>
      </div>
      <div className="flex flex-col h-full justify-around items-centerrounded-md">
        <div className="flex flex-col justify-center items-start w-1/2 h-10 text-center ">
          <div
            id="Rating"
            className="border-b-2 border-black self-center"
            onClick={handleFilter}
          >
            Rating
          </div>
          {ratings.map((rating, index) => (
            <div id={rating} key={index}>
              <input
                id="ratings"
                type="checkbox"
                value={rating}
                className={
                  !checklist.ratings
                    ? checklistOn
                    : checklist.ratings === rating
                    ? checklistOn
                    : checklistOff
                }
                onClick={handleFilter}
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                {rating}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-start w-1/2 h-10 text-center">
          <div id="Price" className="border-b-2 border-black self-center">
            Price
          </div>
          {prices.map((price, index) => (
            <div id={price} key={index}>
              <input
                id="prices"
                type="checkbox"
                value={price}
                className={
                  !checklist.prices
                    ? checklistOn
                    : checklist.prices === price
                    ? checklistOn
                    : checklistOff
                }
                onClick={handleFilter}
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 "
              >
                {price}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-start w-1/2 h-10 text-center">
          <div id="Price" className="border-b-2 border-black self-center">
            Reviews
          </div>
          {reviews.map((review, index) => (
            <div id={review} key={index}>
              <input
                id="reviews"
                type="checkbox"
                value={review}
                className={
                  !checklist.reviews
                    ? checklistOn
                    : checklist.reviews === review
                    ? checklistOn
                    : checklistOff
                }
                onClick={handleFilter}
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 "
              >
                {review}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingSideBar;
