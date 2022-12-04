"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Recipient from "./Recipient";
//import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";

//const recipients = []

function Sidebar() {
  const { user, isLoadingRedux } = useSelector((store) => store.user);
  const { recipients } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipients(user));
  }, [dispatch, user]);

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-sm bg-neutral-100/80 shadow-xl shadow-gray-400">
      <div className="w-full text-center">
        <div className="flex justify-center items-center h-[40px] bg-[#5460e7] text-white rounded-t-md shadow-md shadow-gray-400">
          <h3>Gift Recipients</h3>
        </div>
        <div className="">
          {isLoadingRedux
            ? "Loading Recipients.."
            : recipients.map((recipient, index) => {
                return <Recipient recipient={recipient} key={index} />;
              })}
        </div>
      </div>
      <div className="m-4 h-[10%] bg-green-50">
        <button className="text-center w-full h-full rounded-sm hover:scale-105 ease-in duration-150 shadow-lg shadow-gray-400 ">
          <Link href={"/dashboard/addnew"}>
            <h3>Add Recipient +</h3>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
