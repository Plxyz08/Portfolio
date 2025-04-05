"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  return (
    <section id="about" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-10 items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/3 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 dark:border-blue-500/30">
              <Image
                src="/SobreMi/Foto-perfil.png?height=320&width=320"
                alt="Sebastián Muñoz"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-2/3"
          >
            <h2 className="text-3xl font-bold mb-6">Sobre Mí</h2>
            <p className="text-muted-foreground mb-6">
              Soy un desarrollador FullStack con más de 3 años de experiencia y formación en diseño web y desarrollo de
              software. Tengo conocimiento en distintas tecnologías lo que me ha permitido ser parte del desarrollo
              exitoso de proyectos, tanto personales como empresariales. Además, cuento con una mentalidad creativa y
              una gran capacidad para la resolución de problemas, lo que me permite encontrar soluciones efectivas para
              los proyectos en los que trabajo, también me desarrollo muy bien en el trabajo en equipo y me destaco por
              mi buena comunicación.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="font-medium">Ubicación:</span>
                <span className="text-muted-foreground">Bucaramanga, Colombia</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <span className="font-medium">Email:</span>
                <a
                  href="mailto:sebastianmunoz603@gmail.com"
                  className="text-primary dark:text-blue-400 hover:underline"
                >
                  sebastianmunoz603@gmail.com
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="font-medium">Teléfono:</span>
                <a href="tel:+573015914917" className="text-primary dark:text-blue-400 hover:underline">
                  (+57) 3015914917
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
            <a href="/CV/CVSebastianMuñozES.pdf" download="CV-Sebastian-Munoz.pdf">
              <Button className="gap-2 hover:scale-105 transition-transform">
                Descargar CV <FileDown className="h-4 w-4" />
              </Button>
            </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

