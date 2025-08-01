"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Removed: import Link from "next/link" // Using standard <a> tag for in-page navigation

// Helper function to slugify text for IDs
const slugify = (text: string) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

interface TocItem {
  level: number
  text: string
  id: string
  children?: TocItem[]
}

interface TableOfContentsProps {
  tocItems: TocItem[]
}

export default function TableOfContents({ tocItems }: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -80% 0%" }, // Adjusted for better active state detection
    )

    observerRef.current = observer

    // Observe all headings
    const headings = document.querySelectorAll("h2[id], h3[id], h4[id]")
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      if (observerRef.current) {
        headings.forEach((heading) => observer.current?.unobserve(heading))
      }
    }
  }, [])

  const renderTocItems = (items: TocItem[]) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className={`${item.level === 3 ? "ml-4" : item.level === 4 ? "ml-8" : ""}`}>
          <a // Changed from Link to <a> for direct in-page navigation
            href={`#${item.id}`}
            className={`block text-sm py-1 transition-colors ${
              activeHeadingId === item.id ? "text-primary font-semibold" : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => {
              setIsVisible(false) // Hide TOC after clicking a link
              setActiveHeadingId(item.id)
            }}
          >
            {item.text}
          </a>
          {item.children && item.children.length > 0 && (
            <ul className="mt-2 space-y-1">{renderTocItems(item.children)}</ul>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className="fixed right-0 top-0 h-full w-24 hover:w-64 transition-all duration-300 ease-in-out z-50 group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute right-0 top-16 bg-gray-800 text-white p-6 rounded-l-2xl shadow-lg max-h-[90vh] overflow-y-auto border border-gray-700"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="text-lg font-bold mb-4 text-primary">Contenido</h3>
            {renderTocItems(tocItems)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
