import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ExemplarInterface } from "../../interfaces/exemplarInterface";
import { exemplarService } from "../../services/exemplarService";

interface ExemplaresContextData {
  exemplares: ExemplarInterface[] | null;
  isLoading: boolean;
}

export const ExemplaresContext = createContext<ExemplaresContextData | null>(null);

export function ExemplaresProvider({ children }: { children: ReactNode }) {
  const { data: exemplares, isLoading } = useQuery({
    queryKey: ["exemplares"],
    queryFn: exemplarService.getAll,
  });

  return (
    <ExemplaresContext.Provider
      value={{
        exemplares,
        isLoading,
      }}
    >
      {children}
    </ExemplaresContext.Provider>
  );
}
