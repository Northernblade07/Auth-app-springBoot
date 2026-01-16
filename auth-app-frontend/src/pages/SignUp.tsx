import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Link, Navigate, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, UserPlus, User } from "lucide-react"
import { toast } from "react-toastify"
import type  RegisterData  from "@/models/RegisterData"
import { registerUser } from "@/services/AuthService"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import useAuth from "@/auth/store"
import OAuth2Button from "@/components/OAuth2Button"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}



const Signup: React.FC = () => {

const [data , setData] = useState<RegisterData>({
  name:"",
  email:"",
  password:""
})

const [loading , setLoading] = useState<boolean>(false);
const [error , setError ] = useState<any>(null);
const navigate = useNavigate();
const handleInputchnage =(e:React.ChangeEvent<HTMLInputElement>)=>{
  console.log(e.target.name);
  console.log(e.target.value);
  setData(value=>({
    ...value,
    [e.target.name]:e.target.value,
  }))
  
}

const checkLogin = useAuth(s => s.checkLogin);

const handleFormSubmit = async(e:React.FormEvent)=>{
e.preventDefault();
console.log(data);

if(data.name.trim()==""){
  toast.error("Name is Required")
  return;
}

if(data.email.trim()==""){
  toast.error("Email is Required")
  return;
}

if(data.password.trim()==""){
  toast.error("Password is Required")
  return;
}

if(data.password.length < 6){
  toast.error("Password must be 6 characters long")
  return;
}

try {
  setLoading(true)
const res =  await registerUser(data);
console.log(res)
toast.success("user registered successfully")
setLoading(false)
setData({
  name:"",
  email:"",
  password:""
})

navigate('/login')
} catch (error) {
  console.log(error);
  setError(error)
  toast.error("Error in registering the User")
} finally{
  setLoading(false)
}


}

if(checkLogin()){
  return <Navigate to={'/dashboard'}/>
}



  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/20 dark:from-primary/10 via-transparent to-transparent blur-3xl" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm sm:max-w-md"
      >
        <Card className="border border-border bg-background/80 backdrop-blur">
          <CardContent className="p-5 sm:p-6 md:p-8 space-y-6">
            {/* HEADER */}
            <div className="space-y-2 text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary/15 dark:bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Create Your Account
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Join <span className="text-primary">Authify</span> and secure your app
              </p>
            </div>

        {
          error && 
          <div>
            <Alert>
            <AlertTitle>{error?.response?.data?.message || error?.message}</AlertTitle>
            </Alert>
          </div>
        }
            {/* FORM */}
            <form onSubmit={handleFormSubmit} className="space-y-2">
              
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="pl-9 h-10 sm:h-11"
                    value={data.name}
                    onChange={handleInputchnage}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9 h-10 sm:h-11"
                    value={data.email}
                    onChange={handleInputchnage}
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-9 h-10 sm:h-11"
                    onChange={handleInputchnage}
                    value={data.password}
                  />
                </div>
              </div>

              <Button disabled={loading} type="submit" className="w-full h-10 sm:h-11 gap-2">
               {loading ? <Spinner/> : "Create Account"}
              </Button>
            </form>

            {/* DIVIDER */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAUTH */}
            <OAuth2Button/>
            {/* FOOTER */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

export default Signup
