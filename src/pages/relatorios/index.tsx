
import { FileText, Download, BarChart3, Users, BookOpen, Calendar, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { AppSidebar } from "../../components/app-sidebar"
import { AppHeader } from "../../components/app-header"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

const reportCards = [
  {
    title: "Relatório de Locações",
    description: "Lista completa de todas as locações realizadas no período",
    icon: BookOpen,
    category: "Locações",
    formats: ["CSV", "PDF"],
    lastGenerated: "Hoje, 14:30",
  },
  {
    title: "Relatório de Alunos",
    description: "Dados dos alunos cadastrados e suas estatísticas de empréstimos",
    icon: Users,
    category: "Alunos",
    formats: ["CSV", "PDF"],
    lastGenerated: "Ontem, 16:45",
  },
  {
    title: "Relatório de Livros",
    description: "Inventário completo de livros e exemplares disponíveis",
    icon: FileText,
    category: "Acervo",
    formats: ["CSV", "PDF"],
    lastGenerated: "2 dias atrás",
  },
  {
    title: "Relatório de Atrasos",
    description: "Lista de locações em atraso e histórico de devoluções tardias",
    icon: AlertTriangle,
    category: "Atrasos",
    formats: ["CSV", "PDF"],
    lastGenerated: "Hoje, 09:15",
  },
  {
    title: "Estatísticas Mensais",
    description: "Resumo estatístico das atividades da biblioteca no mês",
    icon: BarChart3,
    category: "Estatísticas",
    formats: ["PDF"],
    lastGenerated: "Semana passada",
  },
  {
    title: "Relatório de Turmas",
    description: "Dados das turmas e estatísticas de uso da biblioteca por classe",
    icon: Calendar,
    category: "Turmas",
    formats: ["CSV", "PDF"],
    lastGenerated: "3 dias atrás",
  },
  {
    title: "Análise de Tendências",
    description: "Análise de padrões de empréstimos e uso do acervo",
    icon: TrendingUp,
    category: "Análises",
    formats: ["PDF"],
    lastGenerated: "Semana passada",
  },
]

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Locações: "bg-primary text-primary-foreground",
    Alunos: "bg-chart-2 text-primary-foreground",
    Acervo: "bg-chart-3 text-primary-foreground",
    Atrasos: "bg-destructive text-destructive-foreground",
    Estatísticas: "bg-chart-4 text-primary-foreground",
    Turmas: "bg-chart-5 text-primary-foreground",
    Análises: "bg-chart-1 text-primary-foreground",
  }
  return colors[category] || "bg-muted text-muted-foreground"
}

export default function RelatoriosPage() {
  return (
    <div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Relatórios</h2>
                <p className="text-muted-foreground">
                  Gere e exporte relatórios detalhados sobre as atividades da biblioteca
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportCards.map((report, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <report.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <Badge className={getCategoryColor(report.category)} variant="secondary">
                            {report.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Formatos disponíveis:</p>
                        <div className="flex gap-2">
                          {report.formats.map((format) => (
                            <Button key={format} variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Exportar {format}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">Última geração: {report.lastGenerated}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Rápidas</CardTitle>
                <CardDescription>Resumo das atividades recentes da biblioteca</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">156</div>
                    <div className="text-sm text-muted-foreground">Locações Ativas</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">23</div>
                    <div className="text-sm text-muted-foreground">Em Atraso</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-chart-3">89</div>
                    <div className="text-sm text-muted-foreground">Devoluções Hoje</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-chart-4">1,247</div>
                    <div className="text-sm text-muted-foreground">Total de Alunos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  )
}
