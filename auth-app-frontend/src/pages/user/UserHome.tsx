import { motion } from "framer-motion"
import useAuth from "@/auth/store"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
import {
  ShieldCheck,
  User,
  Clock,
  LogOut,
} from "lucide-react"
import { useNavigate } from "react-router"
import { getCurrentUser } from "@/services/AuthService"
import { useState } from "react"
import type UserT from "@/models/User"
import { toast } from "react-toastify"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const UserHome = () => {
  const user = useAuth((s) => s.user)
  const logout = useAuth((s) => s.logout)
  const navigate = useNavigate();
  const [user1 , setUser1] = useState<UserT | null>(null);
  const getUserData=async()=>{
    try {
        const res = await getCurrentUser(user?.email)
        setUser1(res)
    } catch (error) {
      console.log(error)
      toast.error("error in getting user data..")
    }
  }
  return (
    <main className="p-6 md:p-10 space-y-8">
      {/* HEADER */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Your secure dashboard overview
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          icon={User}
          title="Account Status"
          value={user?.enabled ? "Active" : "Disabled"}
          badge={user?.enabled ? "Verified" : "Restricted"}
        />

        <StatCard
          icon={ShieldCheck}
          title="Auth Provider"
          value={user?.provider.toUpperCase()}
        />

        <StatCard
          icon={Clock}
          title="Member Since"
          value={new Date(user?.createdAt || "").toLocaleDateString()}
        />
      </div>

      {/* ACTIONS */}
      <Card className="border border-border bg-background/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button onClick={()=>navigate('/dashboard/profile')} variant="outline">View Profile</Button>
          <Button
            variant="destructive"
            className="gap-2"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>

      <div className="text-center">
            <Button className="rounded-2xl px-8 text-lg" onClick={()=>{
              getUserData()
            }}>Get current user</Button>

            <p>{user1?.name}</p>
      </div>
    </main>
  )
}

export default UserHome

/* ================= SUB COMPONENT ================= */

const StatCard = ({
  icon: Icon,
  title,
  value,
  badge,
}: {
  icon: any
  title: string
  value?: string
  badge?: string
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    transition={{ duration: 0.4 }}
  >
    <Card className="h-full hover:shadow-lg transition border border-border">
      <CardContent className="p-6 space-y-4">
        <Icon className="h-8 w-8 text-primary" />
        <h3 className="text-sm text-muted-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">{value}</p>
          {badge && <Badge>{badge}</Badge>}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)
