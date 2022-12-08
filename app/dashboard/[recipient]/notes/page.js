"use client";
import React from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const page = () => {
  const [value, setValue] = useState("");
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setUpdated(false);
      console.log("send to back end", `${value}`);
      setTimeout(() => {
        setUpdated(true);
      }, 2000);
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return (
    <div className="flex flex-col justify-start w-full h-full">
      <div className="flex justify-between h-[50px] border-b-2 border-cblue-700 my-4">
        <h1 className="mx-4">Notes</h1>
        <div className="mr-6">
          {!updated ? "Saving..." : null}
        </div>
      </div>
      <div className="flex flex-col justify-start w-full h-full">
        <div className="basis-[100%]">
          <ReactQuill
            value={value}
            onChange={setValue}
            placeholder="Add some ideas!"
            className="flex flex-col h-full rounded-sm text-cgold-900"
          />
        </div>
       
      </div>
    </div>
  );
};

export default page;
