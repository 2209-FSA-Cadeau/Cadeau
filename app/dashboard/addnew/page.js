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
    userId: useSelector((state) => state.user.userId),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  // const { isLoading, user } = useUser();

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (user.firstName && user.lastName) {
  //       dispatch(addOrFindUser(user));
  //     }
  //     dispatch(
  //       addOrFindUser({
  //         identifier: user.sub,
  //         email: user.email,
  //       })
  //     );
  //   }
  // }, [isLoading]);

  const prevClickHandler = () => {
    setStep(step - 1);
  };

  const nextClickHandler = () => {
    setStep(step + 1);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await dispatch(addRecipient(newRecipient));
    router.push(`/dashboard/${newRecipient.name}/preferences`);
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
        <button name="submitButton" onClick={onSubmitHandler}>
          Submit
        </button>
      )}
    </div>
  );
};

export default page;
