"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { fetchHolidays } from "../../../store/recipientSlice";
import EditModal from "./(edit)/EditModal";

const UserInfo = ({ params }) => {
  const dispatch = useDispatch();
  const { singleRecipient } = useSelector((store) => store.recipients);
  const [editModalIsShown, setEditModalIsShown] = useState(false);

  useEffect(() => {
    dispatch(fetchHolidays(singleRecipient.id));
  }, [singleRecipient.id]);

  return (
    <div className="w-full h-[18%] bg-cgold-100 shadow-xl mb-4 rounded-md border">
      <div className="flex justify-between items-start bg-cgold-300 rounded-t-md shadow-md">
        <h1 className="p-2">{`${singleRecipient.name}`}</h1>
        <div className="p-2" onClick={() => setEditModalIsShown(true)}>
          <FiEdit2 className="h-[22px] w-auto hover:text-cgold-500" />
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
          Gift Occasions:
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
      {editModalIsShown && (
        <EditModal
          editModalIsShown={editModalIsShown}
          setEditModalIsShown={setEditModalIsShown}
        />
      )}
    </div>
  );
};

export default UserInfo;
