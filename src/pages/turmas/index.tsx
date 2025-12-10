"use client"

import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import { Button } from "../../components/ui/button"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { TurmasProvider } from "../../@shared/contexts/turmas/TurmasProvider"
import { useTurmas } from "../../@shared/contexts/turmas/useTurmas"
import { TurmaInterface } from "../../@shared/interfaces/turmaInterface"
import { StudentProvider } from "../../@shared/contexts/student/StudentProvider"
import { useStudent } from "../../@shared/contexts/student/useStudent"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { maskTurmaId } from "../../utils/masks"

const columns = [
  { key: "id", label: "ID", render: (value: string) => maskTurmaId(value) },
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

function InnerTurmasPage() {
  const { turmas, deleteOneTurma, isPendingDeleteTurma } = useTurmas()
  const { students } = useStudent()

  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const studentCounts = useMemo(() => {
    const map = new Map<number, number>()
    ;(students ?? []).forEach((s: any) => {
      const key = Number(s.id_turma)
      map.set(key, (map.get(key) || 0) + 1)
    })
    return map
  }, [students])

  const dataWithCounts = (turmas as TurmaInterface[] | null)?.map(t => ({
    id: t.id,
    curso: t.curso,
    serie: t.serie,
    ano_letivo: t.ano_letivo,
    qtdAlunos: studentCounts.get(t.id) ?? 0,
  })) ?? []

  const handleConfirmDelete = async () => {
    if (!deleteId) return
    await deleteOneTurma(deleteId)
    setDeleteId(null)
  }

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

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDeleteId(row.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )

  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()

  const filteredData = useMemo(() => {
    return dataWithCounts.filter(row => {
      if (activeFilters.curso && !normalize(row.curso).includes(normalize(activeFilters.curso))) return false
      if (activeFilters.serie && !normalize(row.serie).includes(normalize(activeFilters.serie))) return false
      if (
        activeFilters.ano_letivo &&
        !row.ano_letivo?.toString().includes(activeFilters.ano_letivo)
      ) return false
      return true
    })
  }, [dataWithCounts, activeFilters])

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Gerenciar Turmas</h1>
            <p className="text-sm text-muted-foreground">Gerencie todas as turmas cadastradas</p>
          </div>

          <Link to="/turmas/nova">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Turma
            </Button>
          </Link>
        </div>

        <div className="glass-effect rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold">Lista de Turmas</h2>
            <FiltersDrawer filters={filters} onFiltersChange={setActiveFilters} />
          </div>

          <div className="rounded-lg border overflow-hidden bg-card">
            <TableSimple
              columns={columns}
              data={filteredData}
              actions={renderActions}
              pagination={{
                currentPage: 1,
                totalPages: 1,
                onPageChange: page => console.log("Page:", page),
              }}
            />
          </div>
        </div>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Remover Turma</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação é irreversível. Deseja continuar?
          </AlertDialogDescription>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isPendingDeleteTurma}
              className="bg-destructive text-white"
            >
              {isPendingDeleteTurma ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default function TurmasPage() {
  return (
    <StudentProvider>
      <TurmasProvider>
        <InnerTurmasPage />
      </TurmasProvider>
    </StudentProvider>
  )
}
