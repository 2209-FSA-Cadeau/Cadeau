"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PreferenceContainer from "./PreferenceContainer";
import { addLikes, fetchPreferences } from "../../../../store/recipientSlice";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const singleRecipient = useSelector(
    (store) => store.recipients.singleRecipient
  );

  useEffect(() => {
    dispatch(fetchPreferences(singleRecipient.id));
  },[singleRecipient.id]);
  // useEffect(() => {
  //   dispatch(fetchPreferences(singleRecipient.id));

  //   let newOptions = [];
  //   let prevChoices = [];

  //   if (!singleRecipient.preferences) {
  //     setOptions(categories);
  //   } else if (likes.length === 0 && dislikes.length === 0) {
  //     singleRecipient.preferences.map((preference) =>
  //       prevChoices.push(preference.category)
  //     );
  //     for (let i = 0; i < categories.length; i++) {
  //       if (prevChoices.indexOf(categories[i].label) === -1) {
  //         newOptions.push(categories[i]);
  //       }
  //     }
  //     setOptions(newOptions);
  //   } else if (likes.length > 0 || dislikes.length > 0) {
  //     for (let i = 0; i < categories.length; i++) {
  //       if (
  //         likes.indexOf(categories[i].label) === -1 &&
  //         dislikes.indexOf(categories[i].label) === -1
  //       ) {
  //         newOptions.push(categories[i]);
  //       }
  //     }
  //     setOptions(newOptions);
  //   } else {
  //     setOptions(categories);
  //   }

  // }, [likes, dislikes]);

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
