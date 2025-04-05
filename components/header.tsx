"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Download,
  Moon,
  Sun,
  ChevronDown,
  Home,
  User,
  Code2,
  GraduationCap,
  Award,
  Briefcase,
  FolderGit2,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import MiniGameButton from "./mini-game-button"

type NavItem = {
  name: string
  href: string
  icon: React.ReactNode
  items?: {
    name: string
    href: string
    icon: React.ReactNode
  }[]
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems: NavItem[] = [
    {
      name: "Inicio y Sobre Mí",
      href: "#",
      icon: <Home className="h-4 w-4" />,
      items: [
        { name: "Inicio", href: "#", icon: <Home className="h-4 w-4" /> },
        { name: "Sobre Mí", href: "#about", icon: <User className="h-4 w-4" /> },
      ],
    },
    {
      name: "Habilidades",
      href: "#skills",
      icon: <Code2 className="h-4 w-4" />,
    },
    {
      name: "Formación",
      href: "#education",
      icon: <GraduationCap className="h-4 w-4" />,
      items: [
        { name: "Educación", href: "#education", icon: <GraduationCap className="h-4 w-4" /> },
        { name: "Certificaciones", href: "#certifications", icon: <Award className="h-4 w-4" /> },
      ],
    },
    {
      name: "Experiencia",
      href: "#experience",
      icon: <Briefcase className="h-4 w-4" />,
      items: [
        { name: "Experiencia", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
        { name: "Proyectos", href: "#projects", icon: <FolderGit2 className="h-4 w-4" /> },
      ],
    },
    {
      name: "Contacto",
      href: "#contact",
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle clicks outside of dropdown menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !Object.values(dropdownRefs.current).some((ref) => ref?.contains(event.target as Node))) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeDropdown])

  // Scroll to section function
  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)

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

  // Toggle dropdown function
  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name))
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link href="#" className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">SM</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 overflow-x-auto max-w-[70%] scrollbar-hide">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                  ref={(el) => {
                    if (item.items) {
                      dropdownRefs.current[item.name] = el
                    }
                  }}
                >
                  {item.items ? (
                    // Menu item with dropdown
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className={cn(
                          "text-sm relative whitespace-nowrap flex items-center gap-1",
                          isScrolled ? "hover:bg-primary/10" : "hover:bg-background/20",
                          activeDropdown === item.name && "bg-primary/10",
                        )}
                        onClick={() => toggleDropdown(item.name)}
                      >
                        {item.icon}
                        {item.name}
                        <motion.div
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                        </motion.div>
                      </Button>

                      {/* Dropdown Menu */}
                      {activeDropdown === item.name && (
                        <div className="absolute left-0 top-full z-50">
                          <div
                            className="mt-1 w-48 rounded-md shadow-lg bg-background border overflow-hidden"
                            style={{ opacity: 1 }}
                          >
                            <div className="p-1 space-y-1">
                              {item.items.map((subItem) => (
                                <Button
                                  key={subItem.name}
                                  variant="ghost"
                                  className="w-full justify-start text-sm gap-2 hover:bg-primary/10"
                                  onClick={() => scrollToSection(subItem.href)}
                                >
                                  {subItem.icon}
                                  {subItem.name}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular menu item
                    <Button
                      variant="ghost"
                      className={cn(
                        "text-sm relative group whitespace-nowrap flex items-center gap-1",
                        isScrolled ? "hover:bg-primary/10" : "hover:bg-background/20",
                      )}
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.icon}
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </Button>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <MiniGameButton variant="ghost" size="sm" showText={false} className="hidden sm:flex" />

              {/* Theme toggle button */}
              {mounted && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn("p-2 rounded-full", isScrolled ? "bg-primary/10" : "bg-background/20")}
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
                </motion.button>
              )}

              {/* CV Download button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="hidden sm:block"
              >
                <a href="/CV/CVSebastianMuñozES.pdf" download="CV-Sebastian-Munoz.pdf">
                  <Button className="gap-2" size="sm">
                    <Download className="h-4 w-4" /> CV
                  </Button>
                </a>
              </motion.div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 md:hidden overflow-y-auto"
          >
            <div className="container h-full flex flex-col py-4">
              {/* Mobile header */}
              <div className="flex justify-between items-center">
                <Link href="#" className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">SM</span>
                  </div>
                  <span className="text-lg font-bold">Sebastián Muñoz</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile navigation */}
              <motion.nav
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-start justify-start flex-1 space-y-6 mt-12 pb-20 px-4"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="w-full"
                  >
                    {item.items ? (
                      <div className="space-y-3 w-full">
                        <div className="flex items-center gap-2 px-3 py-2 font-medium text-xl border-b border-border/30">
                          {item.icon}
                          {item.name}
                        </div>
                        <div className="pl-6 space-y-3">
                          {item.items.map((subItem) => (
                            <Button
                              key={subItem.name}
                              variant="ghost"
                              className="w-full justify-start text-base gap-2 h-12"
                              onClick={() => scrollToSection(subItem.href)}
                            >
                              {subItem.icon}
                              {subItem.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        className="text-xl w-full justify-start gap-2 h-14"
                        onClick={() => scrollToSection(item.href)}
                      >
                        {item.icon}
                        {item.name}
                      </Button>
                    )}
                  </motion.div>
                ))}

                {/* CV Download button (mobile) */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 w-full border-t border-border/30"
                >
                  <a href="/CV/CVSebastianMuñozES.pdf" download="CV-Sebastian-Munoz.pdf" className="w-full block">
                    <Button className="w-full gap-2 h-14">
                      <Download className="h-5 w-5" /> Descargar CV
                    </Button>
                  </a>
                </motion.div>

                {/* Theme toggle (mobile) */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-6 w-full"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-base">Cambiar tema:</span>
                    {mounted && (
                      <Button variant="outline" size="icon" onClick={toggleTheme} className="h-12 w-12">
                        {theme === "dark" ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6" />}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

