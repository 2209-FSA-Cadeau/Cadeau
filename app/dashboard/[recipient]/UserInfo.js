"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

const UserInfo = ({ params }) => {
  const { singleRecipient } = useSelector((store) => store.recipients);
  return (
    <div className="w-full h-[18%] bg-cgold-100 shadow-xl mb-4 rounded-md border">
      <div className="flex justify-between items-start">
        <h1 className="p-2">{`${singleRecipient.name}`}</h1>
        <Link href={`/dashboard/${singleRecipient.name}/edit`} className="p-2">
          <FiEdit2 className="h-[28px] w-auto hover:scale-110 ease-in duration-150" />
        </Link>
      </div>
      <div className="flex justify-start my-2 mx-2 gap-10">
        <div>
          <h3>Birthday: {singleRecipient.birthday}</h3>
        </div>
        <div>
          <h3>Occupation: {singleRecipient.ocupation}</h3>
        </div>
        <div>
          <h3>Email: {singleRecipient.email}</h3>
        </div>
      </div>
      <div>
        <h3 className="mx-2">Holidays / Occasions: NEED TO PULL HOLIDAYS INTO SINGLE RECIPIENT STATE</h3>
      </div>
    </div>
  );
};

export default UserInfo;
