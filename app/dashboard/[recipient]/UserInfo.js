"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const UserInfo = ({ params }) => {
  const { singleRecipient } = useSelector((store) => store.recipients);
  return (
    <div className="w-full h-[18%] bg-cgold-100 shadow-xl mb-4 rounded-md border">
      <div className="flex justify-between items-start bg-cgold-300 rounded-t-md">
        <h1 className="p-2">{`${singleRecipient.name}`}</h1>
        <div className="flex justify-between gap-2">
          <Link
            href={`/dashboard/${singleRecipient.name}/edit`}
            className="p-2"
          >
            <FiEdit2 className="h-[22px] w-auto hover:text-cgold-500" />
          </Link>
        </div>
      </div>
      <div className="flex justify-start my-2 mx-2 gap-10">
        <div>
          <h3>Birthday: {singleRecipient.birthday}</h3>
        </div>
        <div>
          <h3>Occupation: {singleRecipient.occupation}</h3>
        </div>
        <div>
          <h3>Email: {singleRecipient.email}</h3>
        </div>
      </div>
      <div>
        <h3 className="mx-2">
          Gift Occasions: NEED TO PULL HOLIDAYS INTO SINGLE RECIPIENT
          STATE
        </h3>
      </div>
    </div>
  );
};

export default UserInfo;
