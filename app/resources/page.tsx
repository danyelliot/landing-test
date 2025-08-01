"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import ResourceCard from "@/app/components/ResourceCard"

// Define the resource data
const allResources = [
  {
    id: 1,
    title: "Nmap: Guía Completa",
    description: "Manual detallado sobre el uso de Nmap para escaneo de redes y auditorías de seguridad.",
    category: "Herramientas",
    link: "https://nmap.org/book/man.html",
    iconType: "tool",
  },
  {
    id: 2,
    title: "TryHackMe: Rutas de Aprendizaje",
    description: "Plataforma interactiva con laboratorios guiados para aprender hacking ético desde cero.",
    category: "Plataformas de Práctica",
    link: "https://tryhackme.com/paths",
    iconType: "platform",
  },
  {
    id: 3,
    title: "OSCP: Preparación y Examen",
    description: "Guía para la certificación Offensive Security Certified Professional (OSCP).",
    category: "Certificaciones",
    link: "https://www.offensive-security.com/pwk-oscp/",
    iconType: "certification",
  },
  {
    id: 4,
    title: "The Hacker News",
    description: "Noticias diarias y análisis sobre ciberseguridad, amenazas y vulnerabilidades.",
    category: "Blogs y Noticias",
    link: "https://thehackernews.com/",
    iconType: "book", // Using book icon for news/blogs
  },
  {
    id: 5,
    title: "Discord de HackeMate",
    description: "Únete a nuestra comunidad para discutir, aprender y colaborar en ciberseguridad.",
    category: "Comunidades",
    link: "#", // Placeholder for Discord link
    iconType: "community",
  },
  {
    id: 6,
    title: "Cheatsheet de Comandos Linux",
    description: "Una referencia rápida de comandos esenciales de Linux para pentesting y administración.",
    category: "Plantillas y Cheatsheets",
    link: "/placeholder.pdf", // Placeholder for a downloadable PDF
    iconType: "template",
  },
  {
    id: 7,
    title: "Glosario de Ciberseguridad",
    description: "Definiciones de términos clave en el mundo de la ciberseguridad.",
    category: "Glosario",
    link: "#", // Will link to an in-page glossary or separate page
    iconType: "glossary",
  },
  {
    id: 8,
    title: "Burp Suite Community Edition",
    description: "La versión gratuita de la herramienta líder para pruebas de seguridad web.",
    category: "Herramientas",
    link: "https://portswigger.net/burp/communitydownload",
    iconType: "tool",
  },
  {
    id: 9,
    title: "Hack The Box: Máquinas",
    description: "Desafíos de hacking realistas para mejorar tus habilidades ofensivas y defensivas.",
    category: "Plataformas de Práctica",
    link: "https://www.hackthebox.com/machines",
    iconType: "platform",
  },
  {
    id: 10,
    title: "Conferencia DEF CON",
    description: "Una de las conferencias de hacking más antiguas y grandes del mundo.",
    category: "Eventos",
    link: "https://www.defcon.org/",
    iconType: "event",
  },
]

const categories = ["Todos", "Repositorios", "Imágenes", "WriteUps"]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("Todos")

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "Todos" || resource.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section for Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-primary/10 to-background">
        <motion.h1
          className="text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explora Nuestros Recursos
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Una colección curada de herramientas, plataformas, guías y comunidades para potenciar tu camino en la
          ciberseguridad.
        </motion.p>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Buscar recursos..."
              className="w-full max-w-md mx-auto block p-3 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filterCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Resources Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ResourceCard {...resource} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center text-muted-foreground text-lg py-10"
                >
                  No se encontraron recursos que coincidan con tu búsqueda.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
