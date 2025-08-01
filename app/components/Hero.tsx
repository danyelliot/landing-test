"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <motion.h1
            className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Hacke-Academy</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Guía gratuita para aprender Ciberseguridad (Red Team & Blue Team) con apuntes, recursos y experiencias
            reales. Todo lo que alguna vez busqué cuando empecé y no encontré, ahora lo comparto contigo para que no
            empieces desde cero. {/* Updated description */}
          </motion.p>
          <motion.div
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#" className="apple-button">
              Explora el contenido {/* Updated button text */}
            </a>
            <a
              href="https://www.linkedin.com/in/gianpaul-custodio-chavarria/" // Updated link
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 text-foreground"
            >
              Conóceme <span aria-hidden="true">→</span> {/* Updated button text */}
            </a>
          </motion.div>
        </div>
        <div
          className="mx-auto mt-16 lg:mt-0 relative w-[500px] h-[500px] flex items-center justify-center" // Added fixed size and centering for the image container
        >
          <motion.img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Sin%20Fondo-V3spoWPBEWBQIjgWkzqEpYvFml2WEW.png" // Main image source
            alt="Imagen principal de Hacke-Academy" // Alt text for the new image
            width={500} // Set explicit width
            height={500} // Set explicit height
            className="rounded-2xl shadow-xl object-contain" // Ensure image fits within its bounds
            initial={{ filter: "drop-shadow(0px 0px 0px rgba(255, 0, 0, 0))" }} // Initial state: no shadow
            whileHover={{
              scale: 1.05, // Slight scale up
              filter: "drop-shadow(0px 0px 15px rgba(255, 0, 0, 0.8))", // Red glow around the image shape
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}
