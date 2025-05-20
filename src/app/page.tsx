"use client"

import { Suspense, useState } from "react"
import About from "@/components/about"
import Contact from "@/components/contact"
import Experience from "@/components/experience"
import LoadingScreen from "@/components/loading-screen"
import Projects from "@/components/projects"
import Education from "@/components/education"
import SkillsGrid from "@/components/skills-grid"
import Footer from "@/components/footer"
import LetsWorkCTA from "@/components/lets-work-cta"

export default function Home() {
  const [state, setState] = useState(null)

  return (
    <main className="relative px-0 sm:px-2 mx-auto overflow-hidden">
      <Suspense fallback={null}>
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
