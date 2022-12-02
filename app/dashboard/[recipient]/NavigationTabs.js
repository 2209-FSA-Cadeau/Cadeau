import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setTab } from "../../../store/recipientSlice";
import { CgSmileMouthOpen, CgNotes } from "react-icons/cg";
import { BiGift } from "react-icons/bi";

const NavigationTabs = ({ params }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-evenly w-full my-6">
      <Link
        href={`/dashboard/${params.recipient}/preferences`}
        className="basis-1/3"
        onClick={() => {
          dispatch(setTab("preferences"));
        }}
      >
        <div className="flex justify-evenly items-center w-full">
          <h3>Recipient Preferences</h3>
          <CgSmileMouthOpen className="scale-120" />
        </div>
      </Link>
      <Link
        href={`/dashboard/${params.recipient}/saved`}
        className="basis-1/3"
        onClick={() => {
          dispatch(setTab("saved"));
        }}
      >
        <div className="flex justify-evenly items-center w-full">
          <h3>Saved Gifts</h3>
          <BiGift />
        </div>
      </Link>
      <Link
        href={`/dashboard/${params.recipient}/notes`}
        className="basis-1/3"
        onClick={() => {
          dispatch(setTab("notes"));
        }}
      >
        <div className="flex justify-evenly items-center w-full">
          <h3>Notes for Later</h3>
          <CgNotes />
        </div>
      </Link>
    </div>
  );
};

export default NavigationTabs;
