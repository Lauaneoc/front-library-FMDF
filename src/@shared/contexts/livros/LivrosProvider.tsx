import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { toast } from 'sonner';
import type { LivroInterface } from "../../interfaces/livroInterface";
import { livroService } from "../../services/livroService";

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
      toast.success("Sucesso", {description: "Livro cadastrado com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["livros"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-resumo"] })
    },
    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao cadastrar livro!"});
    },
  })

  const updateOneBook = useMutation({
    mutationFn: (
      value: LivroInterface
    ) => livroService.update(value.isbn, value),
    onSuccess: () => {
      toast.success("Sucesso", {description: "Livro atualizado com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["livros"] })
    },
    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao atualizar livro!"});
    },
  })

  const {mutateAsync: deleteOneBook, isPending: isPendingDeleteBook} = useMutation({
    mutationFn: (
      value: string
    ) => livroService.remove(value),
    onSuccess: () => {
      toast.success("Sucesso", {description: "Livro deletado com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["livros"] })
    },
    onError: () => {
      toast.error("Erro ao deletar livro", {description: "Não foi possível excluir o livro."});
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
