"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Recipient from "./Recipient";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";

function Sidebar() {
  const { userId, isLoadingRedux } = useSelector((store) => store.user);
  const { recipients } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipients(userId));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-md bg-white shadow-xl">
      <div className="w-full text-center">
        <div className="flex justify-center items-center h-[40px] bg-cblue-700 text-cwhite rounded-t-md shadow-xl">
          <h3>Gift Recipients</h3>
        </div>
        <div class="w-full h-full" aria-label="Sidebar">
          <div class="overflow-y-auto py-4 px-3 bg-white rounded dark:bg-gray-800">
            <ul class="space-y-2">
              {isLoadingRedux ? (
                <li>Loading Recipients..</li>
              ) : (
                recipients.map((recipient, index) => {
                  return <Recipient recipient={recipient} key={index} />;
                })
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="m-4 h-[10%]">
        <Link href={"/dashboard/addnew"}>
          <button className="text-center w-full h-full rounded-sm hover:scale-105 ease-in duration-150 shadow-lg">
            <h3>Add Recipient +</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
