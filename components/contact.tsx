"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, MapPin, Phone, Send, Briefcase, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Contact() {
  const { toast } = useToast()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mostrar toast y diálogo de éxito
    toast({
      title: "¡Mensaje enviado con éxito!",
      description: "Gracias por contactarme. Te responderé lo antes posible.",
      variant: "success",
    })

    setShowSuccessDialog(true)

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Teléfono",
      value: "(+57) 3015914917",
      link: "tel:+573015914917",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "sebastianmunoz603@gmail.com",
      link: "mailto:sebastianmunoz603@gmail.com",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Ubicación",
      value: "Bucaramanga, Colombia",
      link: "https://maps.google.com/?q=Bucaramanga,Colombia",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      value: "Sebastián Muñoz",
      link: "https://www.linkedin.com/in/sebastian-aparicio00/",
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      value: "Sebastián Muñoz",
      link: "https://github.com/Plxyz08",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Workana",
      value: "Sebastián Muñoz",
      link: "https://www.workana.com/freelancer/0391c229a6d7a4bf5832d1b566c3c46c",
    },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Contacto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            ¿Tienes un proyecto en mente? ¡Hablemos! Estoy disponible para trabajar en nuevos proyectos y
            colaboraciones.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-10"
        >
          <Card className="hover:shadow-lg transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 hover:border-blue-400 dark:hover:border-blue-400 group">
            <CardHeader>
              <CardTitle className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                Envíame un mensaje
              </CardTitle>
              <CardDescription>Completa el formulario y te responderé lo antes posible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Asunto del mensaje"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tu mensaje"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gap-2 transition-all duration-300 hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 hover:border-blue-400 dark:hover:border-blue-400 group">
            <CardHeader>
              <CardTitle className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                Información de contacto
              </CardTitle>
              <CardDescription>Puedes contactarme a través de los siguientes medios.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-500/20 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5, transition: { duration: 0, type: "tween" } }}
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 hover:border-blue-400 dark:hover:border-blue-400 group">
            <CardHeader>
              <CardTitle className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                Horario de trabajo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <motion.div
                  className="flex justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <span className="text-muted-foreground">Lunes - Viernes:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </motion.div>
                <motion.div
                  className="flex justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <span className="text-muted-foreground">Sábado:</span>
                  <span>10:00 AM - 2:00 PM</span>
                </motion.div>
                <motion.div
                  className="flex justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                ></motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Diálogo de éxito */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-6 w-6" />
              ¡Mensaje enviado con éxito!
            </DialogTitle>
            <DialogDescription>
              Gracias por contactarme. He recibido tu mensaje y te responderé lo antes posible.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-green-100 dark:bg-green-900/30 rounded-full p-6 mb-4"
            >
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </motion.div>
            <p className="text-center text-muted-foreground">
              Tu mensaje ha sido enviado correctamente. Normalmente respondo en un plazo de 24-48 horas hábiles.
            </p>
            <Button className="mt-6 w-full" onClick={() => setShowSuccessDialog(false)}>
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

