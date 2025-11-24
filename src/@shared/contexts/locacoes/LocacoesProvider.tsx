import { createContext, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import type Locacao from "../../interfaces/locacaoInterface"
import { locacaoService } from "../../services/locacaoService"

interface LocacoesContextData {
  locacoes: Locacao[] | null
  isLoading: boolean
}

export const LocacoesContext = createContext<LocacoesContextData | null>(null)

export function LocacoesProvider({ children }: { children: ReactNode }) {
  const { data: locacoes, isLoading } = useQuery({
    queryKey: ["locacoes"],
    queryFn: locacaoService.getAll,
  })

  return (
    <LocacoesContext.Provider
      value={{
        locacoes,
        isLoading,
      }}
    >
      {children}
    </LocacoesContext.Provider>
  )
}

export default LocacoesProvider
