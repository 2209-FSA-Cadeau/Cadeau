"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Start from "../../addnew/Start";
import Name from "./Name";
import Demographics from "./Demographics";
import Holidays from "./Holidays";
import Likes from "./Likes";
import Dislikes from "./Dislikes";
import Complete from "./Complete";
import { addRecipient } from "../../../../store/recipientSlice";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const recipient = ({router: {query}}) => {
     JSON.parse(query.object)
  }

  const [step, setStep] = useState(0);
  const [updateRecipient, setUpdateRecipient] = useState({
    name: recipient.name,
    email: recipient.email,
    birthday: recipient.birthday,
    occupation: recipient.occupation,
    occasions: recipient.occasions,
    holidays: recipient.holidays,
    likes: recipient.likes,
    dislikes: recipient.dislikes,
  });


  const prevClickHandler = () => {
    setStep(step - 1);
  };

  const nextClickHandler = () => {
    setStep(step + 1);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(addRecipient(newRecipient));
    router.push("/dashboard/");
  };

  const conditionalComponent = () => {
    switch (step) {

      case 1:
        return (
          <Name updateRecipient={updateRecipient} setUpdateRecipient={setUpdateRecipient} />
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

  return (
    <div>
      {conditionalComponent()}
      {step > 1 ? (
        <button name="previousButton" onClick={prevClickHandler}>
          Previous
        </button>
      ) : null}
      {step < 6 ? (
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
