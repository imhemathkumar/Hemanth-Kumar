"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Code2,
  GraduationCap,
  Phone,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import MagneticElement from "./magnetic-element"

const navItems = [
  { id: "resume", name: "Resume", href: "/resume.pdf", icon: FileText, isResume: true },
  { id: "home", name: "Home", href: "#hero", icon: Home },
  { id: "about", name: "About", href: "#about", icon: User },
  { id: "experience", name: "Experience", href: "#experience", icon: Briefcase },
  { id: "projects", name: "Projects", href: "#projects", icon: FolderOpen },
  { id: "skills", name: "Skills", href: "#skills", icon: Code2 },
  { id: "education", name: "Education", href: "#education", icon: GraduationCap },
  { id: "contact", name: "Contact", href: "#contact", icon: Phone },
]

export default function Sidebar({ setIsVisible }: { setIsVisible: (visible: boolean) => void }) {
  const [activeSection, setActiveSection] = useState("")
  const [animatedSections, setAnimatedSections] = useState<Record<string, boolean>>({
    hero: true,
    about: true,
    experience: true,
    projects: true,
    skills: true,
    education: true,
    contact: true,
  })
  const desktopSidebarRef = useRef<HTMLDivElement>(null)
  const mobileSidebarRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)

  function onSectionAnimated(id: string) {
    setAnimatedSections((prev) => {
      if (prev[id]) return prev
      return { ...prev, [id]: true }
    })
  }

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const updateActiveSection = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight

        const contactSection = document.getElementById("contact")

        if (contactSection) {
          const contactRect = contactSection.getBoundingClientRect()
          const distanceToContact = contactRect.top - viewportHeight
          const transitionDistance = 500
          const transitionProgress = Math.max(0, Math.min(1, 1 - distanceToContact / transitionDistance))

          // Apply fade/scale to desktop sidebar
          if (desktopSidebarRef.current) {
            if (distanceToContact < transitionDistance) {
              desktopSidebarRef.current.style.opacity = `${1 - transitionProgress}`
              desktopSidebarRef.current.style.transform = `scale(${1 - transitionProgress * 0.3})`
            } else {
              desktopSidebarRef.current.style.opacity = "1"
              desktopSidebarRef.current.style.transform = "scale(1)"
            }
          }

          // Apply fade/scale to mobile sidebar
          if (mobileSidebarRef.current) {
            if (distanceToContact < transitionDistance) {
              mobileSidebarRef.current.style.opacity = `${1 - transitionProgress}`
              mobileSidebarRef.current.style.transform = `scale(${1 - transitionProgress * 0.3})`
            } else {
              mobileSidebarRef.current.style.opacity = "1"
              mobileSidebarRef.current.style.transform = "scale(1)"
            }
          }
        }

        let current = ""

        sections.forEach((section) => {
          const id = section.getAttribute("id") || ""
          if (!animatedSections[id]) return

          const rect = section.getBoundingClientRect()

          if (rect.top <= 150 && rect.bottom >= 150) {
            current = id
          }
        })

        if (current !== activeSection) {
          setActiveSection(current)
        }

        ticking.current = false
      })
    }

    window.addEventListener("scroll", updateActiveSection)
    updateActiveSection()

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
    }
  }, [activeSection, animatedSections])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    if (item.isResume) return

    e.preventDefault()
    const section = document.querySelector(item.href)
    if (section) section.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {/* Desktop Sidebar */}
      <motion.div
        key="desktop-sidebar"
        ref={desktopSidebarRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-50 sidebar-container transition-all duration-300"
        data-custom-cursor="allow"
      >
        <div className="flex">
          <motion.div className="fixed top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md rounded-full border-r border-y left-3 shadow-lg py-6 flex flex-col items-center gap-6 w-16 transition-all duration-300">
          
            {navItems.map((item) => (
             <MagneticElement as="a" strength={40}
                key={`desktop-${item.id}`}
                href={item.href}
                className={cn(
                  "p-2 rounded-md transition-colors interactive",
                  activeSection === item.href.substring(1)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-background/90",
                )}
                onClick={(e: React.MouseEvent<Element>) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, item)}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </MagneticElement>
            ))}          
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        navItems={navItems}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        sidebarRef={mobileSidebarRef} // pass ref for fade/scale
      />
    </AnimatePresence>
  )
}
