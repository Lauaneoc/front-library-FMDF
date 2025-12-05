import { createContext, ReactNode } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { TurmaCreateDTO, TurmaInterface } from "../../interfaces/turmaInterface"
import { turmaService } from "../../services/turmaService"
import { toast } from "../../../hooks/use-toast"

interface TurmasContextData {
  turmas: TurmaInterface[] | null
  isLoading: boolean
  createOneTurma: any
  updateOneTurma: any
  deleteOneTurma: any
  isPendingDeleteTurma: boolean
  isPendingCreateTurma: boolean
  findOneTurma: (id: number) => any
}

export const TurmasContext = createContext<TurmasContextData | null>(null)

export function TurmasProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

  const { data: turmas, isLoading } = useQuery({
    queryKey: ["turmas"],
    queryFn: turmaService.getAll,
  })

  function findOneTurma(id: number) {
    return useQuery({
      queryKey: ["turma", id],
      queryFn: () => turmaService.getById(id),
      enabled: !!id,
    })
  }

  const { mutateAsync: createOneTurma, isPending: isPendingCreateTurma } = useMutation({
    mutationFn: (value: TurmaCreateDTO) => turmaService.create(value),
    onSuccess: () => {
      toast({ title: "Sucesso", description: "Turma criada com sucesso!" })
      queryClient.invalidateQueries({ queryKey: ["turmas"] })
    },
    onError: () => {
      toast({ title: "Erro", description: "Erro ao criar turma", variant: "destructive" })
    },
  })

  const updateOneTurma = useMutation({
    mutationFn: (value: TurmaInterface) => turmaService.update(value.id, value),
    onSuccess: () => {
      toast({ title: "Sucesso", description: "Turma atualizada!" })
      queryClient.invalidateQueries({ queryKey: ["turmas"] })
    },
    onError: () => {
      toast({ title: "Erro", description: "Erro ao atualizar turma", variant: "destructive" })
    },
  })

  const { mutateAsync: deleteOneTurma, isPending: isPendingDeleteTurma } = useMutation({
    mutationFn: (id: number) => turmaService.remove(id),
    onSuccess: () => {
      toast({ title: "Sucesso", description: "Turma removida!" })
      queryClient.invalidateQueries({ queryKey: ["turmas"] })
    },
    onError: () => {
      toast({ title: "Erro", description: "Erro ao deletar turma", variant: "destructive" })
    },
  })

  return (
    <TurmasContext.Provider
      value={{
        turmas,
        isLoading,
        createOneTurma,
        isPendingCreateTurma,
        updateOneTurma,
        findOneTurma,
        deleteOneTurma,
        isPendingDeleteTurma,
      }}
    >
      {children}
    </TurmasContext.Provider>
  )
}
