"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Building2, Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: "Desarrollador FullStack",
      company: "Trascender Global",
      period: "Abril 2024 - Diciembre 2024",
      location: "Remoto",
      description: [
        "Desarrollo y optimización de interfaces de usuario utilizando React, Tailwind CSS y Next, mejorando la experiencia visual y la accesibilidad del software.",
        "Refactorización y mejora del código existente, aplicando buenas prácticas de desarrollo para aumentar la eficiencia, mantenibilidad y rendimiento de las aplicaciones web.",
        "Colaboración con equipos de diseño y backend para implementar nuevas funcionalidades, resolver problemas técnicos, y garantizar una integración fluida con el software ya en desarrollo.",
        "Gestión del desarrollo de software utilizando Azure DevOps para organizar tareas, sprints y seguimiento de avances dentro del marco de trabajo Scrum, asegurando una entrega eficiente y colaborativa.",
      ],
      skills: ["React", "Tailwind CSS", "Next.js", "Azure DevOps", "Scrum"],
    },
    {
      title: "Desarrollador FullStack",
      company: "Empresa Rifas",
      period: "Julio 2023 - Febrero 2024",
      location: "Remoto",
      description: [
        "Desarrollo fullstack en colaboración, elaborando la base de datos con modelos, rutas, helpers y controladores, utilizando Node.js, Express, Socket, JWT, Bcrypt, Axios y Nodemail.",
        "Participación en el desarrollo del frontend con Vue 3, Quasar, Pinia y Axios, incluyendo funcionalidades como compra de productos (utilizando Wompi), perfiles de usuario, roles, informes de ventas, cambio y recuperación de contraseña.",
      ],
      skills: ["Vue 3", "Quasar", "Pinia", "Node.js", "Express", "JWT", "Socket"],
    },
    {
      title: "Desarrollador FullStack",
      company: "Proyecto Empresa de Transporte",
      period: "Enero 2023 - Octubre 2023",
      location: "Remoto",
      description: [
        "Liderazgo en el desarrollo fullstack utilizando Vue 3, Quasar, Pinia y Axios para el frontend, y Node.js, Express, Socket, JWT, Bcrypt y Axios para el backend.",
        "Implementación del frontend, diseño de la interfaz de usuario e integración del backend en un Proyecto colaborativo desde cero.",
        "Distribución de roles, tareas y sprints utilizando Jira.",
      ],
      skills: ["Vue 3", "Quasar", "Pinia", "Node.js", "Express", "Jira"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Experiencia Profesional
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Mi trayectoria profesional en el desarrollo de software y aplicaciones web.
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={inView ? { opacity: 1, height: "100%" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"
          />

          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={item} className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary dark:bg-blue-500"
                />

                <Card
                  className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} hover:shadow-lg transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 hover:border-blue-400 dark:hover:border-blue-400 group`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                      <span className="mx-2">•</span>
                      <Building2 className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription className="text-primary font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {exp.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                          className="flex gap-2"
                        >
                          <ChevronRight className="h-5 w-5 text-primary dark:text-blue-400 flex-shrink-0 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                          <span className="text-muted-foreground">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                        >
                          <Badge variant="secondary">{skill}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

