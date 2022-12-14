"use client";
import React from "react";
import PreferenceContainer from "./PreferenceContainer";

const Page = ({ params }) => {
  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="h-[50px] border-b-2 border-cblue-700 my-4">
        <h1 className="mx-4">Likes and Dislikes</h1>
      </div>
      <div className="px-4 h-full w-full">
        <PreferenceContainer />
      </div>
    </div>
  );
};

export default Page;
