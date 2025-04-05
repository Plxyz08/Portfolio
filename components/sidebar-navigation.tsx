"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Moon, Sun, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import MiniGameButton from "./mini-game-button"
import {
  Home,
  User,
  Code2,
  Briefcase,
  FolderGit2,
  MessageSquareQuote,
  Mail,
  ChevronRight,
  GraduationCap,
  Laptop,
} from "lucide-react"

type NavItem = {
  name: string
  href: string
  icon: React.ReactNode
}

export default function SidebarNavigation() {
  const [activeSection, setActiveSection] = useState<string>("#")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reordenar los navItems para que Freelance esté después de Experiencia
  const navItems: NavItem[] = [
    {
      name: "Inicio",
      href: "#",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Sobre Mí",
      href: "#about",
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "Habilidades",
      href: "#skills",
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      name: "Experiencia",
      href: "#experience",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      name: "Freelance",
      href: "#freelance",
      icon: <Laptop className="h-4 w-4" />,
    },
    {
      name: "Educación y Certificaciones",
      href: "#education",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      name: "Proyectos",
      href: "#projects",
      icon: <FolderGit2 className="h-4 w-4" />,
    },
    {
      name: "Testimonios",
      href: "#testimonials",
      icon: <MessageSquareQuote className="h-4 w-4" />,
    },
    {
      name: "Contacto",
      href: "#contact",
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href)

      // Find the current section based on scroll position
      const currentSection = sections.reduce((current, section) => {
        if (section === "#") {
          // Special case for home section
          return window.scrollY < 300 ? section : current
        }

        const element = document.querySelector(section)
        if (!element) return current

        const rect = element.getBoundingClientRect()
        // Consider a section active if its top is within viewport or just above it
        if (rect.top <= 150 && rect.bottom > 0) {
          return section
        }

        return current
      }, "#")

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  // Scroll to section function
  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Desktop Sidebar - Ahora transparente y sin logo */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="fixed left-0 top-0 bottom-0 w-20 z-50 hidden md:flex flex-col items-center py-8"
      >
        {/* Navigation Items - Ahora empezando desde arriba sin logo */}
        <nav className="flex-1 flex flex-col items-center space-y-5 py-4">
          {navItems.map((item) => {
            const isActive = activeSection === item.href

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                {/* Fondo del botón activo - ahora con efecto de vidrio */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-primary/10 dark:bg-white/10 backdrop-blur-sm shadow-md"
                    layoutId="activeBackground"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative w-10 h-10 rounded-xl",
                      isActive ? "text-primary dark:text-white" : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => scrollToSection(item.href)}
                    aria-label={item.name}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {item.icon}
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border/50 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md z-50">
                  {item.name}
                </div>
              </motion.div>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col items-center space-y-4">
          <MiniGameButton variant="ghost" size="icon" showText={false} />

          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-primary/10 backdrop-blur-sm text-primary dark:text-white shadow-md"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          )}

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <a href="/CV/CVSebastianMuñozES.pdf" download="CV-Sebastian-Munoz.pdf">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-xl bg-primary/10 backdrop-blur-sm shadow-md text-primary dark:text-white"
                aria-label="Download CV"
              >
                <Download className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/50 z-40 flex md:hidden items-center px-4">
        <div className="flex justify-between items-center w-full">
          <Link href="#" onClick={() => scrollToSection("#")} className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">SM</span>
            </div>
            <span className="font-bold text-lg">Sebastián Muñoz</span>
          </Link>

          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 md:hidden"
          >
            <div className="container h-full flex flex-col py-4">
              <div className="flex justify-between items-center">
                <Link href="#" className="flex items-center gap-2" onClick={() => scrollToSection("#")}>
                  <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">SM</span>
                  </div>
                  <span className="text-lg font-bold">Sebastián Muñoz</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <motion.nav
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-start justify-start flex-1 space-y-2 mt-8 pb-20 px-2"
              >
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-lg gap-3 h-14 rounded-xl",
                          isActive
                            ? "bg-primary/10 text-primary dark:bg-white/10 dark:text-white"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        onClick={() => scrollToSection(item.href)}
                      >
                        <motion.div
                          animate={{ scale: isActive ? 1.1 : 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          {item.icon}
                        </motion.div>
                        {item.name}
                        {isActive && <ChevronRight className="ml-auto h-5 w-5" />}
                      </Button>
                    </motion.div>
                  )
                })}
              </motion.nav>

              {/* Mobile Bottom Actions */}
              <div className="border-t border-border/30 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base">Cambiar tema:</span>
                  {mounted && (
                    <Button variant="outline" size="icon" onClick={toggleTheme} className="h-12 w-12 rounded-xl">
                      {theme === "dark" ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6" />}
                    </Button>
                  )}
                </div>

                <a href="/CV/CVSebastianMuñozES.pdf" download="CV-Sebastian-Munoz.pdf" className="w-full block">
                  <Button className="w-full gap-2 h-14 rounded-xl">
                    <Download className="h-5 w-5" /> Descargar CV
                  </Button>
                </a>

                <div className="flex justify-center">
                  <MiniGameButton showText={true} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

