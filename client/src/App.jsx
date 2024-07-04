import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import Cookies from "js-cookie"

function App() {
  const [res, setres] = useState("")
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
      const jwt = Cookies.get("jwt")
      const res = await axios.post("https://s51-john-discuter.onrender.com/message/send/667573117b30b114c7eca3ba", {
        message: "nothing 2",
        jwt: jwt
        // jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Njc1MWFhMjU2MGUxOWZjMzhlMzVkOTgiLCJpYXQiOjE3MjAwNjc1NjEsImV4cCI6MTcyMTM2MzU2MX0.nC86NMdoDTedUVdtnpgqVtEekMbLtI3azIlKyGaUEqk"
      })
      console.log(res.data)
      setres(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }
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
    </>
  )
}

export default App
