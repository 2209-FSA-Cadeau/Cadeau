"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { addOrFindUser } from "../store/userSlice";

const Redirect = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { isLoadingRedux } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const pathname = usePathname()


  useEffect(() => {
    console.log(isLoading, user)
    if (!isLoading) {
      if (!user) {
        console.log('No user')

        router.push("/landing");
      } else {
        dispatch(addOrFindUser(user));
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.getItem("new") === "true" && pathname !== "/dashboard" && pathname !== "/landing") {
      router.push("/dashboard")
    }
  },[isLoadingRedux, pathname])

};

export default Redirect;
