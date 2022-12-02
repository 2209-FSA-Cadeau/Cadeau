"use client";
import React, { useState } from "react";
import Start from "./Start";
import Name from "./Name";
import Demographics from "./Demographics";
import Holidays from "./Holidays";
import Likes from "./Likes";
import Dislikes from "./Dislikes";
import Complete from "./Complete";

const page = () => {
  const [step, setStep] = useState(0);
  const [newRecipient, setNewRecipient] = useState({
    name: "",
    email: "",
    birthday: "",
    occupation: "",
    occasions: [],
    holidays: [],
    likes: [],
    dislikes: [],
  });

  const prevClickHandler = () => {
    setStep(step - 1);
  };

  const nextClickHandler = () => {
    setStep(step + 1);
  };

  const conditionalComponent = () => {
    switch (step) {
      case 0:
        return (
          <Start
            newRecipient={newRecipient}
            setNewRecipient={setNewRecipient}
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

  return (
    <div>
      {conditionalComponent()}
      {step > 0 ? (
        <button name="previousButton" onClick={prevClickHandler}>
          Previous
        </button>
      ) : null}
      {step < 6 ? (
        <button name="nextButton" onClick={nextClickHandler}>
          Next
        </button>
      ) : (
        <button name="submitButton" type="submit">
          Submit
        </button>
      )}
    </div>
  );
};

export default page;
