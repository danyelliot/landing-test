"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { Code, Paintbrush, Smartphone, ShieldCheck, Trophy } from "lucide-react" // Added ShieldCheck and Trophy for new services

const learnTopics = [
  {
    icon: <Paintbrush className="w-12 h-12 mb-4 text-blue-500" />,
    title: "Introducción al Hacking Ético",
    description:
      "Aprende desde cero los conceptos, herramientas y metodologías para entender cómo piensan los atacantes.",
  },
  {
    icon: <Code className="w-12 h-12 mb-4 text-green-500" />,
    title: "Red Team (Ofensiva)",
    description:
      "Explora técnicas de reconocimiento, explotación de vulnerabilidades y acceso a sistemas de forma controlada.",
  },
  {
    icon: <ShieldCheck className="w-12 h-12 mb-4 text-yellow-500" />,
    title: "Blue Team (Defensiva)",
    description:
      "Aprende a defender sistemas, detectar ataques, responder a incidentes y aplicar buenas prácticas de seguridad.",
  },
  {
    icon: <Smartphone className="w-12 h-12 mb-4 text-purple-500" />,
    title: "CTF y Retos Prácticos",
    description: "Pon a prueba tus conocimientos resolviendo desafíos reales con herramientas del mundo profesional.",
  },
  {
    icon: <Trophy className="w-12 h-12 mb-4 text-red-500" />,
    title: "Capacitación para Certificaciones",
    description:
      "Prepárate para las certificaciones más valoradas en el mundo del pentesting: eJPTv2, eWPT, eWPTXv3 y eCPPT.",
  },
]

export default function WhatYouWillLearn() {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  const handleDragEnd = () => {
    const currentX = x.get()
    if (currentX > 0) {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } })
    } else if (currentX < -width) {
      controls.start({ x: -width, transition: { type: "spring", stiffness: 300, damping: 30 } })
    }
  }

  return (
    <div className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">¿Qué aprenderás?</h2>
        <motion.div ref={carousel} className="cursor-grab overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            animate={controls}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="flex"
          >
            {learnTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] h-[400px] p-8 m-4 bg-background rounded-3xl shadow-lg flex flex-col justify-between hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary hover:border-4" // Increased border thickness and made it solid primary color on hover
              >
                <div>
                  <div className="text-4xl mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{topic.title}</h3>
                  <p className="text-muted-foreground">{topic.description}</p>
                </div>
                <div className="mt-4">
                  <a
                    href="#" // Consider updating this link
                    className="text-primary hover:underline"
                  >
                    Saber Más →
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
