"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { auth0login } from "../store/userSlice";

const App = () => {
  const { isLoggedIn, isLoadingRedux } = useSelector((store) => store.user);
  // const { user, error, isLoading } = useUser();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && !isLoadingRedux) {
      redirect("/home");
    } else if (!isLoadingRedux) {
      redirect("/landing");
    }
  }, [isLoggedIn, isLoadingRedux]);
};

export default App;
