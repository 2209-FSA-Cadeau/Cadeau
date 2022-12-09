"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { getUser } from "../store/userSlice";

const App = () => {
  const { isLoggedIn, isLoadingRedux, userId } = useSelector((store) => store.user);
  const { recipients } = useSelector((store) => store.recipients)
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
  if (!isLoading) {
    if (user === null) {
      redirect("/landing")
    } else {
      console.log('USER BEFORE DISPATCH', user)
      dispatch(getUser(user))
      console.log('USER AFTER DISPATCH', user)
      redirect("/dashboard/addnew")
    }
  }}, [isLoading]);

  // useEffect(() => {
  //   redirect("/shop")
  // }, [userId])

  useEffect(() => {
    if (isLoggedIn && !isLoadingRedux && recipients.length === 0) {
      redirect("/dashboard")
    } else if (isLoggedIn && !isLoadingRedux) {
      redirect("/shop");
    } else if (!isLoadingRedux) {
      redirect("/landing");
    }
  }, [isLoggedIn, isLoadingRedux]);
};

export default App;
