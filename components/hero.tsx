"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, MousePointer, Briefcase, Download, ChevronDown } from "lucide-react"
import Link from "next/link"
import MiniGameButton from "./mini-game-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [isLoaded, setIsLoaded] = useState(false)

  // Array de textos profesionales que irán cambiando
  const professionalTexts = [
    "Full-Stack Developer",
    "React Specialist",
    "Mobile App Developer",
    "UI/UX Enthusiast",
    "JavaScript Expert",
    "Web Solutions Architect",
  ]

  // Efecto para asegurar que todo se cargue correctamente
  useEffect(() => {
    // Asegurar que el componente está completamente montado antes de mostrar contenido
    setIsLoaded(true)

    // Iniciar con el primer texto
    if (displayText === "") {
      setDisplayText(professionalTexts[0].substring(0, 1))
    }
  }, [])

  // Efecto para manejar el scroll
  useEffect(() => {
    if (!isLoaded) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLoaded])

  // Efecto para el texto cambiante tipo "typewriter"
  useEffect(() => {
    if (!isLoaded) return

    const currentText = professionalTexts[textIndex]

    // Lógica para escribir o borrar texto
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        setDisplayText(currentText.substring(0, displayText.length + 1))
        setTypingSpeed(100)

        // Si terminamos de escribir, comenzamos a borrar después de una pausa
        if (displayText.length === currentText.length) {
          setIsDeleting(true)
          setTypingSpeed(1500) // Pausa antes de comenzar a borrar
        }
      } else {
        // Borrando
        setDisplayText(currentText.substring(0, displayText.length - 1))
        setTypingSpeed(50)

        // Si terminamos de borrar, pasamos al siguiente texto
        if (displayText.length === 0) {
          setIsDeleting(false)
          setTextIndex((textIndex + 1) % professionalTexts.length)
          setTypingSpeed(300) // Pausa antes de comenzar a escribir el siguiente
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, textIndex, professionalTexts, typingSpeed, isLoaded])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      suppressHydrationWarning
    >
      <div
        className="absolute inset-0 bg-grid-pattern opacity-5 z-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Sebastián Muñoz</h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-primary dark:bg-blue-500 mx-auto my-4"
            />
            <div className="h-10 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 min-h-[2rem]">
                <span className="text-primary dark:text-blue-400">{displayText}</span>
                <span className="animate-blink ml-1">|</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <Link href="https://github.com/Plxyz08" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/sebastian-aparicio00/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link
              href="https://www.workana.com/freelancer/0391c229a6d7a4bf5832d1b566c3c46c"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Briefcase className="h-5 w-5" />
                <span className="sr-only">Workana</span>
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <Button
                className="rounded-full hover:bg-blue-600 transition-colors shadow-none hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                onClick={scrollToAbout}
              >
                Ver Mi Trabajo <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            {/* Menú desplegable para descargar CV en diferentes idiomas */}
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-primary/10 transition-colors shadow-none hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] gap-2"
                  >
                    Descargar CV <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  <DropdownMenuItem asChild>
                    <a
                      href="/CV/CVSebastianMuñozES.pdf"
                      download="CV-Sebastian-Munoz.pdf"
                      className="flex items-center cursor-pointer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>Español</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="/CV/CV-SebastianMuñozEN.pdf"
                      download="CV-Sebastian-Munoz-EN.pdf"
                      className="flex items-center cursor-pointer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>English</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </motion.div>
          <MiniGameButton isHero={true} showText={true} />
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <button
              onClick={scrollToAbout}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Scroll to About section"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center gap-1 text-gray-400 text-xs"
          >
            <MousePointer className="h-3 w-3" />
            <span>Mueve el mouse para interactuar</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

