import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { TurmaInterface } from "../../interfaces/turmaInterface";
import { turmaService } from "../../services/turmaService";

interface TurmaContextData {
  turmas: TurmaInterface[] | null;
  isLoading: boolean;
}

export const TurmasContext = createContext<TurmaContextData | null>(null);

export function TurmasProvider({ children }: { children: ReactNode }) {
  const { data: turmas, isLoading } = useQuery({
    queryKey: ["turmas"],
    queryFn: turmaService.getAll,
  });

  return (
    <TurmasContext.Provider
      value={{
        turmas,
        isLoading,
      }}
    >
      {children}
    </TurmasContext.Provider>
  );
}
