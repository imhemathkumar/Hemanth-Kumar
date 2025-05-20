"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileIcon, Github, Linkedin, Mail, Twitter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import MagneticElement from "./magnetic-element"

export default function Header({ setSidebarVisible }: { setSidebarVisible: (visible: boolean) => void }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-transparent backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="md:container lg:container mx-auto px-4 py-3 flex items-center justify-between">
        <MagneticElement as="link" href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">Hemanth Kumar</span>
        </MagneticElement>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <MagneticElement as="div" strength={40}>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/imhemathkumar" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </MagneticElement>
            <MagneticElement as="div" strength={40}>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/hemanth-kumar-telukuntla-14a8572b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </MagneticElement>
            <MagneticElement as="div" strength={40}>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://x.com/imhemanthkumar8?t=bRuhXnDRPrk-YKhgyDEJnw&s=08" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <X className="h-5 w-5" />
                </a>
              </Button>
            </MagneticElement>
            <MagneticElement as="div" strength={40}>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:hemanthkumartelukuntla143@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </MagneticElement>
            <MagneticElement as="div" strength={40}>
              <a
                href="/resume.pdf"
                download
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Download Resume"
              >
                <FileIcon className="h-4 w-4" />
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>
    </header>
  )
}
