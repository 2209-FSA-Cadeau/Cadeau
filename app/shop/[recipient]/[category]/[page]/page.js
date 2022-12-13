"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import ProductCards from "./ProductCards";
import {
  getSingleCategory,
  getSearchResults,
} from "../../../../../store/shopSlice";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"

const PagePage = (props) => {
  const { categories, searchResults } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (props.params.category !== "search") {
      if (categories[props.params.category].length === 0) {
        if (props.params.category !== "Top%20Choices") {
          dispatch(getSingleCategory(props.params.category));
        }
      }
    } else {
      if (searchResults.length === 0) {
        dispatch(
          getSearchResults({
            category: props.searchParams.category,
            value: props.searchParams.value,
          })
        );
      }
    }
  }, []);

  const clickHandler = (event) => {
    if (event.target.id === "back" && Number(props.params.page) > 1) {
      if (props.searchParams.filter) {
        if (props.params.category === "search") {
          router.push(
            `/shop/${props.params.recipient}/search/${
              Number(props.params.page) - 1
            }?category=${props.searchParams.category}&value=${
              props.searchParams.value
            }&filter=${props.searchParams.filter}`
          );
        } else {
          router.push(
            `/shop/${props.params.recipient}/${props.params.category}/${
              Number(props.params.page) - 1
            }?filter=${props.searchParams.filter}`
          );
        }
      } else {
        if (props.params.category === "search") {
          router.push(
            `/shop/${props.params.recipient}/search/${
              Number(props.params.page) - 1
            }?category=${props.searchParams.category}&value=${
              props.searchParams.value
            }`
          );
        } else {
          router.push(
            `/shop/${props.params.recipient}/${props.params.category}/${
              Number(props.params.page) - 1
            }`
          );
        }
      }
    } else if (event.target.id === "forward") {
      if (props.searchParams.filter) {
        if (props.params.category === "search") {
          router.push(
            `/shop/${props.params.recipient}/search/${
              Number(props.params.page) + 1
            }?category=${props.searchParams.category}&value=${
              props.searchParams.value
            }&filter=${props.searchParams.filter}`
          );
        } else {
          router.push(
            `/shop/${props.params.recipient}/${props.params.category}/${
              Number(props.params.page) + 1
            }?filter=${props.searchParams.filter}`
          );
        }
      } else {
        if (props.params.category === "search") {
          router.push(
            `/shop/${props.params.recipient}/search/${
              Number(props.params.page) + 1
            }?category=${props.searchParams.category}&value=${
              props.searchParams.value
            }`
          );
        } else {
          router.push(
            `/shop/${props.params.recipient}/${props.params.category}/${
              Number(props.params.page) + 1
            }`
          );
        }
      }
    }
  };

  const limit = 12;
  const offset = (props.params.page - 1) * limit;

  return (
    <>
      <div>
        <ProductCards
          searchResults={searchResults}
          categories={categories[props.params.category]}
          category={props.params.category}
          limit={limit}
          offset={offset}
        />
      </div>
      <div className="flex justify-center items-center pt-14 pb-24 gap-8">
        <div
          id="back"
          className="flex items-center justify-center gap-4 rounded-md p-4 bg-cblue-500 text-white shadow-xl w-[15%] cursor-pointer"
          onClick={clickHandler}
        >
          <AiOutlineLeft className="scale-150" />
          <h2>Previous Page</h2>
        </div>
        <div className="rounded-md text-2xl p-4 bg-white text-cblue-700 shadow-xl w-[5%]">
          <h2 className="text-center">{props.params.page}</h2>
        </div>
        <div
          id="forward"
          className="flex items-center justify-center gap-4 rounded-md p-4 bg-cblue-500 text-white shadow-xl w-[15%] cursor-pointer"
          onClick={clickHandler}
        >
          <h2>Next Page</h2>
          <AiOutlineRight className="scale-150" />
        </div>
      </div>
    </>
  );
};

export default PagePage;
