"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const certifications = [
    {
      title: "Full Stack Web Developer",
      issuer: "Henry Bootcamp",
      date: "Diciembre 2023",
      credential: "https://certificates.soyhenry.com/cert?id=12345",
      skills: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL"],
    },
    {
      title: "React - The Complete Guide",
      issuer: "Udemy",
      date: "Octubre 2023",
      credential: "https://udemy-certificate.com/12345",
      skills: ["React", "Redux", "Hooks", "Context API"],
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "Agosto 2023",
      credential: "https://freecodecamp.org/certification/12345",
      skills: ["JavaScript", "Algorithms", "Data Structures"],
    },
    {
      title: "Node.js Developer",
      issuer: "Platzi",
      date: "Junio 2023",
      credential: "https://platzi.com/p/username/curso/12345",
      skills: ["Node.js", "Express", "MongoDB", "API REST"],
    },
  ]

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
    <section id="certifications" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Certificaciones
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Certificaciones y cursos que he completado para mejorar mis habilidades y conocimientos.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={item} whileHover={{ y: -5, transition: { duration: 0.3 } }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-500/10">
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
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                {/* CardFooter with "Ver credencial" button has been removed */}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

