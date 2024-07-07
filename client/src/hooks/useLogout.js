import axios from "axios";
import React from "react";
import { useState } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const url =
    "https://s51-john-discuter.onrender.com/auth/logout";
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()
  const logout = async () => {
    setLoading(true);
    try {
      console.log("I am workinf");
      const res = await axios.get(url);
      localStorage.removeItem("user");
      Cookies.remove("jwt")
      nav("/login")
      console.log("Logged out", res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
