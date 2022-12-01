"use client";
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Recipient from "./Recipient";
//import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";

//const recipients = []

function Sidebar() {
  const { user, error, isLoading } = useUser();
  const { recipients } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipients(user));
  }, [dispatch, user]);

  //if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="fixed left-[1%] h-[96vh] w-[20%] p-4">
      <div className="flex flex-col justify-between w-full h-full rounded-md border-2 border-black bg-blue-50">
        <div className="w-full text-center">
          <h3 className="border-b-2 border-black">Gift Recipients</h3>
          <div className="">
            {isLoading
              ? "Loading Recipients.."
              : recipients.map((recipient) => {
                  return <Recipient recipient={recipient} key={recipient.id} />;
                })}
          </div>
        </div>
        <div className="m-4 h-[10%] bg-green-50">
          <button className="text-center w-full h-full border-2 border-black rounded-md ">
            <h3>Add Recipient +</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
