import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductContainer(props) {
  const { display, gifts, saved, setGifts, setSaved } = props;
  const { singleRecipient } = useSelector((store) => store.recipients);

  useEffect(() => {
    if (!singleRecipient.gifts) {
      console.log("loading");
    } else {
      setGifts(singleRecipient.gifts[0].gifts);
    }
  }, [gifts]);

  return (
    <div>
      <div>
        <h2>Gifted</h2>
        {gifts.length > 0
          ? gifts.map((gift, index) => {
              return (
                <li key={index}>
                  <a href={gift.link}>
                    {gift.name}
                    <img src={gift.imageUrl} />
                  </a>
                </li>
              );
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
