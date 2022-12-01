"use client";
import Link from "next/link";
import React from "react";

const Recipient = ({ recipient }) => {
  return (
    <Link href={`/dashboard/${recipient.name}/preferences`}>
      <div className="border-2 border-black rounded-md m-4 bg-slate-200">
        <h3>{recipient.name}</h3>
      </div>
    </Link>
  );
};

export default Recipient;
