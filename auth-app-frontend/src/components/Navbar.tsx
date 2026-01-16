import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import useAuth from '@/auth/store'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const checkLogin= useAuth(state=> state.checkLogin);
  const user = useAuth(state=>state.user);
  const logout = useAuth(state=>state.logout);
  const navigate = useNavigate();
  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between h-14 px-4 md:px-8 border-b border-gray-600">
        {/* BRAND */}
        <div className="font-semibold flex items-center gap-2">
          <span className="inline-block h-6 w-6 text-center rounded-md bg-gradient-to-r from-primary to-primary/40">
            A
          </span>
          <NavLink to="/">
            <span className="text-base tracking-tight">Authify</span>
          </NavLink>
        </div>

        {/* DESKTOP NAV */}
{    checkLogin() ?  

  <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/dashboard/profile">{user?.name || user?.email}</NavLink>

          <Link to="/dashboard">
            <Button size="sm" variant="outline">
              Dashboard
            </Button>
          </Link>


            <Button onClick={()=>{
              logout()
              navigate('/')
            }
              } size="sm" variant="outline">
              logout
            </Button>
        </div>

:  <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/">Home</NavLink>

          <Link to="/login">
            <Button size="sm" variant="outline">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button size="sm" variant="outline">
              Register
            </Button>
          </Link>
        </div>
}
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-white/5 transition"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-full w-64  z-50 transform transition-transform duration-300 ease-out
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-white/10">
          <span className="font-semibold tracking-tight"></span>
          <button onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-4 p-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:opacity-80 transition"
          >
            Home
          </Link>

          <Link to="/login" onClick={() => setOpen(false)}>
            <Button size="sm" variant="outline" className="w-full">
              Login
            </Button>
          </Link>

          <Link to="/signup" onClick={() => setOpen(false)}>
            <Button size="sm" variant="outline" className="w-full">
              Register
            </Button>
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Navbar
