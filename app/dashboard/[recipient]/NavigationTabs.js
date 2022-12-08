"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setTab } from "../../../store/recipientSlice";
import { CgNotes } from "react-icons/cg";
import { BiGift } from "react-icons/bi";
import { RiUserSettingsLine } from "react-icons/ri";

const NavigationTabs = ({ params }) => {
  const { tab } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();
  let [tabArray, setTabArray] = useState([
    { tab: "preferences", css: "" },
    { tab: "saved", css: "" },
    { tab: "notes", css: "" },
  ]);

  useEffect(() => {
    setTabArray(
      tabArray.map((elem) => {
        if (elem.tab === tab) {
          return {
            tab: elem.tab,
            css: "basis-1/3 h-full flex justify-center items-center rounded-t-2xl bg-cgold-500 shadow-xl text-cwhite",
          };
        } else {
          return {
            tab: elem.tab,
            css: "basis-1/3 h-full flex justify-center items-center rounded-t-2xl bg-cgold-300 hover:text-cgold-600",
          };
        }
      })
    );
    console.log(tabArray);
  }, [tab]);

  return (
    <div className="flex justify-evenly items-center w-full gap-1">
      <Link
        href={`/dashboard/${params.recipient}/preferences`}
        className={tabArray[0].css}
        onClick={() => {
          dispatch(setTab("preferences"));
        }}
      >
        <div className="flex justify-center items-center p-4 w-[60%]">
          <div className="flex justify-evenly items-center w-full">
            <h3>Preferences</h3>
            <RiUserSettingsLine className="scale-150" />
          </div>
        </div>
      </Link>
      <Link
        href={`/dashboard/${params.recipient}/saved`}
        className={tabArray[1].css}
        onClick={() => {
          dispatch(setTab("saved"));
        }}
      >
        <div className="flex justify-center items-center p-4 w-[60%]">
          <div className="flex justify-evenly items-center w-full">
            <h3>Saved Gifts</h3>
            <BiGift className="scale-150" />
          </div>
        </div>
      </Link>
      <Link
        href={`/dashboard/${params.recipient}/notes`}
        className={tabArray[2].css}
        onClick={() => {
          dispatch(setTab("notes"));
        }}
      >
        <div className="flex justify-center items-center p-4 w-[60%]">
          <div className="flex justify-evenly items-center w-full">
            <h3>Notes for Later</h3>
            <CgNotes className="scale-150" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavigationTabs;
