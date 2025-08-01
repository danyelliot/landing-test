"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Book, FileText, Youtube, Github, ScrollText, LinkIcon, ImageIcon } from "lucide-react" // Updated Image icon import

interface PublicationCardProps {
  title: string
  description: string
  category: string
  externalLink: string
  iconType: "article" | "repository" | "tutorial" | "video" | "document" | "blog" | "other" | "image" // Added 'image' type
}

const iconMap = {
  article: Book,
  repository: Github,
  tutorial: ScrollText,
  video: Youtube,
  document: FileText,
  blog: Book,
  other: LinkIcon,
  image: ImageIcon, // Updated 'image' type to ImageIcon icon
}

export default function PublicationCard({
  title,
  description,
  category,
  externalLink,
  iconType,
}: PublicationCardProps) {
  const Icon = iconMap[iconType] || LinkIcon

  return (
    <motion.div
      className="bg-background rounded-2xl shadow-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 ease-in-out hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={externalLink} target="_blank" rel="noopener noreferrer" className="block p-6">
        <div className="flex items-center mb-4">
          {Icon && <Icon className="w-8 h-8 text-primary mr-3" />}
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-4 min-h-[60px]">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-primary-foreground bg-primary/20 px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-sm text-primary hover:underline">Ver Publicación →</span>
        </div>
      </Link>
    </motion.div>
  )
}
