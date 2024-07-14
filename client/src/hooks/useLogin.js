import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useStore } from "../app/store.js";
import toast from "react-hot-toast";

const useLogin = () => {
  
  const url =
    "https://s51-john-discuter.onrender.com/auth/login";
  const setAuthUser = useStore().setAuthUser; 
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    setLoading(true);
    console.log(data)
    try {
      const res = await axios.post(url, data);
      const token = res.data.token;
      console.log(res.data)
      if(token){
        // Set token in cookies
      Cookies.set("jwt", token, { expires: 7 }); // Expires in 7 days
      // Set user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      setAuthUser(res.data);
      console.log("login complete")
      toast.success('login successful', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      return res.data
      }else{
        toast.error("invalid credentials")
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
