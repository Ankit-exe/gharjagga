import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Outlet,Navigate } from 'react-router-dom'

export function PrivateRoute() {
  const {currentUser} = useSelector((state) => state.user);
  return ( 
   currentUser ? <Outlet /> : <Navigate to='/sign-in' />
  )
}
