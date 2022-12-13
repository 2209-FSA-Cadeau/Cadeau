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
    <div>
      <ProductContainer
        gifts={gifts}
        saved={saved}
        setGifts={setGifts}
        setSaved={setSaved}
      />
    </div>
  );
};

export default page;
