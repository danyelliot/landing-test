"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Gracias a HackeMate pude entender cómo funciona un escaneo de red y me animé a hacer mi primer CTF. ¡Todo súper claro y bien explicado!",
    author: "Víctor Meneses",
    position: "Estudiante de Hxploit UPC",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-soac64YwwxdI9oZGtdaxL1prkZJ97S.png", // Image for Victor
  },
  {
    quote:
      "El contenido de Gianpaul es oro puro. Con sus apuntes y ejemplos entendí mejor lo que en clase me costaba semanas.",
    author: "Oscar Naveda", // Corrected name without tilde
    position: "Estudiante de Hxploit UPC",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-fwcx1zw9Ks4XyTtQRHHeFoBcniirK8.png", // Image for Oscar
  },
  {
    quote:
      "No hay muchos espacios gratuitos y tan bien estructurados como HackeMate. Recomendado si estás empezando en Red Team o Blue Team.",
    author: "Iam Álvarez",
    position: "Estudiante de Hxploit UPC",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-lmIJGhdAQyVZWvduYsZdvL0H9rKxdj.jpeg", // Image for Iam
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Lo que dicen los estudiantes
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"} // Use the specific image URL
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full mr-4 object-cover" // Added object-cover for better image fitting
                />
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
