"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ProductCards from "../ProductCards";
import { filterOn, addFilter } from "../../../../../../store/shopSlice";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"

const FilterPage = (props) => {
  const {
    categories,
    searchResults,
    filterView,
    filters,
    filterType,
    checklist,
  } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (filterType === "add") {
      if (props.params.category === "search" && !filters.includes("prices")) {
        if (props.searchParams.prices) {
          if (props.searchParams.prices === "Up to $25") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(searchResults.filter((result) => result.price <= 25))
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.price <= 25))
              );
            }
          }
          if (props.searchParams.prices === "$25-$50") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.price >= 25 && result.price <= 50
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.price >= 25 && result.price <= 50
                  )
                )
              );
            }
          }
          if (props.searchParams.prices === "$50-4100") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.price >= 50 && result.price <= 100
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.price >= 50 && result.price <= 100
                  )
                )
              );
            }
          }
          if (props.searchParams.prices === "$100-$200") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.price >= 100 && result.price <= 200
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.price >= 100 && result.price <= 200
                  )
                )
              );
            }
          }
          if (props.searchParams.prices === "$200+") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(searchResults.filter((result) => result.price >= 200))
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.price >= 200))
              );
            }
          }
          if (filterType === "add") {
            dispatch(addFilter("prices"));
          }
        }

        if (props.searchParams.ratings && !filters.includes("ratings")) {
          if (props.searchParams.ratings === "5 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(searchResults.filter((result) => result.rating === 5))
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.rating === 5))
              );
            }
          }
          if (props.searchParams.ratings === "4 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.rating >= 4 && result.rating < 5
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 4 && result.rating < 5
                  )
                )
              );
            }
          }
          if (props.searchParams.ratings === "3 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.rating >= 3 && result.rating < 4
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 3 && result.rating < 4
                  )
                )
              );
            }
          }
          if (props.searchParams.ratings === "2 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.rating >= 2 && result.rating < 3
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 2 && result.rating < 3
                  )
                )
              );
            }
          }
          if (props.searchParams.ratings === "1 Star") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.rating >= 1 && result.rating < 2
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 1 && result.rating < 2
                  )
                )
              );
            }
          }
          if (filterType === "add") {
            dispatch(addFilter("ratings"));
          }
        }

        if (props.searchParams.reviews && !filters.includes("reviews")) {
          if (props.searchParams.reviews === "<10") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(searchResults.filter((result) => result.reviews < 10))
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.reviews < 10))
              );
            }
          }
          if (props.searchParams.reviews === "10-100") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.reviews >= 10 && result.reviews <= 100
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 10 && result.reviews <= 100
                  )
                )
              );
            }
          }
          if (props.searchParams.reviews === "100-250") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.reviews >= 100 && result.reviews <= 250
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 100 && result.reviews <= 250
                  )
                )
              );
            }
          }
          if (props.searchParams.reviews === "250-500") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.reviews >= 250 && result.reviews <= 500
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 250 && result.reviews <= 500
                  )
                )
              );
            }
          }
          if (props.searchParams.reviews === "500-1000") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter(
                    (result) => result.reviews >= 500 && result.reviews <= 1000
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 500 && result.reviews <= 1000
                  )
                )
              );
            }
          }
          if (props.searchParams.reviews === "1000+") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  searchResults.filter((result) => result.reviews >= 1000)
                )
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.reviews >= 1000))
              );
            }
          }
          if (filterType === "add") {
            dispatch(addFilter("reviews"));
          }
        }
      } else {
        if (props.searchParams.prices && !filters.includes("prices")) {
          // get rid of subtract, make it itsown if statement at bottom of if// add another
          if (props.searchParams.prices === "Up to $25") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.price <= 25
                  )
                )
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.price <= 25))
              );
            }
          }
          if (props.searchParams.prices === "$25-$50") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.price >= 25 && result.price <= 50
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.price >= 25 && result.price <= 50
                  )
                )
              );
            }
          }
          if (props.searchParams.prices === "$50-$100") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.price >= 50 && result.price <= 100
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.price >= 50 && result.price <= 100
                  )
                )
              );
            }
          }
          if (props.searchParams.prices === "$100-$200") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.price >= 100 && result.price <= 200
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.price >= 100 && result.price <= 200
                  )
                )
              );
            }
          }
          if (props.searchParams.prices === "$200+") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.price >= 200
                  )
                )
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.price >= 200))
              );
            }
          }
          if (filterType === "add") {
            dispatch(addFilter("prices"));
          }
        }

        if (props.searchParams.ratings && !filters.includes("ratings")) {
          if (props.searchParams.ratings === "5 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.rating === 5
                  )
                )
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.rating === 5))
              );
            }
          }
          if (props.searchParams.ratings === "4 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.rating >= 4 && result.rating < 5
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 4 && result.rating < 5
                  )
                )
              );
            }
          }
          if (props.searchParams.ratings === "3 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.rating >= 3 && result.rating < 4
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 3 && result.rating < 4
                  )
                )
              );
            }
          }
          if (props.searchParams.ratings === "2 Stars") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.rating >= 2 && result.rating < 3
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 2 && result.rating < 3
                  )
                )
              );
            }
          }
          if (props.searchParams.ratings === "1 Star") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.rating >= 1 && result.rating < 2
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.rating >= 1 && result.rating < 2
                  )
                )
              );
            }
          }
          if (filterType === "add") {
            dispatch(addFilter("ratings"));
          }
        }

        if (props.searchParams.reviews && !filters.includes("reviews")) {
          if (props.searchParams.reviews === "<10") {
            // need to set up so that subtarct takjes from original array -> need another use effect?
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.reviews < 10
                  )
                )
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.reviews < 10))
              );
            }
          }
          if (props.searchParams.reviews === "10-100") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.reviews >= 10 && result.reviews <= 100
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 10 && result.reviews <= 100
                  )
                )
              );
            }
          }
          if (props.searchParams.reviews === "100-250") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.reviews >= 100 && result.reviews <= 250
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 100 && result.reviews <= 250
                  )
                )
              );
            }
          }
          if (props.searchParams.reviews === "250-500") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.reviews >= 250 && result.reviews <= 500
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 250 && result.reviews <= 500
                  )
                )
              );
            }
          }

          if (props.searchParams.reviews === "500-1000") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.reviews >= 500 && result.reviews <= 1000
                  )
                )
              );
            } else {
              dispatch(
                filterOn(
                  filterView.filter(
                    (result) => result.reviews >= 500 && result.reviews <= 1000
                  )
                )
              );
            }
          }
          if (props.searchParams.reviews === "1000+") {
            if (filterView.length === 0) {
              dispatch(
                filterOn(
                  categories[props.params.category].filter(
                    (result) => result.reviews >= 1000
                  )
                )
              );
            } else {
              dispatch(
                filterOn(filterView.filter((result) => result.reviews >= 1000))
              );
            }
          }
          if (filterType === "add") {
            dispatch(addFilter("reviews"));
          }
        }
      }
    } else {
      let baseList;
      if (props.params.category === "search") {
        baseList = searchResults;
      } else {
        baseList = categories[props.params.category];
      }
      for (let keys in checklist) {
        if (checklist[keys] === "Up to $25") {
          baseList = baseList.filter((result) => result.price <= 25);
        } else if (checklist[keys] === "$25-$50") {
          baseList = baseList.filter(
            (result) => result.price >= 25 && result.price <= 50
          );
        } else if (checklist[keys] === "$50-$100") {
          baseList = baseList.filter(
            (result) => result.price >= 50 && result.price <= 100
          );
        } else if (checklist[keys] === "$100-$200") {
          baseList = baseList.filter(
            (result) => result.price >= 100 && result.price <= 200
          );
        } else if (checklist[keys] === "$200+") {
          baseList = baseList.filter((result) => result.price >= 200);
        } else if (checklist[keys] === "5 Stars") {
          baseList = baseList.filter((result) => result.rating === 5);
        } else if (checklist[keys] === "4 Stars") {
          baseList = baseList.filter(
            (result) => result.rating >= 4 && result.rating < 5
          );
        } else if (checklist[keys] === "3 Stars") {
          baseList = baseList.filter(
            (result) => result.rating >= 3 && result.rating < 4
          );
        } else if (checklist[keys] === "2 Stars") {
          baseList = baseList.filter(
            (result) => result.rating >= 2 && result.rating < 3
          );
        } else if (checklist[keys] === "1 Star") {
          baseList = baseList.filter(
            (result) => result.rating >= 1 && result.rating < 2
          );
        } else if (checklist[keys] === "<10") {
          baseList = baseList.filter((result) => result.reviews < 10);
        } else if (checklist[keys] === "10-100") {
          baseList = baseList.filter(
            (result) => result.reviews >= 10 && result.reviews <= 100
          );
        } else if (checklist[keys] === "100-250") {
          baseList = baseList.filter(
            (result) => result.reviews >= 100 && result.reviews <= 250
          );
        } else if (checklist[keys] === "250-500") {
          baseList = baseList.filter(
            (result) => result.reviews >= 250 && result.reviews <= 500
          );
        } else if (checklist[keys] === "500-1000") {
          baseList = baseList.filter(
            (result) => result.reviews >= 500 && result.reviews <= 1000
          );
        } else if (checklist[keys] === "1000+") {
          baseList = baseList.filter((result) => result.reviews >= 1000);
        }
      }
      dispatch(filterOn(baseList));
    }
  }, [props.params, props.searchParams]);

  const clickHandler = (event) => {
    let path;
    let filters = "";
    for (let keys in props.searchParams) {
      if (props.searchParams[keys]) {
        if (filters.length === 0) {
          filters += `${keys}=${props.searchParams[keys]}`;
        } else {
          filters += `&${keys}=${props.searchParams[keys]}`;
        }
      }
    }

    if (event === "back" && Number(props.params.page) > 1) {
      if (props.params.category === "search") {
        path = `/shop/${props.params.recipient}/search/${
          Number(props.params.page) - 1
        }/filter?`;
        path += filters;
        router.push(path);
      } else {
        path = `/shop/${props.params.recipient}/${props.params.category}/${
          Number(props.params.page) - 1
        }/filter?`;
        path += filters;
        router.push(path);
      }
    } else if (event === "forward") {
      if (props.params.category === "search") {
        path = `/shop/${props.params.recipient}/search/${
          Number(props.params.page) + 1
        }/filter?`;
        path += filters;
        router.push([path]);
      } else {
        path = `/shop/${props.params.recipient}/${props.params.category}/${
          Number(props.params.page) + 1
        }/filter?`;
        path += filters;
        router.push(path);
      }
    }
  };

  const limit = 12;
  const offset = (props.params.page - 1) * limit;

  return (
    <>
      <ProductCards filterView={filterView} limit={limit} offset={offset} />
      <div className="flex justify-center items-center pt-14 pb-24 gap-8">
        <button
          id="back"
          className={`${props.params.page > 1 ? "" : "hidden"} flex items-center justify-center gap-4 rounded-md p-4 bg-cblue-500 text-white shadow-xl w-[15%] cursor-pointer text-2xl`}
          onClick={() => clickHandler("back")}
        >
          <AiOutlineLeft className="scale-150" />
          <h2>Previous Page</h2>
        </button>
        <div className="rounded-md text-2xl p-4 bg-white text-cblue-700 shadow-xl w-[5%]">
          <h2 className="text-center">{props.params.page}</h2>
        </div>
        <button
          id="forward"
          className="flex items-center justify-center gap-4 rounded-md p-4 bg-cblue-500 text-white shadow-xl w-[15%] cursor-pointer text-2xl"
          onClick={() => clickHandler("forward")}
        >
         <h2> Next Page</h2>
          <AiOutlineRight className="scale-150" />
        </button>
      </div>
    </>
  );
};

export default FilterPage;
