import React from 'react'
import { useStore } from '../app/store'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from "js-cookie"

const ProtectRoute = () => {
    const authUser = useStore().authUser
    const jwt = Cookies.get("jwt")
  return (
    authUser && jwt ?
     <Outlet /> :
      <Navigate to="/login" />
  )
}

export default ProtectRoute
