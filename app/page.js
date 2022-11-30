"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user); //example - h1 below to demonstrate functionality
  return (
    <div>
      <div>hello</div>
      <h1>{`${isLoggedIn}`}</h1>
    </div>
  );
};

export default HomePage;
