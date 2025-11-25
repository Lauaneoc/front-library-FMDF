import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BibliotecarioInterface } from "../../interfaces/bibliotecarioInterface";
import { bibliotecarioService } from "../../services/bibliotecarioService";

interface BibliotecarioContextData {
  bibliotecario: BibliotecarioInterface | null;
  isLoading: boolean;
}

export const BibliotecarioContext = createContext<BibliotecarioContextData | null>(null);

export function BibliotecarioProvider({ 
  children, 
  id = 1 
}: { 
  children: ReactNode
  id?: number
}) {
  const { data: bibliotecario, isLoading } = useQuery({
    queryKey: ["bibliotecario", id],
    queryFn: () => bibliotecarioService.getById(id),
  });

  return (
    <BibliotecarioContext.Provider
      value={{
        bibliotecario: bibliotecario ?? null,
        isLoading,
      }}
    >
      {children}
    </BibliotecarioContext.Provider>
  );
}
