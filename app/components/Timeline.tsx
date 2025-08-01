"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react" // Import CheckCircle icon for roadmap

const roadmapPhases = [
  {
    year: "Fase 1", // Changed to phases for roadmap
    title: "Instalación de Máquinas Virtuales",
    description: "Configura tu entorno de laboratorio para empezar a practicar.",
    details:
      "Aprenderás a instalar y configurar máquinas virtuales como VirtualBox o VMware, y sistemas operativos como Kali Linux y Windows para tus prácticas de ciberseguridad.",
  },
  {
    year: "Fase 2",
    title: "Comandos en Kali Linux",
    description: "Domina la terminal de Linux, tu herramienta principal.",
    details:
      "Explora los comandos esenciales de Kali Linux, desde la navegación de archivos hasta la gestión de procesos, fundamentales para cualquier operación de hacking ético.",
  },
  {
    year: "Fase 3",
    title: "Escaneo con Nmap",
    description: "Descubre redes y sistemas con la herramienta más potente.",
    details:
      "Aprende a usar Nmap para escanear puertos, identificar servicios, detectar sistemas operativos y mapear la topología de una red, crucial para el reconocimiento.",
  },
  {
    year: "Fase 4",
    title: "Hydra",
    description: "Realiza ataques de fuerza bruta a servicios de red.",
    details:
      "Conoce cómo utilizar Hydra para realizar ataques de fuerza bruta contra diversos protocolos de autenticación, como SSH, FTP, HTTP, entre otros.",
  },
  {
    year: "Fase 5",
    title: "Burp Suite",
    description: "Intercepta y manipula tráfico web para encontrar vulnerabilidades.",
    details:
      "Domina Burp Suite, la herramienta líder para pruebas de seguridad web, incluyendo la intercepción de peticiones, modificación de respuestas y escaneo de vulnerabilidades.",
  },
  {
    year: "Fase 6",
    title: "SQLMap",
    description: "Automatiza la detección y explotación de inyecciones SQL.",
    details:
      "Aprende a usar SQLMap para identificar y explotar vulnerabilidades de inyección SQL en aplicaciones web, extrayendo información sensible de bases de datos.",
  },
  {
    year: "Fase 7",
    title: "Postman",
    description: "Prueba y automatiza interacciones con APIs.",
    details:
      "Utiliza Postman para enviar peticiones HTTP, probar APIs y automatizar flujos de trabajo, una habilidad valiosa para el pentesting de aplicaciones modernas.",
  },
  {
    year: "Fase 8",
    title: "OWASP ZAP",
    description: "Escanea aplicaciones web en busca de fallos de seguridad.",
    details:
      "Familiarízate con OWASP ZAP, un escáner de seguridad de aplicaciones web de código abierto, para encontrar automáticamente vulnerabilidades comunes como XSS y CSRF.",
  },
  {
    year: "Fase 9",
    title: "Metasploit Framework",
    description: "Explota sistemas y gestiona sesiones post-explotación.",
    details:
      "Domina Metasploit, el framework de explotación más popular, para lanzar exploits, crear payloads y gestionar el acceso a sistemas comprometidos.",
  },
  {
    year: "Fase 10",
    title: "Phishing y creación de malware (educativo)",
    description: "Entiende las tácticas de ingeniería social y desarrollo de payloads.",
    details:
      "Aprende sobre técnicas de phishing y cómo se crea malware con fines educativos, para comprender mejor las amenazas y cómo defenderse de ellas.",
  },
]

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Roadmap – Aprende Ciberseguridad con HackeMate
          </h2>{" "}
          {/* Updated title */}
          <p className="mt-4 text-lg text-muted-foreground">
            Inicio ideal para estudiantes, autodidactas y futuros pentesters. {/* Updated description */}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          {/* Icon for roadmap */}
          <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-primary"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <CheckCircle
              className="w-6 h-6"
              style={{ transform: `scale(${useTransform(scrollYProgress, [0, 1], [0.5, 1])})` }}
            />{" "}
            {/* Changed icon to CheckCircle */}
          </motion.div>

          {roadmapPhases.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof roadmapPhases)[0] // Updated type to roadmapPhases
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="p-4 bg-background rounded-lg shadow-md border border-primary/10">
          <span className="font-bold text-primary">{event.year}</span>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm text-muted-foreground">{event.details}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
