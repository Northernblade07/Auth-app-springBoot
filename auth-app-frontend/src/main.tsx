import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router"
import { About } from './pages/About.tsx'
import Login from './pages/Login.tsx'
import  SignUp from './pages/SignUp.tsx'
import {Services} from './pages/Services.tsx'
import RootLayout from './pages/RootLayout.tsx'
import UserLayout from './pages/user/UserLayout.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/services' element={<Services />} />
          <Route path='/dashboard' element={ <UserLayout/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
