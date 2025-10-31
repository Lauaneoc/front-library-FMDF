import { cn } from "../utils/cn"
import { Badge } from "./ui/badge"

interface StatusBadgeProps {
  status: "Aberto" | "Finalizado"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant={status === "Aberto" ? "default" : "secondary"}
      className={cn(
        status === "Aberto" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        className,
      )}
    >
      {status}
    </Badge>
  )
}
