import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import ProtectRoute from './security/ProtectRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Toaster from "react-hot-toast"
import Reference from './reference'

const App = () => {
  return (
    <div className='flex justify-center items-center h-[100vh] text-center'>
      <Routes>
        <Route path='*' element={<ProtectRoute />}>
          <Route path='*' element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
      {/* <Reference /> */}
    </div>
  )
}

export default App
