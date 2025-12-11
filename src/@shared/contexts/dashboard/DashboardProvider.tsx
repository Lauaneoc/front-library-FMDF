// DashboardProvider.tsx
import { createContext, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DisponibilidadeExemplares,
  LivroMaisEmprestado,
  LocacaoAtraso,
  ResumoDashboard,
} from "../../interfaces/dashboardInterface";
import { dashboardService } from "../../services/dashboardService";

interface DashboardContextData {
  resumo: ResumoDashboard | null;
  livrosMaisEmprestados: LivroMaisEmprestado[] | null;
  locacoesAtraso: LocacaoAtraso[] | null;
  disponibilidade: DisponibilidadeExemplares | null;

  locacoesPorMes: any[] | null;
  anoSelecionado: number;
  setAnoSelecionado: (ano: number) => void;

  isLoadingResumo: boolean;
  isLoadingLivros: boolean;
  isLoadingAtraso: boolean;
  isLoadingDisponibilidade: boolean;
  isLoadingLocacoesMes: boolean;
}

export const DashboardContext = createContext<DashboardContextData | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [anoSelecionado, setAnoSelecionado] = useState<number>(new Date().getFullYear());

  // queries estáticas
  const { data: resumo, isLoading: isLoadingResumo } = useQuery({
    queryKey: ["dashboard-resumo"],
    queryFn: () => dashboardService.getResumo(),
  });

  const { data: livrosMaisEmprestados, isLoading: isLoadingLivros } = useQuery({
    queryKey: ["dashboard-livros-mais-emprestados"],
    queryFn: () => dashboardService.getLivrosMaisEmprestados(),
  });

  const { data: locacoesAtraso, isLoading: isLoadingAtraso } = useQuery({
    queryKey: ["dashboard-locacoes-atraso"],
    queryFn: () => dashboardService.getLocacoesAtraso(),
  });

  const { data: disponibilidade, isLoading: isLoadingDisponibilidade } = useQuery({
    queryKey: ["dashboard-disponibilidade"],
    queryFn: () => dashboardService.getDisponibilidadeExemplares(),
  });

  // query dependente do ano selecionado
  const { data: locacoesPorMes, isLoading: isLoadingLocacoesMes } = useQuery({
    queryKey: ["dashboard-locacoes-por-mes", anoSelecionado],
    queryFn: () => dashboardService.getLocacoesPorMes(anoSelecionado),
    enabled: !!anoSelecionado,
  });

  return (
    <DashboardContext.Provider
      value={{
        resumo: resumo ?? null,
        livrosMaisEmprestados: livrosMaisEmprestados ?? null,
        locacoesAtraso: locacoesAtraso ?? null,
        disponibilidade: disponibilidade ?? null,

        locacoesPorMes: locacoesPorMes ?? null,
        anoSelecionado,
        setAnoSelecionado,

        isLoadingResumo,
        isLoadingLivros,
        isLoadingAtraso,
        isLoadingDisponibilidade,
        isLoadingLocacoesMes,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
