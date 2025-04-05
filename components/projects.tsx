"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Code, Lightbulb, Send, Sparkles, Rocket, ArrowRight, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Projects() {
  const { toast } = useToast()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [suggestion, setSuggestion] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submittedSuggestion, setSubmittedSuggestion] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!suggestion.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor ingresa una sugerencia para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Guardar la sugerencia actual para mostrarla en el diálogo de confirmación
    setSubmittedSuggestion(suggestion)

    // Simulación de envío - en producción conectarías esto a un backend real
    setTimeout(() => {
      toast({
        title: "¡Sugerencia recibida!",
        description: "Gracias por tu idea. La tomaré en cuenta para futuros proyectos.",
      })
      setIsSubmitting(false)
      setShowConfirmation(true)
    }, 1000)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setSuggestion("")
    setEmail("")
  }

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
    <section id="projects" className="py-20 overflow-x-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Proyectos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Actualmente estoy trabajando en nuevos proyectos personales que pronto estarán disponibles.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={item}>
            <Card className="border-2 border-dashed border-primary/20 bg-primary/5 overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Rocket className="h-16 w-16 text-primary" />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="absolute inset-0 rounded-full bg-primary/20"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Proyectos en desarrollo
                  <Sparkles className="h-5 w-5 text-primary" />
                </h3>

                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Estoy trabajando en varios proyectos personales innovadores que combinarán las últimas tecnologías con
                  soluciones creativas. Pronto compartiré aquí mi portfolio actualizado con estos nuevos desarrollos.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    <Code className="h-4 w-4 text-primary" />
                    <span>Aplicaciones Web</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <span>Soluciones Innovadoras</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>Próximamente</span>
                  </div>
                </div>
              </CardContent>

              <div className="border-t border-primary/10">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-4 text-center">¿Tienes alguna sugerencia?</h4>
                  <p className="text-muted-foreground text-center mb-6">
                    Me encantaría escuchar tus ideas para futuros proyectos. Todas las sugerencias serán consideradas.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Textarea
                        placeholder="Comparte tu idea para un proyecto interesante..."
                        className="resize-none"
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Tu email (opcional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button type="submit" className="gap-2" disabled={isSubmitting}>
                        <Send className="h-4 w-4" />
                        {isSubmitting ? "Enviando..." : "Enviar sugerencia"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Diálogo de confirmación */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">¡Sugerencia enviada con éxito!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Gracias por compartir tu idea para un futuro proyecto. Tu sugerencia ha sido recibida y será considerada.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/50 p-4 rounded-md my-4">
            <p className="font-medium text-sm mb-1">Tu sugerencia:</p>
            <p className="text-sm italic">{submittedSuggestion}</p>

            {email && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Te contactaré a {email} si decido implementar esta idea.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-center">
            <Button onClick={handleCloseConfirmation}>Entendido</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

