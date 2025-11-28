import { ArrowLeft, Edit, BookOpen, Plus, Eye, Trash2 } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { TableSimple } from "../../../components/table-simple"
import { EstadoBadge } from "../../../components/estado-badge"
import { Badge } from "../../../components/ui/badge"
import { useViewBookIsbn } from "./useViewIsbn"
import { LivrosProvider } from "../../../@shared/contexts/livros/LivrosProvider"

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

function Page() {
  const { isbn } = useParams<{ isbn: string }>();

  const {
    data
  } = useViewBookIsbn(isbn ?? "")

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

  if(!data) {
    return (
      <div>carregando...</div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
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
                <h2 className="text-3xl font-bold text-foreground">{data.nome}</h2>
                <p className="text-muted-foreground">ISBN: {data.isbn}</p>
              </div>
              <Link to={`/livros/${data.isbn}/editar`}>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Book Info */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Informações do Livro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 grid grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Disciplina</Label>
                      <p className="text-foreground">{data.disciplina}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Série</Label>
                      <p className="text-foreground">{data.serie}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Autor</Label>
                      <p className="text-foreground">{data.autor}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Editora</Label>
                      <p className="text-foreground">{data.editora}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Ano de Publicação</Label>
                      <p className="text-foreground">{data.ano_publicacao}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                {/* <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de Exemplares</span>
                      <span className="font-semibold text-foreground">{data.totalExemplares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Disponíveis</span>
                      <span className="font-semibold text-primary">{data.exemplaresDisponiveis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emprestados</span>
                      <span className="font-semibold text-chart-4">
                        {data.totalExemplares - data.exemplaresDisponiveis}
                      </span>
                    </div>
                  </CardContent>
                </Card> */}
              </div>

              {/* Copies Grid */}
              <div className="lg:col-span-2">
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Grade de Exemplares</CardTitle>
                    <Link to={`/exemplares/novo?livro=${data.isbn}`}>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Exemplar
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <TableSimple
                      columns={copyColumns}
                      data={data.map((copy: any) => ({
                        ...copy,
                        livro: data.nome,
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
                </Card> */}
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}

export default function LivroDetalhePage() {
  return (
    <LivrosProvider>
      <Page />
    </LivrosProvider>
  )
}