"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Holidays(props) {
  const { newRecipient, setNewRecipient } = props;
  const [occasion, setOccasion] = useState({
    name: "",
    date: "",
  });

  const holidays = [
    { value: "christmas", label: "Christmas" },
    { value: "memorialDay", label: "Memorial Day" },
    { value: "thanksgiving", label: "Thanksgiving" },
  ];

  const occasionNameHandler = (event) => {
    setOccasion({
      ...occasion,
      name: event.target.value,
    });
  };

  const occasionDateHandler = (event) => {
    setOccasion({
      ...occasion,
      date: event.target.value,
    });
  };

  const occasionDeleteHandler = (event) => {
    setNewRecipient({
      ...newRecipient,
      occasions: newRecipient.occasions.filter(
        (e, index) => index != event
      ),
    });
  };

  const occasionSubmitHandler = (event) => {
    event.preventDefault();
    setNewRecipient({
      ...newRecipient,
      occasions: [...newRecipient.occasions, occasion],
    });
    setOccasion({
      name: "",
      date: "",
    });
  };

  const holidayChangeHandler = (selectedOption) => {
    setNewRecipient({
      ...newRecipient,
      holidays: selectedOption,
    });
  };

  return (
    <div className="flex flex-col justify-start h-full overflow-y-scroll pb-4">
      <div className="border-b border-cblue-700">
        <h1>Other Important Dates</h1>
        <h2 className="my-3">
          All occasions you'll want to provide gifts For
        </h2>
      </div>
      <div className="grow flex flex-col justify-start overflow-y-scroll pt-4 gap-8">
        <div className="grow flex flex-col">
          <label className="block mb-4 text-lg font-bold">
            <p className="font-medium">An anniversary, perhaps?</p>
          </label>
          <form
            onSubmit={occasionSubmitHandler}
            className="flex w-full gap-x-[1%] gap-y-2 flex-wrap mb-4"
          >
            <div className="relative w-[45%]">
              <input
                type="text"
                id="occasionName"
                className="w-full px-2.5 pb-4 pt-6 text-lg bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cblue-300 peer"
                placeholder=" "
                value={occasion.name}
                onChange={occasionNameHandler}
              />
              <label
                htmlFor="occasionName"
                className="absolute text-lg duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-cblue-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Occasion Name
              </label>
            </div>
            <div className="relative w-[30%]">
              <input
                type="text"
                id="occasionDate"
                className="w-full px-2.5 pb-4 pt-6 text-lg bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cblue-300 peer"
                placeholder="MM/DD"
                value={occasion.date}
                onChange={occasionDateHandler}
              />
              <label
                htmlFor="occasionDate"
                className="absolute text-lg duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-cblue-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Occasion Date
              </label>
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-neutral-100 rounded-lg border border-gray-300 text-lg font-bold px-10 py-4 hover:text-cblue-700"
            >
              Add Occasion
            </button>
          </form>
          <div className="grow w-full flex flex-wrap gap-x-[1%] gap-y-2 items-center place-content-start">
            {newRecipient.occasions.map((occasion, index) => {
              return (
                <div
                  className="flex justify-start items-center bg-gray-200 rounded-lg py-4 px-2.5 w-fit h-fit text-lg"
                  key={index}
                >
                  <div>
                    {occasion.name} - {occasion.date}
                  </div>
                  <button
                    onClick={() => occasionDeleteHandler(index)}
                    className="ml-4 text-lg p-2 hover:text-red-700"
                  >
                    <AiOutlineClose className="scale-110" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
