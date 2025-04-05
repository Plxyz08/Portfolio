"use client"

import { useState, useEffect } from "react"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ThreeBackground from "@/components/three-background"
import BackToTop from "@/components/back-to-top"
import Education from "@/components/education"
import Hero from "@/components/hero"
import SidebarNavigation from "@/components/sidebar-navigation"
import FreelanceProjects from "@/components/freelance-projects"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Asegurar que la página se cargue completamente antes de mostrar el contenido
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen md:ml-20 overflow-x-hidden" suppressHydrationWarning>
      <ThreeBackground />
      <SidebarNavigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <FreelanceProjects />
      <Education />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}

