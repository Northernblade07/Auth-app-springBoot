import useAuth from '@/auth/store'
import React from 'react'
import { Navigate, Outlet } from 'react-router'

const UserLayout = () => {

  const checkLogin= useAuth(state=>state.checkLogin);
  if(!checkLogin()) return <Navigate to={'/login'}/>
  else{
  return (
    <div>
      <Outlet/>
    </div>
  )
}
}
export default UserLayout