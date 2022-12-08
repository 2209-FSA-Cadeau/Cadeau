"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn, isLoadingRedux } = useSelector((store) => store.user);
  const { recipients } = useSelector((store) => store.recipients)

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
