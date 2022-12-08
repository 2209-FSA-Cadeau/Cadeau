import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductContainer(props) {
  const { display, gifts, saved, setGifts, setSaved } = props;
  const { singleRecipient } = useSelector((store) => store.recipients);

  useEffect(() => {
    if (gifts.length === 0) {
      setGifts(singleRecipient.gifts[0].gifts);
    }
    console.log(`Gifts length = ${gifts.length}`);
  }, [gifts]);

  return (
    <div>
      <div>
        <h2>Gifted</h2>
        {gifts.length > 0
          ? gifts.map((gift) => {
              return <li>{gift.name}</li>;
            })
          : "no gifts"}
      </div>
      <div>
        <h2>Saved</h2>
        {saved.map((save, index) => {
          <li>Save {index}</li>;
        })}
      </div>
    </div>
  );
}
