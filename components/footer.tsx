"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { Github, Linkedin, Mail, Briefcase } from "lucide-react"

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const currentYear = new Date().getFullYear()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="border-t py-12 bg-muted/30 md:ml-0">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-medium">Sebastián Muñoz</h3>
            <p className="text-sm text-muted-foreground">
              Desarrollador Full-Stack con experiencia en diseño web y desarrollo de software.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/Plxyz08" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/sebastian-aparicio00/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.workana.com/freelancer/0391c229a6d7a4bf5832d1b566c3c46c"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Briefcase className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">Workana</span>
              </Link>
              <Link href="mailto:sebastianmunoz603@gmail.com">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-medium">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  Habilidades
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  Experiencia
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-medium">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Desarrollo Web</li>
              <li className="text-muted-foreground">Desarrollo de Aplicaciones</li>
              <li className="text-muted-foreground">Diseño UI/UX</li>
              <li className="text-muted-foreground">Consultoría Técnica</li>
              <li className="text-muted-foreground">Mantenimiento Web</li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            <h3 className="text-lg font-medium">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Bucaramanga, Colombia</li>
              <li className="text-muted-foreground">(+57) 3015914917</li>
              <li className="text-muted-foreground">sebastianmunoz603@gmail.com</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground"
        >
          <p>&copy; {currentYear} Sebastián Muñoz. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}

