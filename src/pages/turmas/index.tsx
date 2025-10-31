import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { AppSidebar } from "../../components/app-sidebar"
import { AppHeader } from "../../components/app-header"

// Mock data
const mockClasses = [
  {
    id: "T001",
    curso: "Ensino Médio",
    serie: "1º Ano",
    anoLetivo: "2024",
    qtdAlunos: 32,
  },
  {
    id: "T002",
    curso: "Ensino Médio",
    serie: "1º Ano",
    anoLetivo: "2024",
    qtdAlunos: 28,
  },
  {
    id: "T003",
    curso: "Ensino Médio",
    serie: "2º Ano",
    anoLetivo: "2024",
    qtdAlunos: 30,
  },
  {
    id: "T004",
    curso: "Ensino Médio",
    serie: "3º Ano",
    anoLetivo: "2024",
    qtdAlunos: 25,
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "curso", label: "Curso" },
  { key: "serie", label: "Série" },
  { key: "anoLetivo", label: "Ano Letivo", className: "text-center" },
  { key: "qtdAlunos", label: "Qtd. Alunos", className: "text-center" },
]

const filters = [
  {
    key: "curso",
    label: "Curso",
    type: "select" as const,
    options: [
      { value: "ensino_medio", label: "Ensino Médio" },
      { value: "ensino_fundamental", label: "Ensino Fundamental" },
    ],
  },
  {
    key: "serie",
    label: "Série",
    type: "select" as const,
    options: [
      { value: "1ano", label: "1º Ano" },
      { value: "2ano", label: "2º Ano" },
      { value: "3ano", label: "3º Ano" },
      { value: "4ano", label: "4º Ano" },
    ],
  },
  {
    key: "anoLetivo",
    label: "Ano Letivo",
    type: "select" as const,
    options: [
      { value: "2024", label: "2024" },
      { value: "2023", label: "2023" },
    ],
  },
]

export default function TurmasPage() {
  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Link to={`/turmas/${row.id}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={`/turmas/${row.id}/editar`}>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="ghost" size="sm">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )

  const navigate = useNavigate()

  return (
    <div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Gerenciar Turmas</h2>
                <p className="text-muted-foreground">Visualize e gerencie todas as turmas cadastradas no sistema</p>
              </div>
                <Button onClick={() => {navigate("/turmas/nova")}}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Turma
                </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Turmas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FiltersDrawer filters={filters} />
                  <TableSimple
                    columns={columns}
                    data={mockClasses}
                    actions={renderActions}
                    pagination={{
                      currentPage: 1,
                      totalPages: 1,
                      onPageChange: (page) => console.log("Page:", page),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  )
}
