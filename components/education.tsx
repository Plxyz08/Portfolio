"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, GraduationCap, MapPin, Award, BookOpen, Download, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const educationItems = [
    {
      degree: "Análisis y Desarrollo de Software",
      institution: "SENA",
      period: "Junio 2022 - Julio 2024",
      location: "Bucaramanga, Colombia",
      description:
        "Formación técnica en desarrollo de software, con enfoque en programación, bases de datos, desarrollo web y móvil, y metodologías ágiles.",
      certificate: "Título de Tecnólogo en Análisis y Desarrollo de Software",
      certificateUrl: "/Educacion/Titulo_Sena.pdf",
    },
    {
      degree: "Bachiller con Técnico en Electrónica",
      institution: "Colegio San José de Guanentá",
      period: "2021",
      location: "Bucaramanga, Colombia",
      description:
        "Formación en bachillerato con especialidad técnica en electrónica, incluyendo fundamentos de circuitos, programación básica y diseño de sistemas electrónicos.",
      certificate: "Diploma de Bachiller Técnico con Especialidad en Electrónica",
      certificateUrl: "/Educacion/Título_Bachiller.pdf",
    },
  ]

  const certifications = [
    {
      title: "Full Stack Developer",
      issuer: "Platzi",
      date: "2024 - 2025",
      skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Git y GitHub",
      issuer: "Platzi",
      date: "2023",
      skills: ["Control de versiones", "Colaboración", "CI/CD"],
    },
    {
      title: "Scrum Master",
      issuer: "Platzi",
      date: "2023",
      skills: ["Metodologías ágiles", "Gestión de proyectos", "Facilitación"],
    },
    {
      title: "React.js",
      issuer: "Platzi",
      date: "2024",
      skills: ["Hooks", "Context API", "Redux", "React Router"],
    },
    {
      title: "Vue.js y Pinia",
      issuer: "Platzi",
      date: "2024",
      skills: ["Composition API", "Gestión de estado", "Vue Router"],
    },
    {
      title: "Flutter y Kotlin",
      issuer: "Platzi",
      date: "2024",
      skills: ["Desarrollo móvil", "UI/UX", "Gestión de estado"],
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
    <section id="education" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Educación y Certificaciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Mi formación académica, certificaciones y cursos en el campo de la tecnología y el desarrollo de software.
          </motion.p>
        </div>

        <Tabs defaultValue="education" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> Educación Formal
              </TabsTrigger>
              <TabsTrigger value="certifications" className="flex items-center gap-2">
                <Award className="h-4 w-4" /> Cursos y Certificaciones
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="education">
            <motion.div
              ref={ref}
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="grid md:grid-cols-2 gap-6"
            >
              {educationItems.map((edu, index) => (
                <motion.div key={index} variants={item} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary hover:bg-blue-50/50 dark:hover:bg-blue-500/10 hover:border-blue-400 dark:hover:border-blue-400 group">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{edu.period}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                      <CardTitle className="flex items-start gap-2">
                        <GraduationCap className="h-5 w-5 text-primary mt-1 flex-shrink-0 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                        <span>{edu.degree}</span>
                      </CardTitle>
                      <CardDescription className="font-medium">{edu.institution}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-3">{edu.description}</p>
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-medium">{edu.certificate}</span>
                      </div>
                      <div className="flex gap-2">
                        <a href={edu.certificateUrl} download>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="h-3.5 w-3.5" /> Descargar
                          </Button>
                        </a>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="secondary" size="sm" className="gap-1">
                              <Eye className="h-3.5 w-3.5" /> Previsualizar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Previsualización del Certificado</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 overflow-auto max-h-[60vh]">
                              <iframe
                                src={edu.certificateUrl}
                                className="w-full h-[60vh] border rounded-md"
                                title={`Previsualización de ${edu.certificate}`}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="certifications">
            <motion.div
              ref={ref}
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div key={index} variants={item} whileHover={{ y: -5, transition: { duration: 0.3 } }}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>{cert.date}</span>
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary dark:text-blue-400 flex-shrink-0" />
                        <span>{cert.title}</span>
                      </CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-primary/5 text-primary dark:text-blue-300 hover:bg-primary/10"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 p-6 bg-muted/30 rounded-xl border text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Aprendizaje Continuo</h3>
              </div>
              <p className="text-muted-foreground">
                Constantemente actualizo mis conocimientos a través de cursos, documentación y proyectos prácticos para
                mantenerme al día con las últimas tecnologías y mejores prácticas en desarrollo de software.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

