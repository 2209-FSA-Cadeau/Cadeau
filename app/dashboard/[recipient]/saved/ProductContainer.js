import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGifts, removeItem } from "../../../../store/recipientSlice";

export default function ProductContainer(props) {
  const { gifts, setGifts } = props;
  const { singleRecipient } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!singleRecipient.gifts) {
      console.log("loading");
    } else {
      setGifts(singleRecipient.gifts);
    }
  }, [gifts]);

  const onClickHandler = async (id) => {
    await dispatch(removeItem(id));
    setGifts(singleRecipient.gifts);
  };

  return (
    <div>
      <div>
        <h2>Saved Gifts</h2>
        {gifts.length > 0
          ? gifts.map((gift) => {
              return (
                <div key={gift.id}>
                  <a href={gift.link}>
                    <img src={gift.imageUrl} />
                  </a>
                  <div>Name: {gift.name}</div>
                  <div>Description: {gift.description}</div>
                  <b>Purchased?</b>
                  <button onClick={() => onClickHandler(gift.id)}>
                    Unsave
                  </button>
                </div>
              );
            })
          : "no gifts"}
      </div>
    </div>
  );
}
