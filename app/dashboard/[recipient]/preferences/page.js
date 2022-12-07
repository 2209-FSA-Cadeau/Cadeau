"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreferenceContainer from "./PreferenceContainer";
import { fetchPreferences } from "../../../../store/recipientSlice";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const singleRecipient = useSelector(
    (store) => store.recipients.singleRecipient
  );

  useEffect(() => {
    dispatch(fetchPreferences(singleRecipient.id));
  },[singleRecipient.id]);


  return (
    <div>
      <br />
      <b>Recipient Preferences</b>
      <br />
      <PreferenceContainer />

      <br />
    </div>
  );
};

export default Page;
