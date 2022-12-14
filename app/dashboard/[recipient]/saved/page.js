"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGifts } from "../../../../store/recipientSlice";
import ProductContainer from "./ProductContainer";

const page = () => {
  const [gifts, setGifts] = useState([]);
  const [saved, setSaved] = useState([]);
  const { singleRecipient } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!singleRecipient.gifts) {
      dispatch(getGifts(singleRecipient.id));
    }
  }, [singleRecipient.id]);

  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="h-[50px] border-b-2 border-cblue-700 my-4">
        <h1 className="mx-4">Saved Gifts</h1>
      </div>
      <div className="px-4 grow w-full overflow-y-auto">
        <ProductContainer
          gifts={gifts}
          saved={saved}
          setGifts={setGifts}
          setSaved={setSaved}
        />
      </div>
    </div>
  );
};

export default page;
