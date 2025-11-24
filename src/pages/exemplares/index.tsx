import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { EstadoBadge } from "../../components/estado-badge"
import { Badge } from "../../components/ui/badge"
import { ExemplaresProvider } from "../../@shared/contexts/exemplares/ExemplaresProvider"
import { useExemplares } from "../../@shared/contexts/exemplares/useExemplares"
import { ExemplarInterface } from "../../@shared/interfaces/exemplarInterface"

// Mock data
const mockCopies = [
  {
    id: "EX001",
    livro: "Matemática - Volume 1",
    estado: "Novo",
    anoInicio: "2024",
    anoFim: "2026",
    disponibilidade: "Disponível",
  },
  {
    id: "EX002",
    livro: "História do Brasil",
    estado: "Regular",
    anoInicio: "2023",
    anoFim: "2025",
    disponibilidade: "Emprestado",
  },
  {
    id: "EX003",
    livro: "Física Moderna",
    estado: "Danificado",
    anoInicio: "2022",
    anoFim: "2024",
    disponibilidade: "Disponível",
  },
  {
    id: "EX004",
    livro: "Literatura Brasileira",
    estado: "Perdido",
    anoInicio: "2021",
    anoFim: "2023",
    disponibilidade: "Indisponível",
  },
  {
    id: "EX005",
    livro: "Matemática - Volume 1",
    estado: "Regular",
    anoInicio: "2024",
    anoFim: "2026",
    disponibilidade: "Disponível",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "livro", label: "Livro" },
  {
    key: "estado",
    label: "Estado",
  },
  { key: "anos", label: "Anos" },
  {
    key: "disponibilidade",
    label: "Disponibilidade",
  },
]

const filters = [
  { key: "livro", label: "Livro", type: "text" as const },
  {
    key: "estado",
    label: "Estado",
    type: "select" as const,
    options: [
      { value: "novo", label: "Novo" },
      { value: "regular", label: "Regular" },
      { value: "danificado", label: "Danificado" },
      { value: "perdido", label: "Perdido" },
    ],
  },
  {
    key: "disponibilidade",
    label: "Disponibilidade",
    type: "select" as const,
    options: [
      { value: "disponivel", label: "Disponível" },
      { value: "emprestado", label: "Emprestado" },
      { value: "indisponivel", label: "Indisponível" },
    ],
  },
]

export default function ExemplaresPage() {
  return (
    <ExemplaresProvider>
      <InnerExemplaresPage />
    </ExemplaresProvider>
  )
}

function InnerExemplaresPage() {
  const { exemplares } = useExemplares()

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Link to={`/exemplares/${row.id}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={`/exemplares/${row.id}/editar`}>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="ghost" size="sm">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )

  const data = (exemplares as ExemplarInterface[] | null)?.map((e) => ({
    id: e.id,
    livro: e.nome_livro ?? e.isbn_livro,
    estado: <EstadoBadge estado={e.estado as any} />,
    anos: `${e.ano_aquisicao} - ${e.ano_descarte}`,
    disponibilidade: (
      <Badge variant="secondary">—</Badge>
    ),
  })) ?? []

  return (
    <>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Gerenciar Exemplares</h2>
                <p className="text-muted-foreground">Visualize e gerencie todos os exemplares cadastrados no sistema</p>
              </div>
              <Link to="/exemplares/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Exemplar
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Exemplares</CardTitle>
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
                      totalPages: 3,
                      onPageChange: (page) => console.log("Page:", page),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
    </>
  )
}
