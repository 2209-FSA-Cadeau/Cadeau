"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Recipient from "./Recipient";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";
import { useUser } from "@auth0/nextjs-auth0";
import { addOrFindUser } from "../../store/userSlice"

function Sidebar() {
  const { userId, isLoadingRedux } = useSelector((store) => store.user);
  const { recipients } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();

  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (user.firstName && user.lastName) {
        dispatch(addOrFindUser(user));
      }
      console.log(user)
      dispatch(
        addOrFindUser({
          identifier: user.sub,
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
        })
      );
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(fetchRecipients(userId));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-md bg-white shadow-xl">
      <div className="w-full text-center">
        <div className="flex justify-center items-center h-[40px] bg-cblue-700 text-cwhite rounded-t-md shadow-xl">
          <h3>Gift Recipients</h3>
        </div>
        <div className="w-full h-full" aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 bg-white rounded dark:bg-gray-800">
            <ul className="space-y-2">
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
