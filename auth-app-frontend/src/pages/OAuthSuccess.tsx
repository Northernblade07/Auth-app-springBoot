import useAuth from '@/auth/store'
import { Spinner } from '@/components/ui/spinner';
import { refreshToken } from '@/services/AuthService';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const OAuthSuccess = () => {
    const [isRefreshing , setIsRefreshing] = useState(false)
    const changeLocalLogindata = useAuth(state=>state.changeLocalLoginData);
    const navigate = useNavigate()
    useEffect(()=>{
       async function getAccessToken(){

           if(!isRefreshing){ 
           try {
             setIsRefreshing(true)
            const res =  await refreshToken()                     
            changeLocalLogindata(res.accessToken ,res.user, true);
            toast.success("login succesfull")
            navigate('/dashboard')
           } catch (error) {
            console.log(error)
            toast.error("error in Oauth login")
           }finally{
            setIsRefreshing(false)
           } }
            
           
        }
        getAccessToken()
    },[isRefreshing ,changeLocalLogindata])

  return (
    <div className='p-10 flex flex-col gap-3 justify-center items-center'>
        <Spinner/>
        <h1 className='text-2xl font-semibold'>Please wait...</h1>
    </div>
  )
}

export default OAuthSuccess