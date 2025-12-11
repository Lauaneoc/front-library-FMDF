import { BookOpen, Users, GraduationCap, AlertTriangle } from "lucide-react";
import { StatsCard } from "../../components/stats-card";
import { ChartPlaceholder } from "../../components/chart-placeholder";
import { useDashboard } from "../../@shared/contexts/dashboard/useDashboard";
import { DashboardProvider } from "../../@shared/contexts/dashboard/DashboardProvider";
import { LocacoesPorMesChart } from "../../components/charts/LocacoesPorMesChart";
import { LivrosMaisEmprestadosChart } from "../../components/charts/livrosMaisEmprestadosChart";

function Page() {
  const {
    resumo,
    livrosMaisEmprestados,
    locacoesPorMes,
    anoSelecionado,
    setAnoSelecionado,
    isLoadingResumo,
    isLoadingLocacoesMes,
  } = useDashboard();

  if (isLoadingResumo) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <p>Carregando dashboard...</p>
      </main>
    );
  }

  console.log({locacoesPorMes})

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Alunos"
            value={resumo?.alunos ?? 0}
            description="Alunos cadastrados"
            icon={Users}
          />

          <StatsCard
            title="Livros Cadastrados"
            value={resumo?.livros ?? 0}
            description="Total de livros"
            icon={BookOpen}
          />

          <StatsCard
            title="Locações Ativas"
            value={resumo?.locacoes_ativas ?? 0}
            description="Empréstimos em andamento"
            icon={GraduationCap}
          />

          <StatsCard
            title="Atrasos"
            value={resumo?.locacoes_atraso ?? 0}
            description="Devoluções em atraso"
            icon={AlertTriangle}
          />
        </div>

        {/* SELECT DO ANO */}
        <div className="flex justify-end mb-4">
          <select
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(Number(e.target.value))}
            className="border rounded p-2"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {!isLoadingLocacoesMes && locacoesPorMes ? (
            <LocacoesPorMesChart data={locacoesPorMes} />
          ) : (
            <ChartPlaceholder title="Locações por Mês" height={350} />
          )}

          {livrosMaisEmprestados ? (
            <LivrosMaisEmprestadosChart data={livrosMaisEmprestados} />
          ) : (
            <ChartPlaceholder title="Livros Mais Emprestados" height={350} />
          )}

        </div>

      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <Page />
    </DashboardProvider>
  );
}
