"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Name from "./Name";
import Demographics from "./Demographics";
import { editRecipient } from "../../../../store/recipientSlice";

const page = () => {
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
    dispatch(editRecipient(updateRecipient));
    router.push(`/dashboard/${updateRecipient.name}/preferences`);
  };

  const conditionalComponent = () => {
    switch (step) {
      case 0:
        return (
          <Name
            updateRecipient={updateRecipient}
            setUpdateRecipient={setUpdateRecipient}
          />
        );
      case 1:
        return (
          <Demographics
            updateRecipient={updateRecipient}
            setUpdateRecipient={setUpdateRecipient}
          />
        );
    }
  };

  return (
    <div>
      {conditionalComponent()}
      {step > 0 ? (
        <button name="previousButton" onClick={prevClickHandler}>
          Previous
        </button>
      ) : null}
      {step < 1 ? (
        <button name="nextButton" onClick={nextClickHandler}>
          Next
        </button>
      ) : (
        <button name="submitButton" onClick={onSubmitHandler}>
          Submit
        </button>
      )}
    </div>
  );
};

export default page;
