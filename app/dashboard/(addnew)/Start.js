import React from "react";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import { TbHammer } from "react-icons/tb";

export default function Start({ firstTime, newRecipient, setNewRecipient }) {
  return (
    <div className="flex flex-col justify-start h-full overflow-y-scroll">
      {firstTime ? (
        <div className="border-b border-cblue-700">
          <h1>First things first...</h1>
          <h2>Let's add a recipient!</h2>
          <p>
            Here you can describe your recipient and select some likes/dislikes
          </p>
        </div>
      ) : (
        <div className="border-b border-cblue-700">
          <h1>Let's get started</h1>
          <h2 className="my-3">Add some general details about this person</h2>
        </div>
      )}
      <div className="grow flex flex-col justify-center overflow-y-scroll">
        <div className="p-1">
          <label htmlFor="name" className="block mb-2 text-lg font-bold">
            Name
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineUser className="text-2xl text-cblue-700" />
            </div>
            <input
              type="text"
              id="name"
              className="bg-neutral-100 border border-gray-300 text-xl rounded-lg focus:ring-cblue-300 focus:border-cblue-300 block w-full pl-14 p-2.5"
              placeholder="John Doe"
              required
              value={newRecipient.name}
              onChange={(e) => {
                setNewRecipient({
                  ...newRecipient,
                  name: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="p-1">
          <label htmlFor="email" className="block mb-2 text-lg font-bold">
            Email
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineMail className="text-2xl text-cblue-700" />
            </div>
            <input
              type="text"
              id="email"
              className="bg-neutral-100 border border-gray-300 text-xl rounded-lg focus:ring-cblue-300 focus:border-cblue-300 block w-full pl-14 p-2.5"
              placeholder="name@cadeau.com"
              required
              value={newRecipient.email}
              onChange={(e) => {
                setNewRecipient({
                  ...newRecipient,
                  email: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="p-1">
          <label htmlFor="birthday" className="block mb-2 text-lg font-bold">
            Birthday
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineCalendar className="text-2xl text-cblue-700" />
            </div>
            <input
              type="text"
              id="birthday"
              className="bg-neutral-100 border border-gray-300 text-xl rounded-lg focus:ring-cblue-300 focus:border-cblue-300 block w-full pl-14 p-2.5"
              placeholder="MM/DD"
              required
              value={newRecipient.birthday}
              onChange={(e) => {
                setNewRecipient({
                  ...newRecipient,
                  birthday: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="p-1">
          <label htmlFor="occupation" className="block mb-2 text-lg font-bold">
            Occupation
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <TbHammer className="text-2xl text-cblue-700" />
            </div>
            <input
              type="text"
              id="occupation"
              className="bg-neutral-100 border border-gray-300 text-xl rounded-lg focus:ring-cblue-300 focus:border-cblue-300 block w-full pl-14 p-2.5"
              placeholder="Carpenter"
              required
              value={newRecipient.occupation}
              onChange={(e) => {
                setNewRecipient({
                  ...newRecipient,
                  occupation: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
