"use client";
import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

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

  return (
    <div>
      {productList.length === 0 ? (
        checklist.prices || checklist.ratings || checklist.reviews ? (
          "No Products Found. Try Another Search!"
        ) : (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-evenly w-full">
          <div className="grid grid-cols-4 gap-[2rem] ">
            {productList
              .slice(props.offset, props.offset + props.limit)
              .map((product, index) => (
                <Card key={index} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCards;
