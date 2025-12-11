import { createContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import type { ExemplarInterface } from "../../interfaces/exemplarInterface";
import type Locacao from "../../interfaces/locacaoInterface";
import type { StudentInterface } from "../../interfaces/studentInterface";
import { exemplarService } from "../../services/exemplarService";
import { locacaoService } from "../../services/locacaoService";
import { studentService } from "../../services/studentService";

interface LocacoesContextData {
  locacoes: Locacao[] | null;
  alunos: StudentInterface[] | null;
  exemplares: ExemplarInterface[] | null;
  isLoading: boolean;
  createLocacao: (data: Partial<Locacao>) => Promise<void>;
  updateLocacao: (data: { id: number; data: Partial<Locacao> }) => Promise<void>;
  deleteLocacao: (id: number) => Promise<void>;
  findOneLocacao: (id: number) => any;
}

export const LocacoesContext = createContext<LocacoesContextData | null>(null);

export function LocacoesProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // BUSCA GLOBAL
  const { data: locacoes, isLoading } = useQuery({
    queryKey: ["locacoes"],
    queryFn: locacaoService.getAll,
  });

  const { data: alunos } = useQuery({
    queryKey: ["alunos"],
    queryFn: studentService.getAll,
  });

  const { data: exemplares } = useQuery({
    queryKey: ["exemplares"],
    queryFn: exemplarService.getAll,
  });

  // BUSCA INDIVIDUAL COM ENRIQUECIMENTO
  function findOneLocacao(id: number) {
    return useQuery({
      queryKey: ["locacao", id],
      queryFn: async () => {
        const locacao = await locacaoService.getById(id);

        const alunosCache = queryClient.getQueryData<StudentInterface[]>(["alunos"]) || [];
        const exemplaresCache = queryClient.getQueryData<ExemplarInterface[]>(["exemplares"]) || [];

        const aluno = alunosCache.find(a => a.matricula === locacao.matricula_aluno);
        const exemplar = exemplaresCache.find(e => e.id === locacao.id_exemplar);

        return {
          ...locacao,
          aluno,
          exemplar,
        };
      },
      enabled: !!id,
    });
  }

  // CREATE
  const { mutateAsync: createLocacao } = useMutation({
    mutationFn: (data: Partial<Locacao>) => locacaoService.create(data),
    onSuccess: () => {
      toast.success("Sucesso", {description: "Locação criada com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["locacoes"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-resumo"] })
    },
    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao criar locação!"});
    },
  });

  // UPDATE
  const { mutateAsync: updateLocacao } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Locacao> }) =>
      locacaoService.update(String(id), data),

    onSuccess: (updatedLocacao) => {
      toast.success("Sucesso", {description: "Locação atualizada com sucesso!"});

      queryClient.setQueryData<Locacao[]>(["locacoes"], (old) =>
        old
          ? old.map((l) => (l.id === updatedLocacao.id ? updatedLocacao : l))
          : [updatedLocacao]
      );

      queryClient.invalidateQueries({ queryKey: ["locacao", updatedLocacao.id] });
    },

    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao atualizar locação!"});
    },
  });

  // DELETE
  const { mutateAsync: deleteLocacao } = useMutation({
    mutationFn: (id: number) => locacaoService.remove(id),

    onSuccess: (_, id) => {
      toast.success("Sucesso", {description: "Locação deletada com sucesso!"});

      queryClient.setQueryData<Locacao[]>(["locacoes"], (old) =>
        old ? old.filter((l) => l.id !== id) : []
      );
    },

    onError: () => {
      toast.error("Erro ao deletar locação", {description: "Não foi possível excluir a locação."});
    },
  });

  return (
    <LocacoesContext.Provider
      value={{
        locacoes: locacoes || null,
        alunos: alunos || null,
        exemplares: exemplares || null,
        isLoading,
        createLocacao,
        updateLocacao,
        deleteLocacao,
        findOneLocacao,
      }}
    >
      {children}
    </LocacoesContext.Provider>
  );
}
