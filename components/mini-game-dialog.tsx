"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Trophy,
  Clock,
  RotateCcw,
  Brain,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Rocket,
  Medal,
  Star,
  Zap,
  User,
  Code,
  Smile,
  ChevronRight,
  PartyPopper,
  GraduationCap,
  Laptop,
  Building,
} from "lucide-react"
import confetti from "canvas-confetti"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Define quiz question types
type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "personal" | "technical" | "experience" | "education" | "freelance" | "fun"
  difficulty: "easy" | "medium" | "hard"
}

export default function MiniGameDialog({ open, onOpenChange }) {
  // Game state
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState<number>(0)
  const [showExplanation, setShowExplanation] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false) // Desactivado por defecto
  const [showCelebration, setShowCelebration] = useState<boolean>(false)
  const [category, setCategory] = useState<
    "all" | "personal" | "technical" | "experience" | "education" | "freelance" | "fun"
  >("all")
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all")
  const [quizStarted, setQuizStarted] = useState<boolean>(false)
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([])
  const [bestScores, setBestScores] = useState({
    all: { score: 0, time: Number.POSITIVE_INFINITY },
    personal: { score: 0, time: Number.POSITIVE_INFINITY },
    technical: { score: 0, time: Number.POSITIVE_INFINITY },
    experience: { score: 0, time: Number.POSITIVE_INFINITY },
    education: { score: 0, time: Number.POSITIVE_INFINITY },
    freelance: { score: 0, time: Number.POSITIVE_INFINITY },
    fun: { score: 0, time: Number.POSITIVE_INFINITY },
  })
  // Añadir un nuevo estado para almacenar las respuestas del usuario
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  // Estado para controlar la notificación de nuevo récord
  const [showNewRecordNotification, setShowNewRecordNotification] = useState<boolean>(false)
  // Estado para controlar la animación del círculo de porcentaje
  const [animateCircle, setAnimateCircle] = useState<boolean>(false)
  // Referencia para el tiempo de animación del círculo
  const circleAnimationTimeout = useRef<NodeJS.Timeout | null>(null)
  // Estado para el mensaje de nuevo récord
  const [newRecordMessage, setNewRecordMessage] = useState<string>("")

  // Quiz questions - Actualizadas según el CV proporcionado
  const quizQuestions: QuizQuestion[] = [
    // Preguntas sobre información personal
    {
      id: 1,
      question: "¿Cuál es mi especialidad principal como desarrollador?",
      options: ["Frontend Developer", "Backend Developer", "Full-Stack Developer", "DevOps Engineer"],
      correctAnswer: 2,
      explanation:
        "Soy un desarrollador Full-Stack con más de 3 años de experiencia en el desarrollo de software y diseño web, trabajando tanto en el frontend como en el backend de las aplicaciones.",
      category: "personal",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "¿En qué ciudad de Colombia estoy ubicado?",
      options: ["Bogotá", "Medellín", "Bucaramanga", "Cali"],
      correctAnswer: 2,
      explanation: "Estoy ubicado en Bucaramanga, Colombia, donde he desarrollado mi carrera profesional.",
      category: "personal",
      difficulty: "easy",
    },
    {
      id: 3,
      question: "¿Cuál es mi enfoque principal como desarrollador según mi perfil profesional?",
      options: [
        "Diseño de interfaces de usuario",
        "Seguridad, optimización y escalabilidad",
        "Marketing digital",
        "Administración de bases de datos",
      ],
      correctAnswer: 1,
      explanation:
        "Mi perfil profesional destaca mi enfoque en la seguridad, optimización y escalabilidad de las soluciones tecnológicas que desarrollo.",
      category: "personal",
      difficulty: "medium",
    },

    // Preguntas sobre experiencia profesional
    {
      id: 4,
      question: "¿En qué empresa trabajé como desarrollador Full-Stack entre abril y diciembre de 2024?",
      options: ["Empresa Rifas", "Empresa de Transporte", "Trascender Global", "Tesla Lift"],
      correctAnswer: 2,
      explanation:
        "Trabajé como desarrollador Full-Stack en Trascender Global de abril a diciembre de 2024, desarrollando interfaces con React, Next.js y Tailwind CSS.",
      category: "experience",
      difficulty: "medium",
    },
    {
      id: 5,
      question: "¿Qué herramienta de gestión de tareas utilicé en Trascender Global?",
      options: ["Trello", "Jira", "Azure DevOps", "Asana"],
      correctAnswer: 2,
      explanation:
        "En Trascender Global utilicé Azure DevOps para la gestión de tareas y sprints bajo la metodología Scrum.",
      category: "experience",
      difficulty: "medium",
    },
    {
      id: 6,
      question: "¿Qué tecnologías de frontend utilicé en Empresa Rifas?",
      options: ["React y Material UI", "Angular y Bootstrap", "Vue 3 y Quasar", "Svelte y Tailwind CSS"],
      correctAnswer: 2,
      explanation: "En Empresa Rifas implementé funcionalidades de compra y gestión de usuarios con Vue 3 y Quasar.",
      category: "experience",
      difficulty: "medium",
    },
    {
      id: 7,
      question: "¿Qué pasarela de pago integré en el proyecto de Empresa Rifas?",
      options: ["PayPal", "Stripe", "Wompi", "MercadoPago"],
      correctAnswer: 2,
      explanation:
        "En el proyecto de Empresa Rifas integré la pasarela de pago Wompi para procesar las transacciones de compra.",
      category: "experience",
      difficulty: "hard",
    },
    {
      id: 8,
      question: "¿Durante qué período trabajé en la Empresa de Transporte?",
      options: [
        "Abril 2024 - Diciembre 2024",
        "Julio 2023 - Febrero 2024",
        "Enero 2023 - Octubre 2023",
        "Febrero 2025 - Marzo 2025",
      ],
      correctAnswer: 2,
      explanation:
        "Trabajé en la Empresa de Transporte desde enero hasta octubre de 2023, desarrollando una plataforma de gestión de transporte.",
      category: "experience",
      difficulty: "medium",
    },

    // Preguntas sobre experiencia freelancer
    {
      id: 9,
      question: "¿Cuál de estos proyectos freelancer desarrollé entre octubre 2024 y febrero 2025?",
      options: [
        "Tesla Lift",
        "LaListaWBC.com",
        "Asesorías en Desarrollo de Software",
        "Aplicación de gestión de inventario",
      ],
      correctAnswer: 1,
      explanation:
        "Desarrollé LaListaWBC.com como freelancer entre octubre 2024 y febrero 2025 para un empresario en Bucaramanga.",
      category: "freelance",
      difficulty: "medium",
    },
    {
      id: 10,
      question: "¿Qué servicio en la nube utilicé para gestionar multimedia en el proyecto LaListaWBC.com?",
      options: ["AWS S3", "Google Cloud Storage", "Cloudinary", "Firebase Storage"],
      correctAnswer: 2,
      explanation: "En el proyecto LaListaWBC.com implementé Cloudinary para la gestión de contenido multimedia.",
      category: "freelance",
      difficulty: "hard",
    },
    {
      id: 11,
      question: "¿En qué país se encontraba el equipo al que brindé asesorías en desarrollo de software?",
      options: ["Colombia", "México", "Chile", "Perú"],
      correctAnswer: 3,
      explanation:
        "Brindé una serie de 5 sesiones de asesoría a un equipo profesional de desarrolladores en Perú durante diciembre de 2024.",
      category: "freelance",
      difficulty: "hard",
    },
    {
      id: 12,
      question: "¿Qué tipo de aplicación era Tesla Lift?",
      options: ["Aplicación web", "Aplicación de escritorio", "Aplicación móvil", "Plugin para navegador"],
      correctAnswer: 2,
      explanation:
        "Tesla Lift era una aplicación móvil para la gestión de servicios de ascensores, desarrollada con React Native y Expo.",
      category: "freelance",
      difficulty: "medium",
    },
    {
      id: 13,
      question: "¿Qué tecnología utilicé para el backend de Tesla Lift?",
      options: ["Express.js", "Django", "Laravel", "Next.js"],
      correctAnswer: 3,
      explanation:
        "Para el backend de la aplicación Tesla Lift utilicé Next.js junto con una base de datos en Supabase.",
      category: "freelance",
      difficulty: "hard",
    },

    // Preguntas sobre habilidades técnicas
    {
      id: 14,
      question: "¿Cuál de estos frameworks de frontend NO aparece en mi lista de habilidades técnicas?",
      options: ["React.js", "Next.js", "Vue.js", "Angular"],
      correctAnswer: 3,
      explanation:
        "Angular no aparece en mi lista de habilidades técnicas. Mis habilidades de frontend incluyen React.js, Next.js, Vue.js, Tailwind CSS y Quasar.",
      category: "technical",
      difficulty: "medium",
    },
    {
      id: 15,
      question: "¿Qué tecnología de base de datos NoSQL utilizo según mi CV?",
      options: ["MongoDB", "Firebase", "DynamoDB", "Cassandra"],
      correctAnswer: 0,
      explanation:
        "MongoDB es la tecnología de base de datos NoSQL que utilizo según mi CV, junto con MySQL como base de datos relacional.",
      category: "technical",
      difficulty: "medium",
    },
    {
      id: 16,
      question: "¿Cuál de estas herramientas NO aparece en mi lista de habilidades técnicas?",
      options: ["Git", "Azure DevOps", "Jira", "Docker"],
      correctAnswer: 3,
      explanation:
        "Docker no aparece en mi lista de habilidades técnicas. Mis herramientas incluyen Git, Azure DevOps, Jira, Postman y Cloudinary.",
      category: "technical",
      difficulty: "hard",
    },
    {
      id: 17,
      question: "¿Qué framework de CSS utilizo principalmente según mi CV?",
      options: ["Bootstrap", "Tailwind CSS", "Material UI", "Styled Components"],
      correctAnswer: 1,
      explanation:
        "Tailwind CSS es el framework de CSS que utilizo principalmente según mi CV, junto con Quasar para aplicaciones Vue.",
      category: "technical",
      difficulty: "easy",
    },

    // Preguntas sobre educación
    {
      id: 18,
      question: "¿Qué carrera estudié en el SENA?",
      options: [
        "Ingeniería de Software",
        "Análisis y Desarrollo de Software",
        "Programación de Aplicaciones Móviles",
        "Diseño Web",
      ],
      correctAnswer: 1,
      explanation: "Estudié Análisis y Desarrollo de Software en el SENA entre junio de 2022 y julio de 2024.",
      category: "education",
      difficulty: "medium",
    },
    {
      id: 19,
      question: "¿En qué institución realicé mi bachillerato con técnico en electrónica?",
      options: ["SENA", "Colegio San José de Guanentá", "Instituto Técnico Superior", "Colegio Santander"],
      correctAnswer: 1,
      explanation:
        "Realicé mi bachillerato con técnico en electrónica en el Colegio San José de Guanentá, graduándome en 2021.",
      category: "education",
      difficulty: "hard",
    },
    {
      id: 20,
      question: "¿Cuál de estos cursos NO he tomado en Platzi según mi CV?",
      options: ["Full Stack Developer", "Scrum Master", "React.js", "AWS Cloud Practitioner"],
      correctAnswer: 3,
      explanation:
        "AWS Cloud Practitioner no aparece en mi lista de cursos de Platzi. He tomado cursos de Full Stack Developer, Git y GitHub, Scrum Master, React.js, Vue.js, Pinia, Flutter y Kotlin.",
      category: "education",
      difficulty: "medium",
    },

    // Preguntas adicionales sobre experiencia y habilidades
    {
      id: 21,
      question: "¿Cuántos años de experiencia tengo como desarrollador según mi CV?",
      options: ["2 años", "3 años", "4 años", "5 años"],
      correctAnswer: 1,
      explanation: "Según mi CV, tengo más de 3 años de experiencia en el desarrollo de software y diseño web.",
      category: "personal",
      difficulty: "easy",
    },
    {
      id: 22,
      question: "¿Qué metodologías ágiles conozco según mi CV?",
      options: ["Solo Scrum", "Solo Kanban", "Scrum y Kanban", "Scrum, Kanban y XP"],
      correctAnswer: 2,
      explanation:
        "Según mi CV, conozco las metodologías ágiles Scrum y Kanban, que aparecen tanto en mi experiencia profesional como en mis habilidades.",
      category: "technical",
      difficulty: "easy",
    },
    {
      id: 23,
      question: "¿En qué plataforma se desplegó la aplicación móvil Tesla Lift?",
      options: ["Solo App Store", "Solo Play Store", "App Store y Play Store", "Microsoft Store"],
      correctAnswer: 2,
      explanation:
        "La aplicación móvil Tesla Lift fue desplegada tanto en App Store como en Play Store, según mi experiencia freelancer.",
      category: "freelance",
      difficulty: "medium",
    },
    {
      id: 24,
      question: "¿Qué tecnología utilicé para el desarrollo de aplicaciones móviles según mi CV?",
      options: ["Flutter", "React Native", "Ambas tecnologías", "Ninguna de las anteriores"],
      correctAnswer: 2,
      explanation:
        "Según mi CV, tengo experiencia con ambas tecnologías: React Native (usado en Tesla Lift) y Flutter (mencionado en mis cursos de Platzi).",
      category: "technical",
      difficulty: "medium",
    },
    {
      id: 25,
      question: "¿Qué servicio de hosting utilicé para el proyecto LaListaWBC.com?",
      options: ["Netlify", "Vercel", "Hostinger", "AWS Amplify"],
      correctAnswer: 2,
      explanation:
        "Para el proyecto LaListaWBC.com, configuré el dominio y hosting en Hostinger, según mi experiencia freelancer.",
      category: "freelance",
      difficulty: "hard",
    },

    // Preguntas divertidas
    {
      id: 26,
      question: "Si tuviera que elegir un superhéroe de programación, ¿cuál sería?",
      options: ["Captain JavaScript", "React-Man", "Vue-lverine", "Doctor Node"],
      correctAnswer: 1,
      explanation:
        "¡React-Man sería mi superhéroe de programación! Con el poder de los componentes reutilizables y el estado virtual DOM.",
      category: "fun",
      difficulty: "easy",
    },
    {
      id: 27,
      question: "¿Qué haría primero si encontrara un bug crítico en producción?",
      options: [
        "Entrar en pánico",
        "Culpar al desarrollador anterior",
        "Investigar, aislar y corregir",
        "Fingir que no existe",
      ],
      correctAnswer: 2,
      explanation:
        "Lo primero sería investigar, aislar y corregir el bug. La resolución de problemas es una de mis fortalezas según mi perfil profesional.",
      category: "fun",
      difficulty: "easy",
    },
    {
      id: 28,
      question: "¿Cuál sería mi respuesta a '¿Está listo el proyecto?' cuando falta una semana para la entrega?",
      options: [
        "Sí, por supuesto (mientras sudo nerviosamente)",
        "Necesitamos hablar... (con cara seria)",
        "Estamos en el cronograma previsto, con algunos ajustes pendientes",
        "¿Qué proyecto?",
      ],
      correctAnswer: 2,
      explanation:
        "Mi respuesta sería profesional y honesta: 'Estamos en el cronograma previsto, con algunos ajustes pendientes'. La comunicación clara es esencial en la gestión de proyectos.",
      category: "fun",
      difficulty: "medium",
    },
    {
      id: 29,
      question: "Si mi código fuera una película, ¿cuál sería?",
      options: ["Misión Imposible", "El Código Enigma", "La Red Social", "Matrix"],
      correctAnswer: 1,
      explanation:
        "Mi código sería 'El Código Enigma': estructurado, eficiente y resolviendo problemas complejos de manera elegante.",
      category: "fun",
      difficulty: "easy",
    },
    {
      id: 30,
      question: "¿Qué animal de programación sería?",
      options: [
        "Búho (trabaja de noche)",
        "Zorro (astuto con los algoritmos)",
        "Pulpo (maneja múltiples tecnologías)",
        "Tortuga (código lento pero seguro)",
      ],
      correctAnswer: 2,
      explanation:
        "Sería un pulpo programador, capaz de manejar múltiples tecnologías simultáneamente, desde frontend hasta backend, como un verdadero desarrollador Full-Stack.",
      category: "fun",
      difficulty: "easy",
    },
  ]

  // Filter questions based on category and difficulty
  useEffect(() => {
    let questions = [...quizQuestions]

    if (category !== "all") {
      questions = questions.filter((q) => q.category === category)
    }

    if (difficulty !== "all") {
      questions = questions.filter((q) => q.difficulty === difficulty)
    }

    // Shuffle questions
    questions = questions.sort(() => 0.5 - Math.random())

    // Limit to 10 questions
    questions = questions.slice(0, 10)

    setFilteredQuestions(questions)
    setCurrentQuestion(0)
    setScore(0)
    setTimer(0)
    setGameCompleted(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
  }, [category, difficulty])

  // Initialize game
  // Modificar la función initializeGame para reiniciar userAnswers
  const initializeGame = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setTimer(0)
    setGameCompleted(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
    setCategory("all")
    setDifficulty("all")
    setUserAnswers([])
    setShowNewRecordNotification(false)
    setAnimateCircle(false)

    // Limpiar el timeout si existe
    if (circleAnimationTimeout.current) {
      clearTimeout(circleAnimationTimeout.current)
      circleAnimationTimeout.current = null
    }

    // Reset filtered questions
    let questions = [...quizQuestions]
    questions = questions.sort(() => 0.5 - Math.random())
    questions = questions.slice(0, 10)
    setFilteredQuestions(questions)
  }

  // Start quiz
  // Modificar la función startQuiz para inicializar userAnswers
  const startQuiz = () => {
    setQuizStarted(true)
    setGameStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setTimer(0)
    setGameCompleted(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
    setUserAnswers(Array(filteredQuestions.length).fill(null))
  }

  // Handle answer selection
  // Modificar la función handleAnswerSelect para guardar la respuesta del usuario
  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || gameCompleted) return

    setSelectedAnswer(answerIndex)

    // Guardar la respuesta del usuario
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = answerIndex
    setUserAnswers(newUserAnswers)

    const isCorrect = answerIndex === filteredQuestions[currentQuestion].correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  // Move to next question
  const nextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)

    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed
      setGameCompleted(true)
      setShowCelebration(true)
      setGameStarted(false)

      // Iniciar la animación del círculo después de un breve retraso
      setTimeout(() => {
        setAnimateCircle(true)
      }, 300)

      // Update best scores
      const categoryKey = category as keyof typeof bestScores
      const currentScore = { score, time: timer }
      const currentBest = bestScores[categoryKey]

      const isNewRecord =
        currentScore.score > currentBest.score ||
        (currentScore.score === currentBest.score && currentScore.time < currentBest.time)

      if (isNewRecord) {
        const newBestScores = { ...bestScores }
        newBestScores[categoryKey] = currentScore
        setBestScores(newBestScores)
        localStorage.setItem("quizBestScores", JSON.stringify(newBestScores))

        // Trigger confetti for new best score
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#60a5fa", "#93c5fd"],
        })

        // Determinar el mensaje de nuevo récord
        const recordMessage =
          currentScore.score > currentBest.score ? "¡Nuevo récord de puntuación!" : "¡Nuevo récord de tiempo!"

        setNewRecordMessage(recordMessage)

        // Mostrar la notificación de nuevo récord
        setShowNewRecordNotification(true)

        // Ocultar la notificación después de 4 segundos
        setTimeout(() => {
          setShowNewRecordNotification(false)
        }, 4000)
      }
    }
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameCompleted])

  // Load best scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem("quizBestScores")
    if (savedScores) {
      setBestScores(JSON.parse(savedScores))
    }
  }, [])

  // Initialize game on first render
  useEffect(() => {
    initializeGame()
  }, [])

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Reset game when dialog opens
  useEffect(() => {
    if (open) {
      initializeGame()
    }
  }, [open])

  // Handle dialog close
  const handleCloseDialog = () => {
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  // Get category icon
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "personal":
        return <User className="h-4 w-4" />
      case "technical":
        return <Code className="h-4 w-4" />
      case "experience":
        return <Building className="h-4 w-4" />
      case "education":
        return <GraduationCap className="h-4 w-4" />
      case "freelance":
        return <Laptop className="h-4 w-4" />
      case "fun":
        return <Smile className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  // Get category name
  const getCategoryName = (cat: string) => {
    switch (cat) {
      case "personal":
        return "Personal"
      case "technical":
        return "Técnico"
      case "experience":
        return "Experiencia"
      case "education":
        return "Educación"
      case "freelance":
        return "Freelance"
      case "fun":
        return "Diversión"
      default:
        return "General"
    }
  }

  // Get difficulty color
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "text-green-500 dark:text-green-400"
      case "medium":
        return "text-blue-500 dark:text-blue-400"
      case "hard":
        return "text-red-500 dark:text-red-400"
      default:
        return ""
    }
  }

  // Calcular el color del círculo de porcentaje basado en la puntuación
  const getScoreColor = () => {
    const percentage = (score / filteredQuestions.length) * 100
    if (percentage >= 80) return "text-green-500 dark:text-green-400"
    if (percentage >= 60) return "text-blue-500 dark:text-blue-400"
    if (percentage >= 40) return "text-yellow-500 dark:text-yellow-400"
    return "text-red-500 dark:text-red-400"
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 rounded-xl border-2 border-primary/20 dark:border-blue-800/50 shadow-lg">
          {/* Game header */}
          <div className="sticky top-0 z-10 bg-background border-b p-4 rounded-t-xl bg-gradient-to-r from-background to-muted/30">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Brain className="h-5 w-5 text-primary dark:text-blue-400" />
                  ¡Conóceme Mejor!
                </DialogTitle>
                <DialogDescription>Pon a prueba cuánto sabes sobre mí y mi experiencia profesional</DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
                    onClick={handleCloseDialog}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>

            {quizStarted && (
              <div className="flex justify-between items-center mt-4 px-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-primary/5 dark:bg-blue-500/10 rounded-full px-3 py-1 shadow-sm"
                  >
                    <Clock className="h-3 w-3" /> {formatTime(timer)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-primary/5 dark:bg-blue-500/10 rounded-full px-3 py-1 shadow-sm"
                  >
                    <Trophy className="h-3 w-3" /> {score}/{filteredQuestions.length} puntos
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => initializeGame()}
                  title="Reiniciar juego"
                  className="gap-1 text-xs rounded-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                >
                  <RotateCcw className="h-3 w-3" /> Reiniciar
                </Button>
              </div>
            )}
          </div>

          {/* Game content */}
          <div className="p-4">
            {!quizStarted ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold">¡Bienvenido al Quiz!</h3>
                  <p className="text-muted-foreground">
                    Responde preguntas sobre mí, mi experiencia y mis habilidades para ver cuánto me conoces.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Categoría:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        variant={category === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory("all")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <Brain className="h-3.5 w-3.5 mr-1" /> Todas
                      </Button>
                      <Button
                        variant={category === "personal" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory("personal")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <User className="h-3.5 w-3.5 mr-1" /> Personal
                      </Button>
                      <Button
                        variant={category === "technical" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory("technical")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <Code className="h-3.5 w-3.5 mr-1" /> Técnico
                      </Button>
                      <Button
                        variant={category === "experience" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory("experience")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <Building className="h-3.5 w-3.5 mr-1" /> Experiencia
                      </Button>
                      <Button
                        variant={category === "education" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory("education")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <GraduationCap className="h-3.5 w-3.5 mr-1" /> Educación
                      </Button>
                      <Button
                        variant={category === "freelance" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory("freelance")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <Laptop className="h-3.5 w-3.5 mr-1" /> Freelance
                      </Button>
                      <Button
                        variant={category === "fun" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCategory("fun")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        <Smile className="h-3.5 w-3.5 mr-1" /> Diversión
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Dificultad:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        variant={difficulty === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty("all")}
                        className="text-xs rounded-full transition-all duration-300 hover:scale-105"
                      >
                        Todas
                      </Button>
                      <Button
                        variant={difficulty === "easy" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty("easy")}
                        className={`text-xs rounded-full transition-all duration-300 hover:scale-105 ${
                          difficulty === "easy"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "text-green-600 dark:text-green-400 border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                        }`}
                      >
                        Fácil
                      </Button>
                      <Button
                        variant={difficulty === "medium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty("medium")}
                        className={`text-xs rounded-full transition-all duration-300 hover:scale-105 ${
                          difficulty === "medium"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        }`}
                      >
                        Media
                      </Button>
                      <Button
                        variant={difficulty === "hard" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty("hard")}
                        className={`text-xs rounded-full transition-all duration-300 hover:scale-105 ${
                          difficulty === "hard"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        }`}
                      >
                        Difícil
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={startQuiz}
                    className="gap-2 px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary"
                    disabled={filteredQuestions.length === 0}
                  >
                    <Rocket className="h-5 w-5" /> ¡Comenzar Quiz!
                  </Button>
                </div>

                {filteredQuestions.length === 0 && (
                  <p className="text-center text-red-500 dark:text-red-400 text-sm">
                    No hay preguntas disponibles con estos filtros. Por favor, selecciona otra categoría o dificultad.
                  </p>
                )}

                {/* Best scores */}
                <div className="border-t pt-4 mt-2">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2 justify-center">
                    <Trophy className="h-4 w-4 text-primary dark:text-blue-400" /> Mejores puntuaciones
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    {Object.entries(bestScores)
                      .filter(([key]) => key === "all" || key === category)
                      .map(([cat, score]) => {
                        return (
                          <div
                            key={cat}
                            className="p-3 rounded-lg border bg-muted/20 hover:bg-primary/5 transition-colors duration-200 shadow-sm hover:shadow"
                          >
                            <div className="font-medium mb-1 capitalize flex items-center gap-1">
                              {getCategoryIcon(cat)}
                              <span className="ml-1">{getCategoryName(cat)}</span>
                            </div>
                            {score.score !== 0 ? (
                              <>
                                <div className="text-muted-foreground flex items-center gap-1">
                                  <Trophy className="h-3 w-3 text-yellow-500" /> {score.score} puntos
                                </div>
                                <div className="text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-blue-500" /> {formatTime(score.time)}
                                </div>
                              </>
                            ) : (
                              <div className="text-muted-foreground">Sin récord</div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            ) : !gameCompleted ? (
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      Pregunta {currentQuestion + 1} de {filteredQuestions.length}
                    </span>
                    <span>{Math.round(((currentQuestion + 1) / filteredQuestions.length) * 100)}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-primary dark:bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="flex justify-between items-center mb-4">
                  <Badge
                    variant="outline"
                    className="capitalize flex items-center gap-1 bg-primary/5 dark:bg-blue-500/10 rounded-full px-3 py-1 shadow-sm"
                  >
                    {getCategoryIcon(filteredQuestions[currentQuestion].category)}
                    <span className="ml-1">{getCategoryName(filteredQuestions[currentQuestion].category)}</span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 shadow-sm ${
                      filteredQuestions[currentQuestion].difficulty === "easy"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300"
                        : filteredQuestions[currentQuestion].difficulty === "medium"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300"
                    }`}
                  >
                    {filteredQuestions[currentQuestion].difficulty === "easy"
                      ? "Fácil"
                      : filteredQuestions[currentQuestion].difficulty === "medium"
                        ? "Media"
                        : "Difícil"}
                  </Badge>
                </div>

                <h3 className="text-xl font-medium">{filteredQuestions[currentQuestion].question}</h3>

                <div className="space-y-3">
                  {filteredQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedAnswer === null
                          ? "hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                          : selectedAnswer === index
                            ? index === filteredQuestions[currentQuestion].correctAnswer
                              ? "bg-green-100 dark:bg-green-900/30 border-green-500 shadow-md"
                              : "bg-red-100 dark:bg-red-900/30 border-red-500 shadow-md"
                            : index === filteredQuestions[currentQuestion].correctAnswer && showExplanation
                              ? "bg-green-100 dark:bg-green-900/30 border-green-500 shadow-md"
                              : "opacity-60"
                      }`}
                      disabled={selectedAnswer !== null}
                      whileHover={selectedAnswer === null ? { scale: 1.02, y: -2 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium ${
                            selectedAnswer === null
                              ? "bg-primary/10 text-primary"
                              : selectedAnswer === index
                                ? index === filteredQuestions[currentQuestion].correctAnswer
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                                : index === filteredQuestions[currentQuestion].correctAnswer && showExplanation
                                  ? "bg-green-500 text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium">{option}</span>

                        {selectedAnswer !== null && (
                          <>
                            {index === filteredQuestions[currentQuestion].correctAnswer && (
                              <ThumbsUp className="ml-auto h-5 w-5 text-green-500" />
                            )}
                            {selectedAnswer === index && index !== filteredQuestions[currentQuestion].correctAnswer && (
                              <ThumbsDown className="ml-auto h-5 w-5 text-red-500" />
                            )}
                          </>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 text-lg">Explicación:</h4>
                        <p className="text-blue-600 dark:text-blue-200 text-sm mt-2">
                          {filteredQuestions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                      <Button
                        onClick={nextQuestion}
                        className="gap-2 rounded-full shadow-sm hover:shadow transition-all duration-300 hover:scale-105"
                      >
                        {currentQuestion < filteredQuestions.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Results */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold">¡Quiz completado!</h3>
                  <p className="text-muted-foreground">
                    Has obtenido {score} de {filteredQuestions.length} puntos en {formatTime(timer)}
                  </p>

                  {/* Score percentage - Mejorado con animación */}
                  <div className="mt-6 mb-8 relative">
                    <div className="w-40 h-40 mx-auto">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                        {/* Círculo de fondo */}
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-muted-foreground/20"
                        />

                        {/* Círculo de progreso animado */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="264"
                          strokeDashoffset="264"
                          className={`${getScoreColor()} transform -rotate-90 origin-center`}
                          initial={{ strokeDashoffset: 264 }}
                          animate={{
                            strokeDashoffset: animateCircle ? 264 - (264 * score) / filteredQuestions.length : 264,
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            delay: 0.3,
                          }}
                        />

                        {/* Círculo decorativo */}
                        <circle
                          cx="50"
                          cy="50"
                          r="36"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="4 2"
                          className="text-primary/30 dark:text-blue-500/30"
                        />
                      </svg>

                      {/* Porcentaje en el centro */}
                      <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                          scale: animateCircle ? 1 : 0.5,
                          opacity: animateCircle ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <span className={`text-2xl font-bold ${getScoreColor()}`}>
                          {Math.round((score / filteredQuestions.length) * 100)}%
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">Puntuación</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Nuevo récord */}
                  {bestScores[category as keyof typeof bestScores].score === score && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                      className="mt-4 p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 flex items-center justify-center gap-2"
                    >
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium text-yellow-700 dark:text-yellow-300">
                        {bestScores[category as keyof typeof bestScores].time === timer
                          ? "¡Has establecido un nuevo récord!"
                          : "¡Has igualado tu mejor puntuación!"}
                      </span>
                    </motion.div>
                  )}

                  {/* Feedback based on score */}
                  <div className="p-4 rounded-lg bg-primary/10 dark:bg-blue-900/20">
                    {score === filteredQuestions.length ? (
                      <p className="flex items-center justify-center gap-2 font-medium text-primary dark:text-blue-400">
                        <Star className="h-5 w-5" /> ¡Perfecto! Me conoces muy bien.
                      </p>
                    ) : score >= filteredQuestions.length * 0.8 ? (
                      <p className="flex items-center justify-center gap-2 font-medium text-primary dark:text-blue-400">
                        <Medal className="h-5 w-5" /> ¡Excelente! Sabes mucho sobre mí.
                      </p>
                    ) : score >= filteredQuestions.length * 0.6 ? (
                      <p className="flex items-center justify-center gap-2 font-medium text-primary dark:text-blue-400">
                        <ThumbsUp className="h-5 w-5" /> ¡Muy bien! Conoces bastante sobre mí.
                      </p>
                    ) : score >= filteredQuestions.length * 0.4 ? (
                      <p className="flex items-center justify-center gap-2 font-medium text-primary dark:text-blue-400">
                        <Lightbulb className="h-5 w-5" /> No está mal, pero aún puedes conocerme mejor.
                      </p>
                    ) : (
                      <p className="flex items-center justify-center gap-2 font-medium text-primary dark:text-blue-400">
                        <Zap className="h-5 w-5" /> Parece que aún tienes mucho por descubrir sobre mí.
                      </p>
                    )}
                  </div>
                </div>

                {/* Question summary */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Resumen de preguntas:</h4>
                  <div className="space-y-3">
                    {filteredQuestions.map((question, index) => {
                      // Determinar si el usuario respondió correctamente a esta pregunta
                      const userAnswer = userAnswers[index]
                      const isCorrect = userAnswer === question.correctAnswer

                      return (
                        <Card
                          key={index}
                          className={`border-l-4 transition-all hover:shadow-md ${
                            isCorrect
                              ? "border-l-green-500 hover:border-green-600"
                              : "border-l-red-500 hover:border-red-600"
                          }`}
                        >
                          <CardHeader className="p-3 pb-0">
                            <div className="flex justify-between items-start gap-2">
                              <div className="text-sm font-medium">
                                {index + 1}. {question.question}
                              </div>
                              {isCorrect ? (
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 whitespace-nowrap"
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" /> Correcto
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 whitespace-nowrap"
                                >
                                  <ThumbsDown className="h-3 w-3 mr-1" /> Incorrecto
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="p-3 pt-2">
                            <div className="text-xs text-muted-foreground">
                              <span className="font-medium">Respuesta correcta:</span>{" "}
                              {question.options[question.correctAnswer]}
                            </div>
                            {!isCorrect && userAnswer !== null && (
                              <div className="text-xs text-red-500 dark:text-red-400 mt-1">
                                <span className="font-medium">Tu respuesta:</span> {question.options[userAnswer]}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <Button
                    onClick={() => initializeGame()}
                    className="gap-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <RotateCcw className="h-4 w-4" /> Jugar de nuevo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCloseDialog}
                    className="rounded-full transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  >
                    Cerrar
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

