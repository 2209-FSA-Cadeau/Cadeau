"use client";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Recipient from "./Recipient";
//import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";

//const recipients = []

function Sidebar() {
  const {user, isLoadingRedux} = useSelector((store) => store.user);
  const { recipients } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipients(user));
  }, [dispatch, user]);

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-md border-2 border-black bg-neutral-100/80 shadow-2xl">
      <div className="w-full text-center">
        <div className="border-b-2 border-black bg-[#5460e7] text-white rounded-t-md">
          <h3>Gift Recipients</h3>
        </div>
        <div className="">
          {isLoadingRedux
            ? "Loading Recipients.."
            : recipients.map((recipient) => {
                return <Recipient recipient={recipient} key={recipient.id} />;
              })}
        </div>
      </div>
      <div className="m-4 h-[10%] bg-green-50">
        <button className="text-center w-full h-full border-2 border-black rounded-md hover:scale-105 ease-in duration-150 shadow-lg ">
          <h3>Add Recipient +</h3>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
