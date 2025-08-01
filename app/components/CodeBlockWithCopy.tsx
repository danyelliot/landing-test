"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast" // Assuming use-toast is available

interface CodeBlockWithCopyProps {
  children: string
  language: string
}

export default function CodeBlockWithCopy({ children, language }: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(children)
      .then(() => {
        setCopied(true)
        toast({
          title: "Copiado!",
          description: "El script ha sido copiado al portapapeles.",
          duration: 2000,
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        toast({
          title: "Error al copiar",
          description: "No se pudo copiar el script.",
          variant: "destructive",
          duration: 2000,
        })
      })
  }

  return (
    <div className="relative bg-gray-800 text-gray-200 p-4 rounded-lg my-6 overflow-x-auto shadow-lg">
      <div className="absolute top-2 right-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-gray-400 hover:text-gray-100"
          aria-label={copied ? "Copiado" : "Copiar script"}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className={`language-${language}`}>
        <code className={`language-${language} font-mono text-sm`}>{children}</code>
      </pre>
    </div>
  )
}
