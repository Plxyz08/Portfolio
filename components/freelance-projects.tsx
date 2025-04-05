"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Briefcase, Laptop, Code, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"

export default function FreelanceProjects() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const toggleProject = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  const freelanceProjects = [
    {
      id: 3,
      title: "Aplicación Móvil - Tesla Lift",
      period: "Febrero 2025 - Marzo 2025",
      client: "Empresa de servicios de ascensores",
      location: "Remoto",
      image: "/Freelance/TeslaFreelance.png",
      description:
        "Desarrollo completo de una aplicación móvil multiplataforma para la gestión de servicios de mantenimiento de ascensores, implementada con React Native y desplegada en App Store y Play Store.",
      details: [
        "Desarrollo integral de una aplicación móvil para la gestión de servicios de ascensores, incluyendo seguimiento de mantenimientos, reportes de incidencias y programación de visitas técnicas.",
        "Implementación del frontend con React Native y Expo, utilizando componentes personalizados y optimizados para rendimiento en dispositivos iOS y Android.",
        "Desarrollo de un backend robusto con Next.js API Routes y autenticación JWT para gestionar usuarios, permisos y datos de la aplicación.",
        "Integración con Supabase para base de datos PostgreSQL, almacenamiento de archivos y notificaciones en tiempo real.",
        "Implementación de un sistema de geolocalización para rastrear técnicos y optimizar rutas de servicio.",
        "Desarrollo de un panel de administración web complementario para la gestión centralizada de todos los servicios.",
        "Configuración completa del proceso de CI/CD y despliegue en App Store y Play Store con actualizaciones OTA mediante Expo.",
      ],
      technologies: [
        "React Native",
        "Expo",
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "JWT",
        "Mapbox",
        "Push Notifications",
        "App Store",
        "Play Store",
      ],
      type: "Desarrollo Móvil",
    },
    {
      id: 1,
      title: "Desarrollo Web - LaListaWBC.com",
      period: "Octubre 2024 - Febrero 2025",
      client: "Empresario en Bucaramanga",
      location: "Bucaramanga, Colombia",
      image: "/Freelance/LaListaFreelance.png",
      description:
        "Desarrollo completo de una plataforma web de directorio empresarial con sistema de membresías, pasarela de pagos y panel administrativo avanzado para un empresario local en Bucaramanga.",
      details: [
        "Análisis y diseño completo de la arquitectura del sistema, incluyendo modelado de datos, diagramas de flujo y wireframes de la interfaz de usuario.",
        "Desarrollo del frontend con Next.js y React, implementando un diseño responsive y optimizado para SEO con Server-Side Rendering.",
        "Implementación de un backend robusto con Node.js, Express y MongoDB, incluyendo una API RESTful completa con documentación Swagger.",
        "Desarrollo de un sistema de autenticación y autorización seguro con JWT, roles de usuario y recuperación de contraseñas.",
        "Integración con pasarela de pagos Wompi para procesamiento de suscripciones y pagos recurrentes de membresías.",
        "Implementación de Cloudinary para gestión avanzada de contenido multimedia, incluyendo optimización automática de imágenes.",
        "Desarrollo de un panel de administración completo con estadísticas en tiempo real, gestión de usuarios y contenido.",
        "Optimización de rendimiento con técnicas avanzadas de caching, lazy loading y code splitting.",
        "Configuración de infraestructura en Hostinger, incluyendo dominio personalizado, certificados SSL y backups automáticos.",
      ],
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Bcrypt",
        "JWT",
        "Axios",
        "Cloudinary",
        "Wompi",
        "Vercel",
        "Hostinger",
        "Google Analytics",
      ],
      type: "Desarrollo Web Completo",
    },
    {
      id: 2,
      title: "Asesorías en Desarrollo de Software",
      period: "Diciembre 2024",
      client: "Equipo profesional en Perú",
      location: "Remoto",
      image: "/Freelance/AsesoriaFreelance.png",
      description:
        "Serie de sesiones de consultoría especializada para un equipo de desarrollo en Perú, enfocadas en mejorar procesos, implementar metodologías ágiles y optimizar la arquitectura de sus aplicaciones.",
      details: [
        "Realización de un diagnóstico completo del estado actual de los proyectos y procesos del equipo, identificando áreas de mejora y oportunidades de optimización.",
        "Diseño e implementación de un plan de adopción de metodologías ágiles (Scrum y Kanban) adaptado a las necesidades específicas del equipo y sus proyectos.",
        "Capacitación intensiva sobre técnicas avanzadas de toma de requerimientos, incluyendo user stories, criterios de aceptación y estimación de esfuerzo.",
        "Asesoría en la selección de stack tecnológico para nuevos proyectos, evaluando opciones según escalabilidad, mantenibilidad y curva de aprendizaje del equipo.",
        "Consultoría sobre arquitectura de microservicios y estrategias de despliegue en la nube, incluyendo configuración de CI/CD y entornos de desarrollo.",
        "Implementación de mejores prácticas de desarrollo, incluyendo code reviews, pair programming y testing automatizado.",
        "Diseño de flujos de trabajo optimizados para mejorar la colaboración entre equipos de desarrollo, diseño y producto.",
        "Seguimiento post-asesoría con métricas de mejora y recomendaciones adicionales para la evolución continua del equipo.",
      ],
      technologies: [
        "Scrum",
        "Kanban",
        "Jira",
        "Confluence",
        "Git Flow",
        "CI/CD",
        "AWS",
        "Azure DevOps",
        "Testing Automatizado",
        "Microservicios",
        "Team Management",
      ],
      type: "Consultoría",
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
    <section id="freelance" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Proyectos Freelance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Proyectos independientes en los que he trabajado como desarrollador freelance, ofreciendo soluciones
            personalizadas a clientes diversos.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-8"
        >
          {freelanceProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-400 group">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <Badge className="self-start mb-2 bg-primary/90 hover:bg-primary text-white">
                        {project.type}
                      </Badge>
                      <h3 className="text-white text-lg font-bold md:hidden">{project.title}</h3>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-xl font-bold hidden md:block mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{project.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{project.client}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{project.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{project.description}</p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 5).map((tech, index) => (
                            <Badge key={index} variant="outline" className="bg-primary/5 hover:bg-primary/10">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 5 && (
                            <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">
                              +{project.technologies.length - 5}
                            </Badge>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          className="gap-1 text-primary hover:text-primary hover:bg-primary/10 p-0"
                          onClick={() => toggleProject(project.id)}
                        >
                          {expandedProject === project.id ? (
                            <>
                              Ver menos <ChevronUp className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Ver detalles <ChevronDown className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <CardContent className="border-t p-6 bg-muted/10">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Laptop className="h-4 w-4 text-primary" />
                          Detalles del proyecto
                        </h4>
                        <ul className="space-y-2">
                          {project.details.map((detail, index) => (
                            <li key={index} className="flex gap-2">
                              <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Code className="h-4 w-4 text-primary" />
                            Tecnologías utilizadas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

