"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { addOrFindUser } from "../store/userSlice";

const Redirect = () => {
  const router = useRouter();
  const { userId } = useSelector((store) => store.user);
  const { recipients } = useSelector((state) => state.recipients);
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/landing");
      } else {
        dispatch(addOrFindUser(user));
      }
    }
  }, [isLoading]);

  // useEffect(() => {
  //   if (recipients.length === 0) {
  //     router.push("/dashboard");
  //   } else {
  //     router.push("/shop");
  //   }
  // }, [userId]);
};

export default Redirect;
