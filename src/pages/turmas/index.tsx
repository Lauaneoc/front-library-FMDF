"use client"
import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { Button } from "../../components/ui/button"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { TurmasProvider } from "../../@shared/contexts/turmas/TurmasProvider"
import { useTurmas } from "../../@shared/contexts/turmas/useTurmas"
import { TurmaInterface } from "../../@shared/interfaces/turmaInterface"
import { StudentProvider } from "../../@shared/contexts/student/StudentProvider"
import { useStudent } from "../../@shared/contexts/student/useStudent"

const columns = [
  { key: "id", label: "ID" },
  { key: "curso", label: "Curso" },
  { key: "serie", label: "Série" },
  { key: "ano_letivo", label: "Ano Letivo", className: "text-center" },
  { key: "qtdAlunos", label: "Qtd. Alunos", className: "text-center" },
]

const filters = [
  { key: "curso", label: "Curso", type: "text" as const },
  { key: "serie", label: "Série", type: "text" as const },
  { key: "ano_letivo", label: "Ano Letivo", type: "text" as const },
]

function Page() {
  const { turmas } = useTurmas()
  const { students } = useStudent()

  const studentCounts = useMemo(() => {
    const map = new Map<number, number>();
    ;(students ?? []).forEach((s: any) => {
      const key = s.id_turma
      map.set(key, (map.get(key) || 0) + 1)
    })
    return map
  }, [students])

  const dataWithCounts = (turmas as TurmaInterface[] | null)?.map((t) => ({
    ...t,
    qtdAlunos: studentCounts.get(t.id) ?? 0,
  })) ?? []

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
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Gerenciar Turmas</h1>
          <p className="text-sm md:text-base text-muted-foreground">Visualize e gerencie todas as turmas cadastradas no sistema</p>
        </div>
        <Button className="shadow-sm hover:shadow-md transition-shadow" onClick={() => navigate('/turmas/nova')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Turma
        </Button>
      </div>

      <div className="glass-effect rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Lista de Turmas</h2>
          <FiltersDrawer filters={filters} />
        </div>

        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <TableSimple
            columns={columns}
            data={dataWithCounts}
            actions={renderActions}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: (page) => console.log("Page:", page),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function TurmasPage() {
  return (
    <StudentProvider>
      <TurmasProvider>
        <Page />
      </TurmasProvider>
    </StudentProvider>
  )
}
