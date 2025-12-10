import { createContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type Locacao from "../../interfaces/locacaoInterface";
import type { StudentInterface } from "../../interfaces/studentInterface";
import type { ExemplarInterface } from "../../interfaces/exemplarInterface";
import { locacaoService } from "../../services/locacaoService";
import { studentService } from "../../services/studentService";
import { exemplarService } from "../../services/exemplarService";
import { toast } from "../../../hooks/use-toast";

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
      toast({
        title: "Sucesso",
        description: "Locação criada com sucesso!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["locacoes"] })
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar locação!",
        variant: "destructive",
      });
    },
  });

  // UPDATE
  const { mutateAsync: updateLocacao } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Locacao> }) =>
      locacaoService.update(String(id), data),

    onSuccess: (updatedLocacao) => {
      toast({
        title: "Sucesso",
        description: "Locação atualizada com sucesso!",
        variant: "default",
      });

      queryClient.setQueryData<Locacao[]>(["locacoes"], (old) =>
        old
          ? old.map((l) => (l.id === updatedLocacao.id ? updatedLocacao : l))
          : [updatedLocacao]
      );

      queryClient.invalidateQueries({ queryKey: ["locacao", updatedLocacao.id] });
    },

    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar locação!",
        variant: "destructive",
      });
    },
  });

  // DELETE
  const { mutateAsync: deleteLocacao } = useMutation({
    mutationFn: (id: number) => locacaoService.remove(id),

    onSuccess: (_, id) => {
      toast({
        title: "Sucesso",
        description: "Locação deletada com sucesso!",
        variant: "default",
      });

      queryClient.setQueryData<Locacao[]>(["locacoes"], (old) =>
        old ? old.filter((l) => l.id !== id) : []
      );
    },

    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao deletar locação!",
        variant: "destructive",
      });
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
