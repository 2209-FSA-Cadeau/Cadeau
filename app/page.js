"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const App = () => {
  const user = useUser().user;
  if (user) {
    redirect("/home");
  } else {
    redirect("/landing");
  }
};

export default App;
