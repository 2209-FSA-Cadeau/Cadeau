"use client";
import Link from "next/link";
import React, { useState } from "react";
import { setSingleRecipient } from "../../store/recipientSlice";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import RemoveRecModal from "./RemoveRecModal";

const Recipient = ({ recipient }) => {
  const { tab } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();
  const [xIsShown, setXIsShown] = useState(false);
  const [modalIsShown, setModalIsShown] = useState(false);

  const handleClick = (evt) => {
    dispatch(setSingleRecipient(recipient.id));

  };

  return (
    <>
      <li
        onMouseEnter={() => setXIsShown(true)}
        onMouseLeave={() => setXIsShown(false)}
      >
        <div className="flex justify-between items-center text-lg font-normal text-cblue-900 rounded-lg hover:bg-neutral-100">
          <Link
            href={`/dashboard/${recipient.name}/${tab}`}
            onClick={handleClick}
            className="flex items-center p-2 text-lg font-norma grow"
          >
            <span className="ml-3 text-left">{recipient.name}</span>
          </Link>
          {xIsShown && (
            <div
              onClick={() => setModalIsShown(true)}
              className="h-full rounded-r-lg hover:text-red-700"
            >
              <AiOutlineClose className="m-2" />
            </div>
          )}
        </div>
      </li>
      <RemoveRecModal
        recipient={recipient}
        modalIsShown={modalIsShown}
        setModalIsShown={setModalIsShown}
      />
    </>
  );
};

export default Recipient;
