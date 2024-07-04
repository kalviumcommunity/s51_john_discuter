import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [res, setres] = useState("")
  const result = async () => {
  const res = await axios.get("https://s51-john-discuter.onrender.com/get")
  setres(res.data)
  }
  result()
  return (
    <>
      <h1>{
        JSON.stringify(res)
        }</h1>
    </>
  )
}

export default App
