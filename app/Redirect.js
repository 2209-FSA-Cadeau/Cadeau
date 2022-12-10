"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { getUser } from "../store/userSlice";

const Redirect = () => {
  const router = useRouter()
  const { userId } = useSelector((store) => store.user);
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user){
        router.push("/landing")
    } else {
        dispatch(getUser(user))
    }
  }, [isLoading])

  useEffect(() => {
    if (!userId) {
        router.push("/dashboard/addnew")
    } else {
        router.push("/shop")
    }
  }, [userId]);

};

export default Redirect;
