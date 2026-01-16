import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { NavLink } from "react-router"

const OAuth2Button = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* GitHub */}
      <Button
      type="button"
        asChild
        variant="outline"
        className="gap-2 h-10 sm:h-11 w-full cursor-pointer"
      >
        <NavLink 
        to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8082/"}oauth2/authorization/github`}
        >
          <Github className="h-4 w-4" />
          GitHub
        </NavLink>
      </Button>

      {/* Google */}
      <Button
        asChild
        type="button"
        variant="outline"
        className="gap-2 h-10 sm:h-11 w-full cursor-pointer"
      >
        <NavLink 
        to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8082/"}oauth2/authorization/google`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.5 20H24v8.5h11.9C34.3 33.7 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l6.4-6.4C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.2-2.7-.5-4z"
              fill="currentColor"
            />
          </svg>
          Google
        </NavLink>
      </Button>
    </div>
  )
}

export default OAuth2Button
