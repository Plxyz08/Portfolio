"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const testimonials = [
    {
      id: 1,
      name: "Andres Martiliano",
      position: "CTO, Trascender Global",
      image: "/Testimonios/Trascender.jpg",      
      text: "Sebastián demostró ser un desarrollador excepcional. Su capacidad para resolver problemas complejos y su atención al detalle hicieron que nuestros proyectos fueran un éxito. Siempre cumplió con los plazos y superó nuestras expectativas.",
    },
    {
      id: 2,
      name: "Miguel Gaibor",
      position: "CEO, Tesla Lift",
      image: "/Testimonios/Tesla.png",      
      text: "Trabajar con Sebastián en el desarrollo de nuestra aplicación Tesla Lift fue una experiencia extraordinaria. Su comprensión de nuestras necesidades y su capacidad para implementar soluciones innovadoras transformaron nuestra idea en una aplicación robusta y funcional. Su profesionalismo y dedicación fueron fundamentales para el éxito del proyecto.",
    },
    {
      id: 5,
      name: "Jonathan Hernandez",
      position: "CEO, CardSoftware",
      image: "/Testimonios/CardSoftwareLogo.png",
      text: "Sebastián se integró rápidamente a nuestro equipo y entregó un trabajo excepcional en el proyecto CS Tracer. A pesar del corto plazo de un mes, su dominio de Next.js y React nos permitió avanzar significativamente en el desarrollo front-end. Su código limpio, bien estructurado y su capacidad para resolver problemas técnicos complejos fueron invaluables para nuestro proyecto.",
    },
    {
      id: 3,
      name: "Diego Ballesteros",
      position: "Propietario, LaListaWBC.com",
      image: "/Testimonios/lalista.png",      
      text: "Sebastián desarrolló LaListaWBC.com exactamente como lo necesitábamos. Su enfoque meticuloso y su habilidad para implementar funcionalidades complejas como el chat en tiempo real superaron mis expectativas. Siempre estuvo disponible para ajustes y mejoras, demostrando un compromiso excepcional con la calidad del proyecto.",
    },
    {
      id: 4,
      name: "Mauricio Parrado",
      position: "UI/UX Designer, Trascender Global",
      image: "/Testimonios/Trascender.jpg",      
      text: "Colaborar con Sebastián fue una experiencia enriquecedora. Su habilidad para traducir diseños en código funcional y su atención a los detalles visuales hicieron que nuestros proyectos destacaran. Es un desarrollador con gran sensibilidad por la experiencia de usuario.",
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
    <section id="testimonials" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Testimonios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Lo que dicen mis clientes y colaboradores sobre mi trabajo y profesionalismo.
          </motion.p>
        </div>

        {/* Vista de escritorio y tablet */}
        <div className="hidden md:block">
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={item} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6 flex-grow">
                    <div className="mb-4 text-primary dark:text-blue-400">
                      <Quote className="h-8 w-8" />
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Vista móvil con carrusel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="h-full flex flex-col ml-5 mr-5">
                    <CardContent className="pt-6 flex-grow">
                      <div className="mb-4 text-primary dark:text-blue-400">
                        <Quote className="h-8 w-8" />
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-blue-500 hover:bg-blue-600 text-white border-blue-600" />
            <CarouselNext className="right-1 bg-blue-500 hover:bg-blue-600 text-white border-blue-600" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

