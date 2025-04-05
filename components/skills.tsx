"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import TechIcon from "./tech-icons"
import { Progress } from "@/components/ui/progress"
import { LayoutGrid, List, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // "grid" or "list"
  const [showAllSkills, setShowAllSkills] = useState(false)

  const skills = [
    { name: "JavaScript", icon: <TechIcon name="JavaScript" />, category: "language", proficiency: 95 },
    { name: "Python", icon: <TechIcon name="Python" />, category: "language", proficiency: 70 },
    { name: "TypeScript", icon: <TechIcon name="TypeScript" />, category: "language", proficiency: 90 },

    { name: "React.js", icon: <TechIcon name="React.js" />, category: "frontend", proficiency: 100 },
    { name: "Vue.js", icon: <TechIcon name="Vue.js" />, category: "frontend", proficiency: 95 },
    { name: "Next.js", icon: <TechIcon name="Next.js" />, category: "frontend", proficiency: 100 },
    { name: "HTML5", icon: <TechIcon name="HTML5" />, category: "frontend", proficiency: 100 },
    { name: "CSS3", icon: <TechIcon name="CSS3" />, category: "frontend", proficiency: 100 },
    { name: "Tailwind CSS", icon: <TechIcon name="TailwindCSS" />, category: "frontend", proficiency: 100 },
    { name: "Bootstrap", icon: <TechIcon name="Bootstrap" />, category: "frontend", proficiency: 85 },
    { name: "Angular", icon: <TechIcon name="Angular" />, category: "frontend", proficiency: 70 },

    { name: "Node.js", icon: <TechIcon name="Node.js" />, category: "backend", proficiency: 90 },
    { name: "Express.js", icon: <TechIcon name="Express.js" />, category: "backend", proficiency: 85 },

    { name: "MongoDB", icon: <TechIcon name="MongoDB" />, category: "database", proficiency: 85 },
    { name: "MySQL", icon: <TechIcon name="MySQL" />, category: "database", proficiency: 60 },

    { name: "Git", icon: <TechIcon name="Git" />, category: "tool", proficiency: 90 },
    { name: "Azure", icon: <TechIcon name="Azure" />, category: "tool", proficiency: 70 },

    { name: "Scrum", icon: <TechIcon name="Scrum" />, category: "methodology", proficiency: 90 },
  ]

  const categories = [
    { id: "all", name: "Todas" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "language", name: "Lenguajes" },
    { id: "database", name: "Bases de Datos" },
    { id: "tool", name: "Herramientas" },
    { id: "methodology", name: "Metodologías" },
  ]

  const getFilteredSkills = () => {
    // Primero filtramos por categoría
    const categoryFiltered =
      activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

    // Si estamos en vista de lista y no se está mostrando todas las habilidades, mostramos solo las principales
    if (viewMode === "list" && !showAllSkills) {
      const mainSkills = [
        "JavaScript",
        "TypeScript",
        "React.js",
        "Vue.js",
        "Next.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Node.js",
      ]
      return categoryFiltered.filter((skill) => mainSkills.includes(skill.name))
    }

    // En vista de cuadrícula o si showAllSkills es true, mostramos todas
    return categoryFiltered
  }

  const filteredSkills = getFilteredSkills()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.5,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="skills" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Habilidades Técnicas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Estas son las tecnologías y herramientas con las que trabajo para crear soluciones web modernas y
            eficientes.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 flex flex-col items-center space-y-4"
        >
          <div className="flex justify-center flex-wrap gap-2 mb-4 px-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                  activeCategory === category.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-primary/20"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setViewMode("grid")}
              variant="outline"
              size="sm"
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted hover:bg-primary/20"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Vista Cuadrícula
            </Button>
            <Button
              onClick={() => setViewMode("list")}
              variant="outline"
              size="sm"
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted hover:bg-primary/20"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Vista Lista
            </Button>
          </div>
        </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key={`grid-view-${activeCategory}`}
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6"
          >
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  custom={index}
                  variants={item}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="flex flex-col items-center justify-center p-3 sm:p-6 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all hover:bg-blue-50/50 dark:hover:bg-blue-500/10 group"
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2, type: "spring", stiffness: 400 },
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary mb-2 sm:mb-4 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="font-medium text-center text-xs sm:text-sm">{skill.name}</h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key={`list-view-${activeCategory}-${showAllSkills ? 'all' : 'main'}`}
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  custom={index}
                  variants={item}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="flex items-center p-3 sm:p-4 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all hover:bg-blue-50/50 dark:hover:bg-blue-500/10 group"
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2, type: "spring", stiffness: 400 },
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary mr-3 sm:mr-4 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm sm:text-base">{skill.name}</h3>
                    <motion.div
                      className="mt-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Progress value={skill.proficiency} className="h-1.5 sm:h-2" />
                    </motion.div>
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="text-xs sm:text-sm font-medium text-primary group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {skill.proficiency}%
                  </motion.span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Botón "Ver todas" ahora está después de las habilidades */}
            {viewMode === "list" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center mt-8"
              >
                <Button
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  variant="outline"
                  size="sm"
                  className="rounded-full px-6 py-2 transition-all duration-300 border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-primary dark:text-blue-400 shadow-sm hover:shadow"
                >
                  {showAllSkills ? (
                    <span className="flex items-center gap-2">
                      <ChevronUp className="h-4 w-4" /> Mostrar principales
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4" /> Ver todas las habilidades
                    </span>
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
)
}

