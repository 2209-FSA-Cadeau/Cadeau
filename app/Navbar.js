"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { auth0logout } from "../store/userSlice";
import { setTab } from "../store/recipientSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useUser();

  let auth0User = user

  useEffect(() => {
    if(!user){
       auth0User = user
    }
  }, [isLoading])

  return (
    <div className={!auth0User ? "hidden" : ""}>
      <div className="fixed w-full h-20 shadow-md z-[100] bg-gradient-to-br from-cblue-700/[80] to-cblue-600/90 text-white">
        <div className="flex justify-between items-center w-full h-full px-2">
          <Link href="/shop" className="ml-6">
            <h2 className="font-lobster text-3xl text-cgold-500">Cadeau</h2>
          </Link>
          <div>
            <ul className="flex">
                <>
                  <Link href="/shop/">
                    <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-white ">
                      Shop Products
                    </li>
                  </Link>
                  <Link
                    href="/dashboard/"
                    onClick={() => dispatch(setTab("preferences"))}
                  >
                    <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-white">
                      Dashboard
                    </li>
                  </Link>
                  <Link href="/about/">
                    <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-white">
                      About
                    </li>
                  </Link>
                  <a
                    href="/api/auth/logout/"
                    onClick={() => {
                      dispatch(auth0logout());
                    }}
                  >
                    <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-white">
                      Logout
                    </li>
                  </a>
                </>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
