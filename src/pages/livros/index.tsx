import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { AppSidebar } from "../../components/app-sidebar"
import { AppHeader } from "../../components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { Badge } from "../../components/ui/badge"

// Mock data
const mockBooks = [
  {
    isbn: "978-85-16-07234-5",
    nome: "Matemática - Volume 1",
    disciplina: "Matemática",
    serie: "1º Ano",
    exemplares: "12/15",
    disponiveis: 12,
    total: 15,
  },
  {
    isbn: "978-85-16-07235-2",
    nome: "História do Brasil",
    disciplina: "História",
    serie: "2º Ano",
    exemplares: "8/10",
    disponiveis: 8,
    total: 10,
  },
  {
    isbn: "978-85-16-07236-9",
    nome: "Física Moderna",
    disciplina: "Física",
    serie: "3º Ano",
    exemplares: "5/8",
    disponiveis: 5,
    total: 8,
  },
  {
    isbn: "978-85-16-07237-6",
    nome: "Literatura Brasileira",
    disciplina: "Português",
    serie: "2º Ano",
    exemplares: "15/20",
    disponiveis: 15,
    total: 20,
  },
]

const columns = [
  { key: "isbn", label: "ISBN" },
  { key: "nome", label: "Nome" },
  { key: "disciplina", label: "Disciplina" },
  { key: "serie", label: "Série" },
  {
    key: "exemplares",
    label: "Exemplares (Disp./Total)",
    className: "text-center",
  },
]

const filters = [
  { key: "nome", label: "Nome", type: "text" as const },
  {
    key: "disciplina",
    label: "Disciplina",
    type: "select" as const,
    options: [
      { value: "matematica", label: "Matemática" },
      { value: "portugues", label: "Português" },
      { value: "historia", label: "História" },
      { value: "geografia", label: "Geografia" },
      { value: "fisica", label: "Física" },
      { value: "quimica", label: "Química" },
      { value: "biologia", label: "Biologia" },
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
]

export default function LivrosPage() {
  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Link to={`/livros/${row.isbn}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={`/livros/${row.isbn}/editar`}>
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
        <AppHeader title="Livros" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Gerenciar Livros</h2>
                <p className="text-muted-foreground">Visualize e gerencie todos os livros cadastrados no sistema</p>
              </div>
              <Link to="/livros/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Livro
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Livros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FiltersDrawer filters={filters} />
                  <TableSimple
                    columns={columns}
                    data={mockBooks.map((book) => ({
                      ...book,
                      exemplares: (
                        <div className="flex items-center justify-center gap-2">
                          <span>{book.exemplares}</span>
                          <Badge
                            variant={book.disponiveis > 0 ? "default" : "destructive"}
                            className={book.disponiveis > 0 ? "bg-primary text-primary-foreground" : ""}
                          >
                            {book.disponiveis > 0 ? "Disponível" : "Indisponível"}
                          </Badge>
                        </div>
                      ),
                    }))}
                    actions={renderActions}
                    pagination={{
                      currentPage: 1,
                      totalPages: 2,
                      onPageChange: (page) => console.log("Page:", page),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
