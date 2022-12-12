"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";


const App = () => {
  const { user, isLoadingRedux } = useSelector((store) => store.user);
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingRedux && !window.localStorage.getItem("new")) {
      router.push("/shop");
    }
  }, [isLoadingRedux]);
};

export default App;
