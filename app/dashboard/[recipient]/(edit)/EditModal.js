"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Info from "./Info";
import { editRecipient } from "../../../../store/recipientSlice";
import { AiOutlineClose } from "react-icons/ai";

const EditModal = ({ editModalIsShown, setEditModalIsShown }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { singleRecipient } = useSelector((store) => store.recipients);

  const [step, setStep] = useState(0);
  const [updateRecipient, setUpdateRecipient] = useState({
    id: singleRecipient.id,
    name: singleRecipient.name,
    email: singleRecipient.email,
    birthday: singleRecipient.birthday,
    occupation: singleRecipient.occupation,
  });

  const prevClickHandler = () => {
    setStep(step - 1);
  };

  const nextClickHandler = () => {
    setStep(step + 1);
  };

  const onSubmitHandler = () => {
    setEditModalIsShown(false);
    dispatch(editRecipient(updateRecipient));
    resetHandler();
  };

  const resetHandler = () => {
    setUpdateRecipient({
      id: singleRecipient.id,
      name: singleRecipient.name,
      email: singleRecipient.email,
      birthday: singleRecipient.birthday,
      occupation: singleRecipient.occupation,
    });
    setStep(0);
  };

  useEffect(() => {
    resetHandler();
  }, []);

  const conditionalComponent = () => {
    switch (step) {
      case 0:
        return (
          <Info
            updateRecipient={updateRecipient}
            setUpdateRecipient={setUpdateRecipient}
          />
        );
    }
  };

  if (editModalIsShown) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-black/50">
        <div className="flex justify-center items-center w-full h-full ">
          <div className="relative bg-white rounded-lg shadow w-[60%] h-[60%]">
            <button
              type="button"
              onClick={() => {
                setEditModalIsShown(false);
                resetHandler();
              }}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-3 ml-auto inline-flex items-center"
            >
              <AiOutlineClose className="scale-110" />
              <span className="sr-only">Close modal</span>
            </button>
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
                  {step < 0 ? (
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

export default EditModal;
