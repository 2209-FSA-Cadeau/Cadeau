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

  //   return (
  //     <div>
  //       <h1>Cadeau</h1>
  //       {!user ? <a href="/api/auth/login/">Login</a> : redirect("/home/")}
  //     </div>
  //   );
};

export default App;
