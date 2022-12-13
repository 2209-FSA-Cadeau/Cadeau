"use client";
import React from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";

const ProductCards = (props) => {
  const { checklist } = useSelector((state) => state.shop);
  let productList = [];

  if (props.filterView) {
    productList = props.filterView;
  } else if (props.category === "search") {
    productList = props.searchResults;
  } else {
    productList = props.categories || [];
  }

  if (checklist.prices || checklist.ratings || checklist.reviews) {
    return (
      <div>
        {productList.length === 0 ? (
          "No Products Found. Try Another Search!"
        ) : (
          <Cards
            productList={productList}
            offset={props.offset}
            limit={props.limit}
          />
        )}
      </div>
    );
  } else {
    return (
      <div>
        {productList.length === 0 ? (
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <Cards
            productList={productList}
            offset={props.offset}
            limit={props.limit}
          />
        )}
      </div>
    );
  }
};

export default ProductCards;
