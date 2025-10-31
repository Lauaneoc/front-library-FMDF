import { ArrowLeft, Edit, BookOpen, Plus, Eye, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { AppSidebar } from "../../../components/app-sidebar"
import { AppHeader } from "../../../components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { TableSimple } from "../../../components/table-simple"
import { EstadoBadge } from "../../../components/estado-badge"
import { Badge } from "../../../components/ui/badge"

// Mock data
const mockBook = {
  isbn: "978-85-16-07234-5",
  nome: "Matemática - Volume 1",
  disciplina: "Matemática",
  serie: "1º Ano",
  autor: "João Silva Santos",
  editora: "Editora Moderna",
  anoPublicacao: "2023",
  totalExemplares: 15,
  exemplaresDisponiveis: 12,
}

const mockCopies = [
  {
    id: "EX001",
    estado: "Novo",
    anoInicio: "2024",
    anoFim: "2026",
    disponibilidade: "Disponível",
  },
  {
    id: "EX002",
    estado: "Regular",
    anoInicio: "2023",
    anoFim: "2025",
    disponibilidade: "Emprestado",
  },
  {
    id: "EX003",
    estado: "Danificado",
    anoInicio: "2022",
    anoFim: "2024",
    disponibilidade: "Disponível",
  },
  {
    id: "EX004",
    estado: "Regular",
    anoInicio: "2024",
    anoFim: "2026",
    disponibilidade: "Disponível",
  },
]

const copyColumns = [
  { key: "id", label: "ID" },
  { key: "livro", label: "Livro" },
  {
    key: "estado",
    label: "Estado",
  },
  { key: "anos", label: "Período" },
  {
    key: "disponibilidade",
    label: "Disponibilidade",
  },
]

export default function LivroDetalhePage() {
  const renderCopyActions = (row: any) => (
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

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link to="/livros">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground">{mockBook.nome}</h2>
                <p className="text-muted-foreground">ISBN: {mockBook.isbn}</p>
              </div>
              <Link to={`/livros/${mockBook.isbn}/editar`}>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Book Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Informações do Livro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Disciplina</Label>
                      <p className="text-foreground">{mockBook.disciplina}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Série</Label>
                      <p className="text-foreground">{mockBook.serie}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Autor</Label>
                      <p className="text-foreground">{mockBook.autor}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Editora</Label>
                      <p className="text-foreground">{mockBook.editora}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Ano de Publicação</Label>
                      <p className="text-foreground">{mockBook.anoPublicacao}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de Exemplares</span>
                      <span className="font-semibold text-foreground">{mockBook.totalExemplares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Disponíveis</span>
                      <span className="font-semibold text-primary">{mockBook.exemplaresDisponiveis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emprestados</span>
                      <span className="font-semibold text-chart-4">
                        {mockBook.totalExemplares - mockBook.exemplaresDisponiveis}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Copies Grid */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Grade de Exemplares</CardTitle>
                    <Link to={`/exemplares/novo?livro=${mockBook.isbn}`}>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Exemplar
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <TableSimple
                      columns={copyColumns}
                      data={mockCopies.map((copy) => ({
                        ...copy,
                        livro: mockBook.nome,
                        estado: <EstadoBadge estado={copy.estado as any} />,
                        anos: `${copy.anoInicio} - ${copy.anoFim}`,
                        disponibilidade: (
                          <Badge
                            variant={copy.disponibilidade === "Disponível" ? "default" : "secondary"}
                            className={
                              copy.disponibilidade === "Disponível" ? "bg-primary text-primary-foreground" : ""
                            }
                          >
                            {copy.disponibilidade}
                          </Badge>
                        ),
                      }))}
                      actions={renderCopyActions}
                      pagination={{
                        currentPage: 1,
                        totalPages: 2,
                        onPageChange: (page) => console.log("Page:", page),
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
