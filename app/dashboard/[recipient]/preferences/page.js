"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreferenceContainer from "./PreferenceContainer";
import { fetchPreferences } from "../../../../store/recipientSlice";

const Page = ({ params }) => {
  return (
    <div>
      <PreferenceContainer />

      <br />
    </div>
  );
};

export default Page;
