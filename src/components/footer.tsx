"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import MagneticElement from "./magnetic-element"
import { Twitter, Linkedin, Github, Mail, X } from "lucide-react"

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return null

  return (
    <footer className="w-full py-8 flex flex-col items-center justify-center transition-colors duration-200">
      <div className="flex items-center space-x-6 mb-4">
        <MagneticElement as="a" href="https://x.com/imhemanthkumar8?t=bRuhXnDRPrk-YKhgyDEJnw&s=08" strength={40} target="_blank" rel="noopener noreferrer">
          <X className={`h-6 w-6 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`} />
        </MagneticElement>
        
        <MagneticElement as="a" href="https://www.linkedin.com/in/hemanth-kumar-telukuntla-14a8572b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" strength={40} target="_blank" rel="noopener noreferrer">
          <Linkedin className={`h-6 w-6 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`} />
        </MagneticElement>
        
        <MagneticElement as="a" href="https://github.com/imhemathkumar" strength={40} target="_blank" rel="noopener noreferrer">
          <Github className={`h-6 w-6 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`} />
        </MagneticElement>
        
        <MagneticElement as="a" strength={40} href="mailto:hemanthkumartelukuntla143@gmail.com">
          <Mail className={`h-6 w-6 ${isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`} />
        </MagneticElement>
      </div>
      
      <p className={isDark ? "text-sm text-gray-400" : "text-sm text-gray-500"}>
        © {new Date().getFullYear()} Hemanth Kumar. All rights reserved.
      </p>
    </footer>
  )
}
