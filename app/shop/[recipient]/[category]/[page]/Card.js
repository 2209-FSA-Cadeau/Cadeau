"use client"
import React from "react";
import Stars from "./Stars";

const Card = ({ product }) => {

const productPrice = `$${product.price}`.includes(".") ? `$${product.price}` : `$${product.price}.00`
const productRating = `${product.rating}`.includes(".") ? `${product.rating}` : `${product.rating}.0`

  return (
      <div className="w-full h-full max-w-sm min-w-xs bg-white rounded-lg shadow-xl flex flex-col justify-end">
        <div
          className="cursor-pointer grow flex flex-col justify-center"
          // onClick={""}
        >
          <img
            className="p-8 rounded-t-lg"
            src={product.image}
            alt="product image"
          />
        </div>
        <div className="px-5 pb-5">
          <div
            className="cursor-pointer"
            //   onClick={""}
          >
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {product.title}
            </h5>
          </div>
          <div className="flex items-center mt-2.5 mb-5 text-cgold-500 gap-2">
            <Stars rating={product.rating} />
            <span className="bg-cblue-100 text-cblue-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              {productRating}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">
              {productPrice}
            </span>
            <button className="text-white bg-cblue-700 hover:bg-cblue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Save
            </button>
          </div>
        </div>
      </div>
  );
};

export default Card;
