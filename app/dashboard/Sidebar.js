"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Recipient from "./Recipient";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecipients,
  getGifts,
  setSingleRecipient,
} from "../../store/recipientSlice";
import AddNewModal from "./(addnew)/AddNewModal";

function Sidebar() {
  const { userId, isLoadingRedux } = useSelector((store) => store.user);
  const { recipients, singleRecipient } = useSelector(
    (store) => store.recipients
  );
  const [addNewModalIsShown, setAddNewModalIsShown] = useState(false);
  const [newUser, setNewUser] = useState(window.localStorage.getItem("new"));
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    setNewUser(window.localStorage.getItem("new"));
  }, [isLoadingRedux, addNewModalIsShown]);

  useEffect(() => {
    console.log(newUser)
    // if (isLoadingRedux || newUser) {
    // } else if (userId && recipients.length === 0) {
    //   dispatch(fetchRecipients(userId));
    // } else if (userId && recipients.length > 0 && !singleRecipient.id) {
    //   if (pathname.includes("preferences") || pathname.includes("notes")) {
    //     const parsed = pathname.split("/")[2].split("%20").join(" ");
    //     const newRecipient = recipients.filter(
    //       (recipient) => recipient.name === parsed
    //     );
    //     dispatch(setSingleRecipient(newRecipient[0].id));
    //   } else if (pathname.includes("saved")) {
    //     const parsed = pathname.split("/")[2].split("%20").join(" ");
    //     const newRecipient = recipients.filter(
    //       (recipient) => recipient.name === parsed
    //     );
    //     dispatch(setSingleRecipient(newRecipient[0].id));
    //     dispatch(getGifts(newRecipient[0].id));
    //   }
    // }
    if (newUser) {
      setAddNewModalIsShown(true);
    }
  }, [isLoadingRedux, recipients, singleRecipient.id, userId]);

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-md bg-white shadow-xl">
      <div className="flex flex-col justify-start w-full text-center grow min-h-0">
        <div className="flex justify-center items-center h-[40px] bg-cblue-700 text-cwhite rounded-t-md shadow-md z-10">
          <h3>Gift Recipients</h3>
        </div>
        <div
          className="w-full h-full grow min-h-0 overflow-y-scroll"
          aria-label="Sidebar"
        >
          <div className="overflow-y-scroll py-4 px-3 bg-white rounded">
            <ul className="space-y-2">
              {isLoadingRedux ? (
                <li>Loading Recipients..</li>
              ) : newUser ? (
                ""
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
        <button
          onClick={() => setAddNewModalIsShown(true)}
          className="shadow-xl rounded-md uppercase bg-gradient-to-br from-cblue-700 to-cblue-500 text-cwhite text-center w-full h-full hover:scale-105 ease-in duration-100"
        >
          <h3>Add Recipient +</h3>
        </button>
      </div>
      {newUser ? (
        <AddNewModal
          firstTime={true}
          addNewModalIsShown={addNewModalIsShown}
          setAddNewModalIsShown={setAddNewModalIsShown}
        />
      ) : (
        <AddNewModal
          firstTime={false}
          addNewModalIsShown={addNewModalIsShown}
          setAddNewModalIsShown={setAddNewModalIsShown}
        />
      )}
    </div>
  );
}

export default Sidebar;
