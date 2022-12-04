"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { isLoggedIn } = useSelector(store => store.user)
  return (
    <div>
      <h1>Welcome to Cadeau!</h1>
      {!isLoggedIn ? <a href="/api/auth/login/">Login</a> : redirect("/home/")}
    </div>
  );
};

export default LandingPage;
