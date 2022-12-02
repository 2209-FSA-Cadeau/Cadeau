"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";
import { auth0login, auth0logout } from "../store/userSlice";

const Navbar = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        dispatch(auth0login(user));
      } else {
        router.push("/landing");
      }
    }
  }, [dispatch, user, isLoading, router]);

  return (
    <div className="fixed w-full h-20 shadow-xl z-[100] bg-inherit">
      <div className="flex justify-between items-center w-full h-full px-2">
        <h2>Cadeau!</h2>
        <div>
          <ul className="flex">
            {isLoggedIn ? (
              <>
                <Link href="/home/">
                  <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black">
                    Home
                  </li>
                </Link>
                <Link href="/shop/">
                  <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black ">
                    Shop Products
                  </li>
                </Link>
                <Link href="/dashboard/">
                  <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black">
                    Dashboard
                  </li>
                </Link>
                <a
                  href="/api/auth/logout/"
                  onClick={() => {
                    dispatch(auth0logout());
                  }}
                >
                  <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black">
                    Logout
                  </li>
                </a>
              </>
            ) : (
              <a href="/api/auth/login/">
                <li className="mx-10 text-sm uppercase hover:border-b-2 hover:border-black">
                  Login
                </li>
              </a>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
