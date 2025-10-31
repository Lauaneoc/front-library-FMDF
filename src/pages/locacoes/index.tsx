"use client"

import { Plus, Edit, Eye, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { StatusBadge } from "../../components/status-badge"
import { WizardDialog } from "../../components/wizard-dialog"
import { AppSidebar } from "../../components/app-sidebar"
import { AppHeader } from "../../components/app-header"

// Mock data
const mockRentals = [
  {
    id: "LOC001",
    aluno: "Ana Silva Santos (2024001)",
    exemplar: "EX001 - Matemática - Volume 1",
    status: "Aberto",
    retirada: "15/01/2024",
    prevista: "29/01/2024",
    devolucao: "-",
    bibliotecario: "João Bibliotecário",
  },
  {
    id: "LOC002",
    aluno: "Carlos Eduardo Lima (2024002)",
    exemplar: "EX045 - História do Brasil",
    status: "Finalizado",
    retirada: "02/01/2024",
    prevista: "16/01/2024",
    devolucao: "14/01/2024",
    bibliotecario: "Maria Bibliotecária",
  },
  {
    id: "LOC003",
    aluno: "Maria Fernanda Costa (2024003)",
    exemplar: "EX123 - Física Moderna",
    status: "Aberto",
    retirada: "20/12/2023",
    prevista: "03/01/2024",
    devolucao: "-",
    bibliotecario: "João Bibliotecário",
  },
]

const columns = [
  { key: "id", label: "ID" },
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
  const [isWizardOpen, setIsWizardOpen] = useState(false)

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
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Locações" />

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
                    data={mockRentals.map((rental) => ({
                      ...rental,
                      status: <StatusBadge status={rental.status as any} />,
                    }))}
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
      </div>

      <WizardDialog
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        title="Nova Locação"
        description="Siga os passos para criar uma nova locação"
      />
    </div>
  )
}
