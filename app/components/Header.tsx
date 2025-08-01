"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo - Removed hover effects */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">HackeMate</span>
            <img
              className="h-8 w-auto"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Sin%20Fondo-V3spoWPBEWBQIjgWkzqEpYvFml2WEW.png"
              alt="Logo de HackeMate"
            />
          </Link>
        </div>

        {/* Main Navigation Links (Centered) */}
        <div className="flex justify-center flex-grow">
          <div className="flex gap-x-8 items-center">
            {/* Inicio Link with hover effect */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }} // Bounce effect
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Link
                href="/" // Link to the current index
                className="relative text-sm font-semibold leading-6 text-foreground hover:text-primary group" // Text turns red on hover
              >
                Inicio
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            {/* Red Team Link with hover effect */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }} // Bounce effect
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Link
                href="/red-team" // Ahora apunta a la ruta interna de tu aplicación
                className="relative text-sm font-semibold leading-6 text-foreground hover:text-primary group"
              >
                Red Team
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            {/* Blue Team Link with hover effect */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }} // Bounce effect
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Link
                href="/blue-team" // Updated link to the new Blue Team page
                className="relative text-sm font-semibold leading-6 text-foreground hover:text-primary group"
              >
                Blue Team
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            {/* Publicaciones Link with hover effect */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }} // Bounce effect
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Link
                href="/publications" // Enlace a la nueva página de Publicaciones
                className="relative text-sm font-semibold leading-6 text-foreground hover:text-primary group"
              >
                Publicaciones
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            {/* Contacto Link with hover effect */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }} // Bounce effect
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Link
                href="#"
                className="relative text-sm font-semibold leading-6 text-foreground hover:text-primary group"
              >
                Contacto
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Social Media Icons and CTA Button (Right Aligned) */}
        <div className="flex items-center gap-x-4">
          {/* Social Media Icons with bounce effect */}
          <motion.div
            whileHover={{ scale: 1.2, y: -2 }} // Bounce effect
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Link href="#" className="text-foreground hover:text-facebook transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, y: -2 }} // Bounce effect
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Link href="#" className="text-foreground hover:text-linkedin transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, y: -2 }} // Bounce effect
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Link href="#" className="text-foreground hover:text-instagram transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, y: -2 }} // Bounce effect
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Link href="#" className="text-foreground hover:text-youtube transition-colors">
              <Youtube className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* CTA Button with bounce effect */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }} // Bounce effect
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Link
              href="#"
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              EMPIEZA AHORA
            </Link>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  )
}
