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

  const skeleton = [];
  for (let i = 0; i < 30; i++) {
    skeleton.push(Math.round(Math.random() * 100) / 500);
  }

  return (
    <div className="w-full h-full">
      {productList.length === 0 ? (
        checklist.prices || checklist.ratings || checklist.reviews ? (
          "No Products Found. Try Another Search!"
        ) : (
          <div role="status" className="w-full h-full animate-pulse">
            {skeleton.map((rand, index) => {
              // console.log(rand);
              return (
                <div
                  key={index}
                  className={`h-3 bg-gray-200 rounded-full mb-4 w-[80%]`}
                ></div>
              );
            })}
            {/* <span className="sr-only">Loading...</span> */}
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
