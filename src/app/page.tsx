"use client"

import { Suspense, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import About from "@/components/about"
import Contact from "@/components/contact"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import SkillsGrid from "@/components/skills-grid"
import Footer from "@/components/footer"
import LetsWorkCTA from "@/components/lets-work-cta"

// Dynamically import the loading screen to reduce initial bundle size
const LoadingScreen = dynamic(() => import("@/components/loading-screen"), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    </div>
  ),
})

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <main className="relative px-0 sm:px-2 mx-auto overflow-hidden">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
          </div>
        }
      >
        <LoadingScreen />
        <About />
        <Experience />
        <Projects />
        <SkillsGrid />
        <Education />
        <Contact />
        <LetsWorkCTA />
        <Footer />
      </Suspense>
    </main>
  )
}
