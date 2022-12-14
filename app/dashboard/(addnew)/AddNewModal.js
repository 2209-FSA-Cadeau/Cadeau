"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Start from "./Start";
import Holidays from "./Holidays";
import LikesAndDislikes from "./LikesAndDislikes";
import { addRecipient } from "../../../store/recipientSlice";
import { AiOutlineClose } from "react-icons/ai";

const AddNewModal = ({
  firstTime,
  addNewModalIsShown,
  setAddNewModalIsShown,
}) => {
  const [step, setStep] = useState(0);
  const userId = useSelector((store) => store.user.userId);
  const [newRecipient, setNewRecipient] = useState({
    name: "",
    email: "",
    birthday: "",
    occupation: "",
    occasions: [],
    holidays: [],
    likes: [],
    dislikes: [],
    userId,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const prevClickHandler = () => {
    setStep(step - 1);
  };

  const nextClickHandler = () => {
    setStep(step + 1);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setAddNewModalIsShown(false);
    newRecipient.userId = userId
    dispatch(addRecipient(newRecipient));
    resetHandler();
    if (localStorage.getItem("new")) {
      localStorage.removeItem("new")
    }
    router.push(`/dashboard/${newRecipient.name}/preferences`);
  };

  const resetHandler = () => {
    setNewRecipient({
      name: "",
      email: "",
      birthday: "",
      occupation: "",
      occasions: [],
      holidays: [],
      likes: [],
      dislikes: [],
      userId,
    });
    setStep(0);
  };

  const conditionalComponent = () => {
    switch (step) {
      case 0:
        return (
          <Start
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
            firstTime={firstTime}
          />
        );
      case 1:
        return (
          <Holidays
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
          />
        );
      case 2:
        return (
          <LikesAndDislikes
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
          />
        );
    }
  };

  if (addNewModalIsShown) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-black/50">
        <div className="flex justify-center items-center w-full h-full ">
          <div className="relative bg-white rounded-lg shadow w-[60%] h-[60%]">
            {firstTime ? (
              ""
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAddNewModalIsShown(false);
                  resetHandler();
                }}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-3 ml-auto inline-flex items-center"
              >
                <AiOutlineClose className="scale-110" />
                <span className="sr-only">Close modal</span>
              </button>
            )}
            <div className="w-full h-full overflow-y-scroll">
              <div className="flex flex-col justify-between w-full h-full p-4">
                <div className="grow">{conditionalComponent()}</div>
                <div className="flex items-center justify-center gap-4 pb-6">
                  {step > 0 ? (
                    <button
                      name="previousButton"
                      onClick={prevClickHandler}
                      className="bg-white hover:bg-neutral-100 rounded-lg border border-gray-200 text-base font-bold px-10 py-5 hover:text-gray-900"
                    >
                      Previous
                    </button>
                  ) : null}
                  {step < 2 ? (
                    <button
                      name="nextButton"
                      onClick={nextClickHandler}
                      className="bg-white hover:bg-neutral-100 rounded-lg border border-gray-200 text-base font-bold px-10 py-5 hover:text-gray-900"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      name="submitButton"
                      onClick={onSubmitHandler}
                      className="bg-neutral-200 hover:bg-neutral-300 rounded-lg border border-gray-200 text-base font-bold px-10 py-5 hover:text-gray-900"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AddNewModal;
