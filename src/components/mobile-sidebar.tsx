"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types"

interface MobileSidebarProps {
  navItems: NavItem[]
  activeSection: string
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void
  sidebarRef?: React.Ref<HTMLDivElement>  // Add optional ref prop
}

export function MobileSidebar({ navItems, activeSection, handleNavClick, sidebarRef }: MobileSidebarProps) {
  return (
    <motion.div
      key="mobile-sidebar"
      ref={sidebarRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden fixed left-0 top-20 z-50"
    >
      <div className="mx-4">
        <div className="bg-transparent/30 rounded-2xl shadow-lg py-4 px-2 flex flex-col items-center gap-4">
          {navItems.map((item) => (
            <a
              key={`mobile-${item.id}`}
              href={item.href}
              className={cn(
                "p-3 w-full rounded-md transition-colors interactive flex items-center justify-center",
                activeSection === item.href.substring(1)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/90 dark:hover:bg-background/90",
              )}
              onClick={(e) => handleNavClick(e, item)}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
