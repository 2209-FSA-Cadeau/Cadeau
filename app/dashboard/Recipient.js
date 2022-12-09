"use client";
import Link from "next/link";
import React from "react";
import { setSingleRecipient } from "../../store/recipientSlice";
import { useSelector, useDispatch } from "react-redux";

const Recipient = ({ recipient }) => {
  const { tab } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  const handleClick = (evt) => {
    dispatch(setSingleRecipient(recipient.id));
  };

  return (
    <Link href={`/dashboard/${recipient.name}/${tab}`} onClick={handleClick}>
      <div className="h-[45px] rounded-md m-4 bg-cblue-700/40 text-cwhite hover:scale-105 ease-in duration-150 drop-shadow-xl flex justify-center items-center">
        <h3>{recipient.name}</h3>
      </div>
    </Link>
  );
};

export default Recipient;
