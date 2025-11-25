import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LivroInterface } from "../../interfaces/livroInterface";
import { livroService } from "../../services/livroService";

interface LivrosContextData {
  livros: LivroInterface[] | null;
  isLoading: boolean;
}

export const LivrosContext = createContext<LivrosContextData | null>(null);

export function LivrosProvider({ children }: { children: ReactNode }) {
  const { data: livros, isLoading } = useQuery({
    queryKey: ["livros"],
    queryFn: livroService.getAll,
  });

  return (
    <LivrosContext.Provider
      value={{
        livros,
        isLoading,
      }}
    >
      {children}
    </LivrosContext.Provider>
  );
}
