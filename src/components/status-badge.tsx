import { cn } from "../utils/cn"
import { Badge } from "./ui/badge"

interface StatusBadgeProps {
  status: "Aberto" | "Finalizado" | "Em atraso"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles =
    status === "Aberto"
      ? "bg-primary text-primary-foreground"
      : status === "Finalizado"
        ? "bg-muted text-muted-foreground"
        : "bg-amber-200 text-amber-700"

  return (
    <Badge
      variant={
        status === "Aberto"
          ? "default"
          : status === "Finalizado"
            ? "secondary"
            : "outline"
      }
      className={cn(styles, className)}
    >
      {status}
    </Badge>
  )
}
