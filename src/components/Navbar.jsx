import { useState } from 'react';
import { Link } from "react-router-dom";
import { Instagram, Github, Linkedin, Mail, X, ArrowRight, ChevronRight, Home, CheckSquare, User, Phone } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <div>
      <nav className="flex justify-between items-center bg-white h-12 border border-gray-200 shadow-sm rounded-xl p-6 mx-6 mt-6">
        <img src="./vite.svg" className="w-8" />
        
        <div className='w-16 h-12 relative' onClick={() => setIsOpen(!isOpen)}>
          <div class={`bg-black w-full h-[0.5px] absolute top-[40%] transition duration-[0.2s] ${isOpen ? '-rotate-8' : ''} origin-right`}></div>
          <div class={`bg-black w-full h-[0.5px] absolute bottom-[40%] transition duration-[0.2s] ${isOpen ? 'rotate-8' : ''} origin-right`}></div>
        </div>
      </nav>

      
      {/* Drop Down Nav */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Navigation Panel */}
        <div className={`absolute inset-x-6 bottom-6 bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl transition-all duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}>
          <div className="p-8 h-[88vh] overflow-y-auto scrollbar-hide">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation Links */}
            <nav className="mt-12">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="block group hover:bg-white hover:rounded-xl px-4"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-6 h-6 text-gray-400 mt-6" />
                      <p className="text-[17vw] md:text-[6vw] font-[Grotesk] leading-none pt-6 text-gray-900">
                        {item.label}
                      </p>
                      <ArrowRight className="w-8 h-8 ml-auto text-gray-300 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-2" />
                    </div>                    
                  </Link>
                ))}
              </div>
            </nav>

            {/* Social Links */}
            <div className="border-t border-gray-200/50 pt-8">
              <span className="text-sm text-gray-500 uppercase tracking-wider">Connect</span>
              <ul className="mt-6 space-y-3">
                {socialLinks.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <social.icon className="w-5 h-5 text-gray-700" />
                        </div>
                        <span className="font-medium">{social.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}