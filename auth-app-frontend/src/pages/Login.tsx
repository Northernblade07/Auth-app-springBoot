import * as React from "react"
import { motion } from "framer-motion"
import { Link, Navigate, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, CheckCircle2Icon } from "lucide-react"
// import { loginUser } from "@/services/AuthService"
import { toast } from "react-toastify"
import type LoginData from "@/models/LoginData"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import useAuth from "@/auth/store"
import OAuth2Button from "@/components/OAuth2Button"


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const Login: React.FC = () => {
  const [data , setData] = React.useState<LoginData>({
   email:"",
   password:""
  })

  const [error , setError] = React.useState<any>(null)
  const [loading , setLoading] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const checkLogin = useAuth(state =>state.checkLogin);

  const login = useAuth((state)=>state.login);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e)
    setData(value=>({
      ...value,
      [e.target.name]:e.target.value
    }))
  }


  const handleformSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();

    setLoading(true)
    if(data.email.trim()==""){
      toast.error("Email is required")
      setLoading(false)
      return;
    }

    if(data.password.trim()==""){
      toast.error("Password is Required")
      setLoading(false)
      return;
    }

    if(data.password.trim().length < 6){
      toast.info("Password must be 6 characters long")
      setLoading(false)
      return;
    }

    try {
      setLoading(true);
      // const res = await loginUser(data);


      // login function from useauth/zustand 
      const res = await login(data)
      toast.success("loged in successfully")
      console.log(res);
      setLoading(false)

      // now we need to store the user info in localstorage 
      setData({
        email:"",
        password:""
      })

      navigate("/dashboard")
    } catch (e) {
      console.log(e);
      setError(e)
      setLoading(false)
      console.log(error)
      toast.error("Error in loging in user")
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md"
      >
        <Card className="border border-border bg-background/80 backdrop-blur">
          <CardContent className="p-5 sm:p-6 md:p-8 space-y-6">
            {/* HEADER */}
            <div className="space-y-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Sign in to continue to{" "}
                <span className="text-primary">Authify</span>
              </p>
            </div>

          {/* alert */}
 
            {
              error &&
              <div>
              <Alert variant={"destructive"}>
                <CheckCircle2Icon/>
                <AlertTitle>
                {error?.response?.data?.message || error?.message}
                </AlertTitle>
              </Alert>
            </div>
}
            {/* FORM */}
            <form onSubmit={handleformSubmit} className="space-y-4">
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
                    onChange={handleInputChange}
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
                    placeholder="••••••••"
                    className="pl-9 h-10 sm:h-11"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button disabled={loading} className="w-full h-10 sm:h-11 cursor-pointer">
                {loading ? <Spinner/> : "Sign in"}
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
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

export default Login
