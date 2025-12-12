"use client"

import { Plus, Edit, Eye, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { LocacoesProvider } from "../../@shared/contexts/locacoes/LocacoesProvider"
import { useLocacoes } from "../../@shared/contexts/locacoes/useLocacoes"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { StatusBadge } from "../../components/status-badge"
import { WizardDialog } from "../../components/wizard-dialog"
import { maskLocacaoId } from "../../utils/masks"

// (dados vindos da API via LocacoesProvider)

const columns = [
  { key: "id", label: "ID", render: (value: string) => maskLocacaoId(value) },
  { key: "aluno", label: "Aluno (Matrícula)" },
  { key: "exemplar", label: "Exemplar (ID + Livro)" },
  {
    key: "status",
    label: "Status",
  },
  { key: "retirada", label: "Retirada" },
  { key: "prevista", label: "Prevista" },
  { key: "devolucao", label: "Devolução" },
  { key: "bibliotecario", label: "Bibliotecário" },
]

const filters = [
  { key: "aluno", label: "Aluno", type: "text" as const },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { value: "aberto", label: "Aberto" },
      { value: "finalizado", label: "Finalizado" },
      { value: "atrasado", label: "Atrasado" },
    ],
  },
  { key: "dataInicio", label: "Data Início", type: "date" as const },
  { key: "dataFim", label: "Data Fim", type: "date" as const },
]

export default function LocacoesPage() {
  return (
    <LocacoesProvider>
      <InnerLocacoesPage />
    </LocacoesProvider>
  )
}

function InnerLocacoesPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const { locacoes } = useLocacoes()

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Link to={`/locacoes/${row.id}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      {row.status === "Aberto" && (
        <Button variant="ghost" size="sm">
          <BookOpen className="h-4 w-4" />
        </Button>
      )}
      <Link to={`/locacoes/${row.id}/editar`}>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )

  const data = (locacoes || []).map((l) => ({
    id: l.id,
    aluno: l.aluno || l.matricula_aluno || "-",
    exemplar: l.exemplar ? `EX${l.exemplar.toString().padStart(3, "0")}` : String(l.id_exemplar || "-"),
    status: <StatusBadge
    status={
      l.data_devolucao
        ? "Finalizado" : new Date() > new Date(l.data_prevista)
          ? "Em atraso"
        : "Aberto"
    }
  />,
    retirada: l.data_emprestimo ? new Date(l.data_emprestimo).toLocaleDateString() : "-",
    prevista: l.data_prevista ? new Date(l.data_prevista).toLocaleDateString() : "-",
    devolucao: l.data_devolucao ? new Date(l.data_devolucao).toLocaleDateString() : "-",
    bibliotecario: l.bibliotecario || "-",
  }))

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Gerenciar Locações</h2>
              <p className="text-muted-foreground">Visualize e gerencie todas as locações do sistema</p>
            </div>
            <Button onClick={() => setIsWizardOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Locação
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Locações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FiltersDrawer filters={filters} />
                <TableSimple
                  columns={columns}
                  data={data}
                  actions={renderActions}
                  pagination={{
                    currentPage: 1,
                    totalPages: 4,
                    onPageChange: (page) => console.log("Page:", page),
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <WizardDialog
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        title="Nova Locação"
        description="Siga os passos para criar uma nova locação"
      />
    </>
  )
}
