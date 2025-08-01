"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import PublicationCard from "../components/PublicationCard"

// Define the publication data
const allPublications = [
  // Repositorios de GitHub
  {
    id: 1,
    title: "HackeMusic",
    description: "Un proyecto de música con enfoque en ciberseguridad.",
    category: "Repositorios",
    externalLink: "https://github.com/GianpaulCustodio/HackeMusic",
    iconType: "repository",
  },
  {
    id: 2,
    title: "Keylogger2025",
    description: "Un keylogger desarrollado para propósitos educativos y de investigación.",
    category: "Repositorios",
    externalLink: "https://github.com/GianpaulCustodio/Keylogger2025",
    iconType: "repository",
  },
  {
    id: 3,
    title: "IntroPython2024",
    description: "Introducción a Python con ejercicios y ejemplos para principiantes.",
    category: "Repositorios",
    externalLink: "https://github.com/GianpaulCustodio/IntroPython2024",
    iconType: "repository",
  },
  {
    id: 4,
    title: "DescargarFotoInstagram",
    description: "Script para descargar fotos de Instagram (uso ético y personal).",
    category: "Repositorios",
    externalLink: "https://github.com/GianpaulCustodio/DescargarFotoInstagram",
    iconType: "repository",
  },
  // WriteUps de Notion
  {
    id: 5,
    title: "HTB Union Write-up",
    description: "Análisis detallado y solución de la máquina 'Union' de Hack The Box.",
    category: "WriteUps",
    externalLink:
      "https://cerulean-scallop-9f4.notion.site/HTB-Union-1c5609a2ed94803cac44fd93e0010729?source=copy_link",
    iconType: "article",
  },
  {
    id: 6,
    title: "HTB Planning Write-up",
    description: "Guía completa para resolver la máquina 'Planning' de Hack The Box.",
    category: "WriteUps",
    externalLink:
      "https://cerulean-scallop-9f4.notion.site/HTB-Planning-1f1609a2ed948017b8ccdf4b2bd9339c?source=copy_link",
    iconType: "article",
  },
  // Imágenes (en standby)
  {
    id: 7,
    title: "Imagen de Ejemplo 1",
    description: "Placeholder para una imagen futura.",
    category: "Imágenes",
    externalLink: "/placeholder.svg?height=600&width=800",
    iconType: "image",
  },
  {
    id: 8,
    title: "Imagen de Ejemplo 2",
    description: "Placeholder para otra imagen futura.",
    category: "Imágenes",
    externalLink: "/placeholder.svg?height=600&width=800",
    iconType: "image",
  },
]

// Updated categories array
const categories = ["Todos", "Repositorios", "Imágenes", "WriteUps"]

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("Todos")

  const filteredPublications = allPublications.filter((publication) => {
    const matchesSearch =
      publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      publication.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "Todos" || publication.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section for Publications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-primary/10 to-background">
        <motion.h1
          className="text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nuestras Publicaciones
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explora nuestros artículos, tutoriales, repositorios y más contenido exclusivo.
        </motion.p>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Buscar publicaciones..."
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

          {/* Publications Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPublications.length > 0 ? (
                filteredPublications.map((publication) => (
                  <motion.div
                    key={publication.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PublicationCard {...publication} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center text-muted-foreground text-lg py-10"
                >
                  No se encontraron publicaciones que coincidan con tu búsqueda.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
