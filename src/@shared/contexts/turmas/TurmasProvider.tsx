import { createContext, ReactNode } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner'
import type { TurmaCreateDTO, TurmaInterface } from "../../interfaces/turmaInterface"
import { turmaService } from "../../services/turmaService"

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
      toast.success("Sucesso", {description: "Turma criada com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["turmas"] })
    },
    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao criar turma!"});
    },
  })

  const updateOneTurma = useMutation({
    mutationFn: (value: TurmaInterface) => turmaService.update(value.id, value),
    onSuccess: () => {
      toast.success("Sucesso", {description: "Turma atualizada com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["turmas"] })
    },
    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao atualizar turma!"});
    },
  })

  const { mutateAsync: deleteOneTurma, isPending: isPendingDeleteTurma } = useMutation({
    mutationFn: (id: number) => turmaService.remove(id),
    onSuccess: () => {
      toast.success("Sucesso", { description: "Turma deletada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["turmas"] });
    },
    onError: (error: any) => {
      console.log({ error });

      const dbErrors = error?.response?.data?.errors?.database;

      if (dbErrors?.includes("ER_ROW_IS_REFERENCED_2")) {
        toast.error("Erro ao deletar turma", {
          description:
            "Não foi possível excluir a turma porque existem registros relacionados a ela.",
        });
      } else {
        toast.error("Erro ao deletar turma", {
          description: error?.response?.data?.message || "Não foi possível excluir a turma.",
        });
      }
    },
  });


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
