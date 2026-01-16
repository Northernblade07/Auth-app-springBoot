import { motion } from "framer-motion"
import useAuth from "@/auth/store"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, ShieldCheck } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const UserProfile = () => {
  const user = useAuth((s) => s.user)

  return (
    <main className="p-6 md:p-10 max-w-3xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-border bg-background/80 backdrop-blur">
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 ring-2 ring-primary/30">
              <AvatarImage src={user?.image} />
              <AvatarFallback>
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-2xl">
                {user?.name || "Unnamed User"}
              </CardTitle>
              <p className="text-muted-foreground flex items-center gap-1 justify-center">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
            </div>

            <Badge variant="secondary" className="gap-1">
              <ShieldCheck className="h-3 w-3" />
              {user?.provider.toUpperCase()} AUTH
            </Badge>
          </CardHeader>

          <Separator />

          <CardContent className="p-6 space-y-4 text-sm">
            <InfoRow label="User ID" value={user?.id} />
            <InfoRow
              label="Account Status"
              value={user?.enabled ? "Enabled" : "Disabled"}
            />
            <InfoRow
              label="Created At"
              value={new Date(user?.createdAt || "").toLocaleString()}
            />
            <InfoRow
              label="Last Updated"
              value={new Date(user?.updatedAt || "").toLocaleString()}
            />
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

export default UserProfile

/* ================= SUB COMPONENT ================= */

const InfoRow = ({
  label,
  value,
}: {
  label: string
  value?: string
}) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value || "-"}</span>
  </div>
)
