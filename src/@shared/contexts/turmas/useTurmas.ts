import { useContext } from "react"
import { TurmasContext } from "./TurmasProvider"

export function useTurmas() {
  const context = useContext(TurmasContext)

  if (!context) {
    throw new Error("useTurmas deve ser usado dentro de um TurmasProvider")
  }

  return context
}
