import { cn } from "../utils/cn"
import { Badge } from "./ui/badge"

interface EstadoBadgeProps {
  estado: "Novo" | "Regular" | "Danificado" | "Perdido"
  className?: string
}

export function EstadoBadge({ estado, className }: EstadoBadgeProps) {
  const getVariant = () => {
    switch (estado) {
      case "Novo":
        return "bg-primary text-primary-foreground"
      case "Regular":
        return "bg-chart-2 text-primary-foreground"
      case "Danificado":
        return "bg-chart-4 text-primary-foreground"
      case "Perdido":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return <Badge className={cn(getVariant(), className)}>{estado}</Badge>
}
