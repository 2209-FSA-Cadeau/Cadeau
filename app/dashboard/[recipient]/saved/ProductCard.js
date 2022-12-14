"use client";
import React from "react";
import Stars from "./Stars";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../../../store/recipientSlice";

export default function ProductCard({ gift }) {
  // const [productModalIsShown, setProductModalIsShown] = useState(false);
  const { singleRecipient } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();
  const giftPrice = `$${gift.price}`.includes(".")
    ? `$${gift.price}`
    : `$${gift.price}.00`;
  const giftRating = `${gift.rating}`.includes(".")
    ? `${gift.rating}`
    : `${gift.rating}.0`;

  const onClickHandler = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="w-full h-full max-w-sm min-w-xs bg-white rounded-lg shadow-xl flex flex-col justify-end">
      <a
        href={gift.link}
        className="cursor-pointer grow flex flex-col justify-center"
        // onClick={() => setProductModalIsShown(true)}
        target="_blank"
      >
        <img
          className="p-8 rounded-t-lg"
          src={gift.imageUrl}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a
          href={gift.link}
          className="cursor-pointer"
          // onClick={() => setProductModalIsShown(true)}
          target="_blank"
        >
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {gift.name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5 text-cgold-500 gap-2">
          {gift.rating ? <Stars rating={gift.rating} /> : ""}
          {gift.rating ? (
            <span className="bg-cblue-100 text-cblue-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              {giftRating}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">{giftPrice}</span>
          <button
            onClick={() => onClickHandler(gift.id)}
            className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Remove
          </button>
        </div>
      </div>
      {/* {productModalIsShown ? (
        <SingleProductModal
          product={product}
          productModalIsShown={productModalIsShown}
          setProductModalIsShown={setProductModalIsShown}
        />
      ) : (
        ""
      )} */}
    </div>
  );
}
