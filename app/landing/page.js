"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { isLoggedIn } = useSelector((store) => store.user);
  if (isLoggedIn) {
    redirect("/shop");
  }
  return (
    <>
      <div className="absolute inset-0 bg-landing bg-no-repeat bg-cover bg-top bg-local">
        <div className="absolute inset-0 bg-black/20">
          <div className="pt-[104px] pb-6 px-6 h-full w-full">
            <div className="flex flex-col justify-evenly items-center h-[60%] ">
              <h1 className="text-white text-9xl">Cadeau!</h1>
              <p className="text-white text-5xl text-center">
                The one-stop shop for everything gift-giving
              </p>
              <a
                href="/api/auth/login/"
                className="bg-blue-500/95 text-white text-2xl rounded-lg p-4 shadow-lg shadow-gray-400"
              >
                Login or Sign Up!
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
