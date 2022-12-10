"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { fetchHolidays } from "../../../store/recipientSlice";

const UserInfo = ({ params }) => {
  const dispatch = useDispatch();

  const { singleRecipient } = useSelector((store) => store.recipients);

  useEffect(() => {
    dispatch(fetchHolidays(singleRecipient.id));
  }, []);

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
          <h3>Occupation: {singleRecipient.occupation}</h3>
        </div>
        <div>
          <h3>Email: {singleRecipient.email}</h3>
        </div>
      </div>
      <div>
        <h3 className="mx-2">
          Holidays / Occasions:{" "}
          {!singleRecipient.holidays
            ? "Loading..."
            : singleRecipient.holidays.map((holiday, index) => {
                return (
                  <li key={index}>
                    {holiday.name} - {holiday.date}
                  </li>
                );
              })}
        </h3>
      </div>
    </div>
  );
};

export default UserInfo;
