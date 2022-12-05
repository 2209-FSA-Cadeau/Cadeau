"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn, isLoadingRedux } = useSelector((store) => store.user);

  useEffect(() => {
    if (isLoggedIn && !isLoadingRedux) {
      redirect("/shop");
    } else if (!isLoadingRedux) {
      redirect("/landing");
    }
  }, [isLoggedIn, isLoadingRedux]);
};

export default App;
