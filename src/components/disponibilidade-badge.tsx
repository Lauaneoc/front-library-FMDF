import { cn } from "../utils/cn"
import { Badge } from "./ui/badge"

interface DisponibilidadeBadgeProps {
  disponibilidade: "Disponível" | "Emprestado" | "Indisponível"
  className?: string
}

export function DisponibilidadeBadge({ disponibilidade, className }: DisponibilidadeBadgeProps) {
  const getVariant = () => {
    switch (disponibilidade) {
      case "Disponível":
        return "bg-primary text-primary-foreground"
      case "Emprestado":
        return "bg-chart-4 text-primary-foreground"
      case "Indisponível":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return <Badge className={cn(getVariant(), className)}>{disponibilidade}</Badge>
}
