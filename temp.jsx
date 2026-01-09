import { Link } from "react-router-dom"
import { 
  Instagram, Github, Linkedin, Mail,
  X, ArrowRight, ChevronRight, Home,
  CheckSquare, User, Phone
} from "lucide-react"

// Menu items array
const menuItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks" },
  { to: "/about", icon: User, label: "About" },
  { to: "/contact", icon: Phone, label: "Contact" }
]

// Social links array
const socialLinks = [
  { href: "https://instagram.com/ii.bbs", icon: Instagram, label: "Instagram" },
  { href: "https://github.com/mukhtaransarii", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/mukhtar-alam-643764299", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:mukhtar.alam458546@gmail.com", icon: Mail, label: "Email" }
]

export default function DropdownNav({ isOpen, setIsOpen }) {
  return (
    
  )
}