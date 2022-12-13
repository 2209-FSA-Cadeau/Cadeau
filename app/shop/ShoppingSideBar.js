"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
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

  // const handleSearchFilter = (event) => {
  //   setFilterCategory(event.target.value);
  // };

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
    "text-lg text-cblue-700 rounded border-neutral-300 focus:ring-cblue-300 focus:ring-2";
  const checklistOff = checklistOn + " pointer-events-none";

  return (
    <div className="h-full flex flex-col justify-start bg-white rounded-md shadow-xl p-4">
      <div className="flex justify-center w-full h-[40px]">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full h-full"
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="scale-150" />
            </div>
            <input
              className="bg-neutral-100 border border-neutral-200 text-cblue-700 text-md rounded-full focus:ring-cblue-300 focus:border-cblue-300 block w-full pl-10 p-2.5 "
              name="searchBar"
              type="text"
              placeholder="Search for items..."
            />
          </div>
        </form>
      </div>
      <div className="grow flex flex-col w-full justify-start py-6 gap-4">
        <div className="flex flex-col justify-center items-start">
          <div id="Price" className="mb-1">
            <h2>Price</h2>
          </div>
          {prices.map((price, index) => (
            <div id={price} key={index} onClick={handleFilter}>
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
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-lg font-medium"
              >
                {price}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-start">
          <div id="Rating" className="mb-1">
            <h2>Rating</h2>
          </div>
          {ratings.map((rating, index) => (
            <div id={rating} key={index} onClick={handleFilter}>
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
                className="ml-2 text-lg font-medium"
              >
                {rating}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-start">
          <div id="Price" className="mb-1">
            <h2>Reviews</h2>
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
                className="ml-2 text-lg font-medium"
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
