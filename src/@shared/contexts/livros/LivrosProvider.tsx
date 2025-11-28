import { createContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { LivroInterface } from "../../interfaces/livroInterface";
import { livroService } from "../../services/livroService";
import { toast } from "../../../hooks/use-toast";

interface LivrosContextData {
  livros: LivroInterface[] | null;
  isLoading: boolean;
  createOneBook: any;
  updateOneBook: any
  deleteOneBook: any;
  isPendingDeleteBook: any
  isPendingCreateBook: any
  findOneBook: any
}

export const LivrosContext = createContext<LivrosContextData | null>(null);

export function LivrosProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: livros, isLoading } = useQuery({
    queryKey: ["livros"],
    queryFn: livroService.getAll,
  });


  function findOneBook(isbn: string) {
      return useQuery({
        queryKey: ["livro", isbn],
        queryFn: () => livroService.getByIsbn(isbn),
        enabled: !!isbn,
      });
  }

   const {mutateAsync: createOneBook, isPending: isPendingCreateBook} = useMutation({
    mutationFn: (
      value: LivroInterface
    ) => livroService.create(value),
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Livro cadastrado com sucesso!",
        variant: "default"
      })
      queryClient.invalidateQueries({ queryKey: ["livros"] })
    },
    onError: () => {
      toast({
          title: "Erro",
          description: "Erro ao cadastrar livro!",
          variant: "destructive"
      })
    },
  })

  const updateOneBook = useMutation({
    mutationFn: (
      value: LivroInterface
    ) => livroService.update(value.isbn, value),
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Livro atualizado com sucesso!",
        variant: "default"
      })
      queryClient.invalidateQueries({ queryKey: ["livros"] })
    },
    onError: () => {
      toast({
          title: "Erro",
          description: "Erro ao atualizar livro!",
          variant: "destructive"
      })
    },
  })

  const {mutateAsync: deleteOneBook, isPending: isPendingDeleteBook} = useMutation({
    mutationFn: (
      value: string
    ) => livroService.remove(value),
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Livro deletado com sucesso!",
        variant: "default"
      })
      queryClient.invalidateQueries({ queryKey: ["livros"] })
    },
    onError: () => {
      toast({
          title: "Erro",
          description: "Erro ao deletar livro!",
          variant: "destructive"
      })
    },
  })

  return (
    <LivrosContext.Provider
      value={{
        livros,
        isLoading,
        createOneBook,
        isPendingCreateBook,
        updateOneBook,
        findOneBook,
        deleteOneBook,
        isPendingDeleteBook
      }}
    >
      {children}
    </LivrosContext.Provider>
  );
}
