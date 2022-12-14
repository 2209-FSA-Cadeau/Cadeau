"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Stars from "./Stars";
import SingleProductModal from "../../(singleproduct)/singleProductModal";
import {
  saveItem,
  setSingleRecipient,
} from "../../../../../store/recipientSlice";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const { recipients, singleRecipient } = useSelector(
    (store) => store.recipients
  );
  const path = usePathname();

  useEffect(() => {
    const newRecipient = path.split("/")[2].split("%20").join(" ");

    if (
      (singleRecipient && singleRecipient.id) ||
      singleRecipient.preferences.length === 0
    ) {
      const found = recipients.find(
        (recipient) => recipient.name === newRecipient
      );
      dispatch(setSingleRecipient(found.id));
    }
  }, []);

  const [productModalIsShown, setProductModalIsShown] = useState(false);
  const productPrice = `$${product.price}`.includes(".")
    ? `$${product.price}`
    : `$${product.price}.00`;
  const productRating = `${product.rating}`.includes(".")
    ? `${product.rating}`
    : `${product.rating}.0`;

  const handleSaveItem = () => {
    const saveObj = {
      recipientId: singleRecipient.id,
      name: product.title,
      description: product.snippet,
      imageUrl: product.primary_image,
      price: product.price,
      link: product.link,
      rating: product.rating,
    };
    dispatch(saveItem(saveObj));
  };

  return (
    <div className="w-full h-full max-w-sm min-w-xs bg-white rounded-lg shadow-xl flex flex-col justify-end">
      <div
        className="cursor-pointer grow flex flex-col justify-center"
        onClick={() => setProductModalIsShown(true)}
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
          onClick={() => setProductModalIsShown(true)}
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
          <button
            className="text-white bg-cblue-700 hover:bg-cblue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={handleSaveItem}
          >
            Save
          </button>
        </div>
      </div>
      {productModalIsShown ? (
        <SingleProductModal
          product={product}
          productModalIsShown={productModalIsShown}
          setProductModalIsShown={setProductModalIsShown}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
