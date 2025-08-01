"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const projects = [
  {
    id: 1,
    title: "Bash Scripting: Introducción",
    description: "Aprende los fundamentos de Bash Scripting para automatizar tareas.",
    videoUrl: "https://www.youtube.com/watch?v=mEmkkh14WnA&t=2s",
    category: "Bash Scripting",
  },
  {
    id: 2,
    title: "Bash Scripting: Avanzado",
    description: "Profundiza en scripts complejos y optimización.",
    videoUrl: "https://www.youtube.com/watch?v=29GDHA5777g",
    category: "Bash Scripting",
  },
  {
    id: 3,
    title: "Bash Scripting: Ejercicios",
    description: "Practica con ejercicios reales de Bash Scripting.",
    videoUrl: "https://www.youtube.com/watch?v=5p-BYZ5YV24",
    category: "Bash Scripting",
  },
  {
    id: 4,
    title: "Bash Scripting: Trucos",
    description: "Descubre tips y trucos para ser más eficiente en Bash.",
    videoUrl: "https://www.youtube.com/watch?v=qzxNP9BokQM",
    category: "Bash Scripting",
  },
  {
    id: 5,
    title: "Cultura Ciber: Seguridad Online",
    description: "Consejos esenciales para mantenerte seguro en internet.",
    videoUrl: "https://www.youtube.com/watch?v=DuoFo9zZO2c",
    category: "Cultura Ciber",
  },
  {
    id: 6,
    title: "Cultura Ciber: Amenazas Actuales",
    description: "Conoce las últimas amenazas y cómo protegerte.",
    videoUrl: "https://www.youtube.com/watch?v=i3-oawcMkl4",
    category: "Cultura Ciber",
  },
  {
    id: 7,
    title: "SQLi: Inyección SQL Básica",
    description: "Entiende cómo funciona la inyección SQL y sus riesgos.",
    videoUrl: "https://www.youtube.com/watch?v=osbinbNl_rc",
    category: "SQLi",
  },
  {
    id: 8,
    title: "SQLi: Prevención y Detección",
    description: "Aprende a prevenir y detectar ataques de inyección SQL.",
    videoUrl: "https://www.youtube.com/watch?v=xyFF2ObZrhw",
    category: "SQLi",
  },
  {
    id: 9,
    title: "Burp Suite: Interceptación",
    description: "Domina la interceptación de tráfico con Burp Suite.",
    videoUrl: "https://www.youtube.com/watch?v=nywc0FQcOQ4",
    category: "Burp Suite",
  },
  {
    id: 10,
    title: "Burp Suite: Escáner",
    description: "Utiliza el escáner de vulnerabilidades de Burp Suite.",
    videoUrl: "https://www.youtube.com/watch?v=1TuhpTAlSBs",
    category: "Burp Suite",
  },
  {
    id: 11,
    title: "Burp Suite: Extensiones",
    description: "Explora las extensiones para potenciar Burp Suite.",
    videoUrl: "https://www.youtube.com/watch?v=POCp3knItAs",
    category: "Burp Suite",
  },
  {
    id: 12,
    title: "Cómo conseguir trabajo: CV y Entrevista",
    description: "Prepara tu CV y entrevista para el sector ciberseguridad.",
    videoUrl: "https://www.youtube.com/watch?v=IxvcnhuisEE",
    category: "Cómo conseguir trabajo",
  },
  {
    id: 13,
    title: "Cómo conseguir trabajo: Networking",
    description: "Construye tu red de contactos en ciberseguridad.",
    videoUrl: "https://www.youtube.com/watch?v=O7ZVsfz0Ivg",
    category: "Cómo conseguir trabajo",
  },
  {
    id: 14,
    title: "APIs: Seguridad en APIs",
    description: "Aprende a asegurar y pentestar APIs.",
    videoUrl: "https://www.youtube.com/watch?v=chBZoBS7b3k",
    category: "APIs",
  },
  {
    id: 15,
    title: "Tools: Nmap Esencial",
    description: "Guía completa de Nmap para escaneo de redes.",
    videoUrl: "https://www.youtube.com/watch?v=hgNo1iSSC4U",
    category: "Tools",
  },
  {
    id: 16,
    title: "Tools: Metasploit Básico",
    description: "Primeros pasos con Metasploit Framework.",
    videoUrl: "https://www.youtube.com/watch?v=BPJvyu4v85A",
    category: "Tools",
  },
].map((project) => ({
  ...project,
  imageUrl: `https://img.youtube.com/vi/${getYouTubeVideoId(project.videoUrl)}/hqdefault.jpg`,
}))

const categories = [
  "All",
  "Bash Scripting",
  "Cultura Ciber",
  "SQLi",
  "Burp Suite",
  "Cómo conseguir trabajo",
  "APIs",
  "Tools",
]

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Clases de Ciberseguridad</h2>
          <p className="mt-4 text-lg text-muted-foreground">Encuentra tu video ideal según tus objetivos.</p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary/10"
              >
                {/* Enlace que envuelve la imagen y su overlay */}
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    >
                      <p className="text-white text-center px-4">{project.description}</p>
                    </motion.div>
                  </div>
                </a>
                <div className="p-6">
                  <div className="text-sm font-medium text-primary mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <a
                    href={project.videoUrl} // Este es el botón "Ver Video"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Ver Video
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
