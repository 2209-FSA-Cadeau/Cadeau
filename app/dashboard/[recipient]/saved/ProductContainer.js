import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHolidays,
  getGifts,
  removeItem,
} from "../../../../store/recipientSlice";
import ProductCard from "./ProductCard";

export default function ProductContainer(props) {
  const { gifts, setGifts } = props;
  const { singleRecipient } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!singleRecipient.gifts) {
      dispatch(getGifts(singleRecipient.id));
    } else {
      setGifts(singleRecipient.gifts);
    }

    if (singleRecipient.id && !singleRecipient.holidays) {
      dispatch(fetchHolidays(singleRecipient.id));
    }
  }, [gifts, singleRecipient.holidays]);

  useEffect(() => {
    setGifts(singleRecipient.gifts);
  }, [singleRecipient.gifts]);

  return (
    <div className="flex flex-col justify-evenly items-center w-full overflow-y-auto">
      <div className="grid grid-cols-3 gap-[2rem] items-center justify-center content-center self-auto">
        {gifts.length > 0 ? (
          gifts.map((gift) => {
            return (
              <ProductCard key={gift.id} gift={gift} />
              // <div key={gift.id}>
              //   <a href={gift.link}>
              //     <img src={gift.imageUrl} />
              //   </a>
              //   <div>Name: {gift.name}</div>

              //   <br />
              //   <button onClick={() => onClickHandler(gift.id)}>
              //     Remove Gift
              //   </button>
              // </div>
            );
          })
        ) : (
          <h2>Save some items to get started</h2>
        )}
      </div>
    </div>
  );
}
