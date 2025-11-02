import { BookOpen, Users, GraduationCap, AlertTriangle } from "lucide-react"
import { AppSidebar } from "../../components/app-sidebar"
import { AppHeader } from "../../components/app-header"
import { StatsCard } from "../../components/stats-card"
import { ChartPlaceholder } from "../../components/chart-placeholder"

export default function DashboardPage() {
  return (
    

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total de Alunos"
                value="1,247"
                description="Alunos cadastrados"
                icon={Users}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Livros Disponíveis"
                value="3,892"
                description="Exemplares em estoque"
                icon={BookOpen}
                trend={{ value: 5, isPositive: true }}
              />
              <StatsCard
                title="Locações Ativas"
                value="156"
                description="Empréstimos em andamento"
                icon={GraduationCap}
                trend={{ value: -8, isPositive: false }}
              />
              <StatsCard
                title="Atrasos"
                value="23"
                description="Devoluções em atraso"
                icon={AlertTriangle}
                trend={{ value: -15, isPositive: true }}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartPlaceholder title="Locações por Mês" height={350} />
              <ChartPlaceholder title="Livros Mais Emprestados" height={350} />
            </div>
          </div>
        </main>
      
  )
}
