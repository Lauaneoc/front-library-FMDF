import { useContext } from "react"
import { LocacoesContext } from "./LocacoesProvider"

export function useLocacoes() {
  const context = useContext(LocacoesContext)
  if (!context) throw new Error("useLocacoes must be used within a LocacoesProvider")
  return context
}

export default useLocacoes
