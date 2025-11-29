import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { StudentProvider } from "../../@shared/contexts/student/StudentProvider"
import { useStudent } from "../../@shared/contexts/student/useStudent"
import { StudentInterface } from "../../@shared/interfaces/studentInterface"
import { studentService } from "../../@shared/services/studentService"
import { queryClient } from "../../@shared/api/queryClient"
import { useToast } from "../../hooks/use-toast"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../components/ui/alert-dialog"
import { useState } from "react"
import { maskCPF } from "../../utils/masks"

const columns = [
  { key: "matricula", label: "Matrícula" },
  { key: "nome", label: "Nome" },
  { key: "cpf", label: "CPF", render: (value: string) => maskCPF(value) },
  {
    key: "data_nascimento",
    label: "Nascimento",
    render: (value: string) => new Date(value).toLocaleDateString("pt-BR"),
  },
  { key: "id_turma", label: "ID da Turma", className: "text-center" },
];

const filters = [
  { key: "nome", label: "Nome", type: "text" as const },
  {
    key: "turma",
    label: "Turma",
    type: "select" as const,
    options: [
      { value: "1ano", label: "1º Ano" },
      { value: "2ano", label: "2º Ano" },
      { value: "3ano", label: "3º Ano" },
      { value: "4ano", label: "4º Ano" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { value: "ativo", label: "Ativo" },
      { value: "inativo", label: "Inativo" },
      { value: "com_atraso", label: "Com Atraso" },
    ],
  },
]

function Page() {

  const navigate = useNavigate()
  const { students, deleteOneStudent, isPendingDeleteStudent } = useStudent()

  const [deleteMatricula, setDeleteMatricula] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const handleDeleteClick = (matricula: string) => {
    setDeleteMatricula(matricula)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deleteMatricula) return
    await deleteOneStudent(deleteMatricula)
    setDeleteMatricula(null)
    setConfirmOpen(false)
  }

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
        <Link to={`/alunos/${row.matricula}`}>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
        <Link to={`/alunos/${row.matricula}/editar`}>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(row.matricula)}>
          <Trash2 className="h-4 w-4" />
        </Button>
    </div>
  )

  const handleFiltersChange = (filters: Record<string, string>) => {
    setActiveFilters(filters)
  }

  const filteredStudents = (students ?? []).filter((student) => {
    if (activeFilters.nome && !student.nome.toLowerCase().includes(activeFilters.nome.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Gerenciar Alunos</h1>
          <p className="text-sm md:text-base text-muted-foreground">Visualize e gerencie todos os alunos cadastrados no sistema</p>
        </div>
        <Button className="shadow-sm hover:shadow-md transition-shadow" onClick={() => navigate("/alunos/novo")}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Aluno
        </Button>
      </div>

      <div className="glass-effect rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Lista de Alunos</h2>
          <FiltersDrawer filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <TableSimple
            columns={columns}
            data={filteredStudents}
            actions={renderActions}
            pagination={{
              currentPage: 1,
              totalPages: 3,
              onPageChange: (page) => console.log("Page:", page),
            }}
          />
        </div>
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent className="bg-white border border-border text-foreground">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} disabled={isPendingDeleteStudent}>
                {isPendingDeleteStudent ? 'Apagando...' : 'Excluir'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default function AlunosPage() {
  return (
    <StudentProvider>
      <Page />
    </StudentProvider>
  )
}
