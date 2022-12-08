"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGifts } from "../../../../store/recipientSlice";
import ProductContainer from "./ProductContainer";
import SavedFilter from "./SavedFilter";

const page = () => {
  const [gifts, setGifts] = useState([]);
  const [saved, setSaved] = useState([]);
  const [filter, setFilter] = useState("saved");
  const { singleRecipient } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGifts(singleRecipient.id));
  }, [singleRecipient.id]);

  return (
    <div>
      <SavedFilter setFilter={setFilter} type={"saved"} />

      <SavedFilter setFilter={setFilter} type={"gifted"} />

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
