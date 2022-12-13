"use client"; // USE CLIENT MUST BE USED TO ACCESS REDUX
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const App = () => {
  const { user, isLoadingRedux } = useSelector((store) => store.user);
  const router = useRouter();
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    if (typeof window != undefined) {
      setNewUser(localStorage.getItem("new"));
    }

    if (!isLoadingRedux && !newUser) {
      router.push("/shop");
    }
  }, [isLoadingRedux]);
};

export default App;
