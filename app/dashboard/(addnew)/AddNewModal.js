"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Start from "./Start";
import Name from "./Name";
import Demographics from "./Demographics";
import Holidays from "./Holidays";
import Likes from "./Likes";
import Dislikes from "./Dislikes";
import Complete from "./Complete";
import { addRecipient } from "../../../store/recipientSlice";
import { useUser } from "@auth0/nextjs-auth0";
import { addOrFindUser } from "../../../store/userSlice";
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
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (user.firstName && user.lastName) {
        dispatch(addOrFindUser(user));
      }
      dispatch(
        addOrFindUser({
          identifier: user.sub,
          email: user.email,
        })
      );
    }
  }, [isLoading]);

  const prevClickHandler = () => {
    setStep(step - 1);
  };

  const nextClickHandler = () => {
    setStep(step + 1);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setAddNewModalIsShown(false);
    await dispatch(addRecipient(newRecipient));
    resetHandler();
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
          <Name newRecipient={newRecipient} setNewRecipient={setNewRecipient} />
        );
      case 2:
        return (
          <Demographics
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
          />
        );
      case 3:
        return (
          <Holidays
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
          />
        );
      case 4:
        return (
          <Likes
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
          />
        );
      case 5:
        return (
          <Dislikes
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
          />
        );
      case 6:
        return (
          <Complete
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
          <div className="relative bg-white rounded-lg shadow w-[70%] h-[70%]">
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
            <div className="flex flex-col justify-between w-full h-full p-4">
              {conditionalComponent()}
              <div className="flex items-center justify-center gap-4 mb-8">
                {step > 0 ? (
                  <button
                    name="previousButton"
                    onClick={prevClickHandler}
                    className="bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-base font-bold px-10 py-5 hover:text-gray-900"
                  >
                    Previous
                  </button>
                ) : null}
                {step < 6 ? (
                  <button
                    name="nextButton"
                    onClick={nextClickHandler}
                    className="bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-base font-bold px-10 py-5 hover:text-gray-900"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    name="submitButton"
                    onClick={onSubmitHandler}
                    className="bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-base font-bold px-10 py-5 hover:text-gray-900"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AddNewModal;