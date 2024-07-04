import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import Cookies from "js-cookie"

function App() {
  const [res, setres] = useState("")
  const [sent, setSent] = useState(null)
  const result = async () => {
  try {
    const res = await axios.post("https://s51-john-discuter.onrender.com/auth/login", {
      username: "cornellewsjohn",
      password: "cornellews"
    })
    setres(res.data)
    console.log(res.data)
    Cookies.set("jwt", res.data.token)
  } catch (error) {
    console.log(error.message)
  }
  }
  const sub = async () => {
    try {
      const jwt = Cookies.get("jwt");
      const res = await axios.post(
        `https://s51-john-discuter.onrender.com/message/send/667573117b30b114c7eca3ba`,
        {
          message: "nothing 2",
        },
        {
          params: {
            jwt,
          },
        }
      );
      console.log(res.data);
      setres(res.data);
      setSent(res.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const del = async () => {
    try {
      const jwt = Cookies.get("jwt");
      console.log(jwt);
      const res = await axios.delete(
        `https://s51-john-discuter.onrender.com/message/deletemsg/${sent}`,
        {
          params: {
            jwt,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const getUsers = async () => {
    try {
      const jwt = Cookies.get("jwt");
      const res = await axios.get(`https://s51-john-discuter.onrender.com/users/getusers`, {
        params: {
          jwt,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => 
    {result()}
  , [])
  return (
    <>
    <h1>hello</h1>
      <h1>{
        JSON.stringify(res)
        }</h1>
        <button onClick={sub}>
          send
        </button>
        <button onClick={del}>
          delete 
        </button>
        <button onClick={getUsers}>
          getusers
        </button>
    </>
  )
}

export default App
