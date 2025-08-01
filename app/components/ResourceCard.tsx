import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Wrench, Globe, Award, BookOpen, Users } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  category: string
  link: string
  iconType: string
}

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "tool":
      return <Wrench className="h-5 w-5" />
    case "platform":
      return <Globe className="h-5 w-5" />
    case "certification":
      return <Award className="h-5 w-5" />
    case "book":
      return <BookOpen className="h-5 w-5" />
    case "community":
      return <Users className="h-5 w-5" />
    case "event":
      return <Globe className="h-5 w-5" />
    default:
      return <BookOpen className="h-5 w-5" />
  }
}

export default function ResourceCard({ title, description, category, link, iconType }: ResourceCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            {getIcon(iconType)}
          </div>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Ver Recurso
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
