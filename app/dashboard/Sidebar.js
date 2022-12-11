"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Recipient from "./Recipient";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipients } from "../../store/recipientSlice";
import AddNewModal from "./(addnew)/AddNewModal";

function Sidebar() {
  const { userId, isLoadingRedux } = useSelector((store) => store.user);
  const { recipients } = useSelector((store) => store.recipients);
  const [addNewModalIsShown, setAddNewModalIsShown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipients(userId));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-md bg-white shadow-xl">
      <div className="flex flex-col justify-start w-full text-center grow min-h-0">
        <div className="flex justify-center items-center h-[40px] bg-cblue-700 text-cwhite rounded-t-md shadow-xl">
          <h3>Gift Recipients</h3>
        </div>
        <div class="w-full h-full grow min-h-0 overflow-y-scroll" aria-label="Sidebar">
          <div class="overflow-y-scroll py-4 px-3 bg-white rounded dark:bg-gray-800">
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
          <button onClick={() => setAddNewModalIsShown(true)} className="shadow-xl rounded-md uppercase bg-gradient-to-br from-cblue-700 to-cblue-500 text-cwhite text-center w-full h-full hover:scale-105 ease-in duration-100">
            <h3>Add Recipient +</h3>
          </button>
      </div>
      <AddNewModal firstTime={false} addNewModalIsShown={addNewModalIsShown} setAddNewModalIsShown={setAddNewModalIsShown}/>
    </div>
  );
}

export default Sidebar;
