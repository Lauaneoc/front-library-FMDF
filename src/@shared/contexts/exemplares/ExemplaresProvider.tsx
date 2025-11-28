import { createContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExemplarInterface } from "../../interfaces/exemplarInterface";
import { exemplarService } from "../../services/exemplarService";
import { toast } from "../../../hooks/use-toast";

interface ExemplaresContextData {
  exemplares: ExemplarInterface[] | null;
  isLoading: boolean;
  createOneExemplar: any;
  updateOneExemplar: any;
  deleteOneExemplar: any;
  findOneExemplar: any;
  isPendingCreateExemplar: boolean;
  isPendingUpdateExemplar: boolean;
  isPendingDeleteExemplar: boolean;
}

export const ExemplaresContext = createContext<ExemplaresContextData | null>(
  null
);

export function ExemplaresProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: exemplares, isLoading } = useQuery({
    queryKey: ["exemplares"],
    queryFn: exemplarService.getAll,
  });

  function findOneExemplar(id: number) {
    return useQuery({
      queryKey: ["exemplar", id],
      queryFn: () => exemplarService.getById(id),
      enabled: !!id,
    });
  }

  const { mutateAsync: createOneExemplar, isPending: isPendingCreateExemplar } =
    useMutation({
      mutationFn: (value: ExemplarInterface) => exemplarService.create(value),
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Exemplar cadastrado com sucesso!",
          variant: "default",
        });
        queryClient.invalidateQueries({ queryKey: ["exemplares"] });
      },
      onError: () => {
        toast({
          title: "Erro",
          description: "Erro ao cadastrar exemplar!",
          variant: "destructive",
        });
      },
    });

  const {mutateAsync: updateOneExemplar, isPending: isPendingUpdateExemplar} = useMutation({
    mutationFn: (value: ExemplarInterface) =>
      exemplarService.update(value.id, value),
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Exemplar atualizado com sucesso!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["exemplares"] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar exemplar!",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: deleteOneExemplar, isPending: isPendingDeleteExemplar } =
    useMutation({
      mutationFn: (value: number) => exemplarService.remove(value),
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Exemplar deletado com sucesso!",
          variant: "default",
        });
        queryClient.invalidateQueries({ queryKey: ["exemplares"] });
      },
      onError: () => {
        toast({
          title: "Erro",
          description: "Erro ao deletar exemplar!",
          variant: "destructive",
        });
      },
    });

  return (
    <ExemplaresContext.Provider
      value={{
        exemplares,
        isLoading,
        createOneExemplar,
        updateOneExemplar,
        findOneExemplar,
        deleteOneExemplar,
        isPendingCreateExemplar,
        isPendingUpdateExemplar,
        isPendingDeleteExemplar,
      }}
    >
      {children}
    </ExemplaresContext.Provider>
  );
}
