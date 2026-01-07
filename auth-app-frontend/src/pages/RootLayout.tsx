import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router'
import { ToastContainer} from 'react-toastify';

const RootLayout = () => {
  return (
    <div>
        <ToastContainer/>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default RootLayout