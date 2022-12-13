"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React from "react";

const LandingPage = () => {
  return (
    <>
      <div className="absolute inset-0 bg-landing bg-no-repeat bg-cover bg-top bg-local">
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
          <div className="p-32 max-w-fit rounded-xl">
            <div className="flex flex-col justify-center items-center h-[100%] gap-24">
              <h1 className="text-cwhite-500 text-9xl font-lobster">Cadeau</h1>
              <p className="text-cwhite text-5xl text-center">
                The one-stop shop for everything gift-giving
              </p>
              <a
                href="/api/auth/login/"
                className="bg-cwhite-500/30 text-cwhite-500 text-3xl rounded-lg p-8 shadow-2xl hover:scale-105 ease-in duration-150"
              >
                Get Started!
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
