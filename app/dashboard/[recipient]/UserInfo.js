"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

const UserInfo = ({ params }) => {
  const { singleRecipient } = useSelector((store) => store.recipients);
  return (
    <div className="flex justify-between items-center">
      <h1>{`${singleRecipient.name}`}</h1>
      <Link href={`/dashboard/${singleRecipient.name}/edit`}>
        <FiEdit2 className="h-[28px] w-auto hover:scale-110 ease-in duration-150" />
      </Link>
    </div>
  );
};

export default UserInfo;
