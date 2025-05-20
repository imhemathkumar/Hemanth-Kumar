"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import HolographicBackground from "@/components/holographic-background"
import CustomCursor from "@/components/custom-cursor"
import { CursorProvider } from "@/context/cursor-context"
import { ModeToggle } from "@/components/mode-toggle"

const inter = Inter({ subsets: ["latin"] })

// Metadata needs to be in a separate file or exported from a server component
const metadata: Metadata = {
  title: "Hemanth Kumar | Portfolio",
  description: "Personal portfolio website of Hemanth Kumar, showcasing skills, projects, and professional experience.",
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Ensure hydration is complete before rendering theme-dependent components
  useEffect(() => {
    setMounted(true)

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorProvider>
            {mounted && (
              <>
                <HolographicBackground />
                {!isMobile && <CustomCursor />}
                <Header setSidebarVisible={setSidebarVisible} />
                {sidebarVisible && <Sidebar setIsVisible={setSidebarVisible} />}
                <div className="fixed bottom-4 right-4 flex items-center gap-2 z-50">
                  <div className="bg-transparent/20 hover:bg-background/80 rounded-full">
                    <ModeToggle />
                  </div>
                </div>
                <div className="fixed bottom-4 left-4 flex items-center gap-2 z-50">
                  <button
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                    className="p-2 rounded-full backdrop-blur-md text-primary bg-transparent/20 border hover:bg-background/80 transition-colors"
                  >
                    {sidebarVisible ? "←" : "→"}
                  </button>
                </div>
              </>
            )}
            <div className="pt-16">{children}</div>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
