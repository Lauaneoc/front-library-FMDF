import { ArrowLeft, Edit, BookOpen, User, Calendar, FileText } from "lucide-react"
import { Link } from "react-router-dom"
import { AppSidebar } from "../../../components/app-sidebar"
import { AppHeader } from "../../../components/app-header"
import { Button } from "../../../components/ui/button"
import { StatusBadge } from "../../../components/status-badge"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { EstadoBadge } from "../../../components/estado-badge"
import { Textarea } from "../../../components/ui/textarea"

// Mock data
const mockRental = {
  id: "LOC001",
  status: "Aberto",
  aluno: {
    matricula: "2024001",
    nome: "Ana Silva Santos",
    turma: "1º Ano A - Ensino Médio",
  },
  exemplar: {
    id: "EX001",
    livro: "Matemática - Volume 1",
    isbn: "978-85-16-07234-5",
    estado: "Novo",
  },
  datas: {
    retirada: "15/01/2024",
    prevista: "29/01/2024",
    devolucao: null,
  },
  bibliotecario: "João Bibliotecário",
  descricao: "Locação para estudos do primeiro bimestre",
  observacoes: "",
}

export default function LocacaoDetalhePage() {
  const isOverdue = mockRental.status === "Aberto" && new Date() > new Date("2024-01-29")

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link to="/locacoes">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground">Locação {mockRental.id}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={mockRental.status as any} />
                  {isOverdue && <Badge variant="destructive">Em Atraso</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                {mockRental.status === "Aberto" && (
                  <Button>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Finalizar Locação
                  </Button>
                )}
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações do Aluno
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Nome</Label>
                    <p className="text-foreground">{mockRental.aluno.nome}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Matrícula</Label>
                    <p className="text-foreground">{mockRental.aluno.matricula}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Turma</Label>
                    <p className="text-foreground">{mockRental.aluno.turma}</p>
                  </div>
                  <div className="pt-2">
                    <Link to={`/alunos/${mockRental.aluno.matricula}`}>
                      <Button variant="outline" size="sm">
                        Ver Perfil do Aluno
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Book Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Informações do Exemplar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Livro</Label>
                    <p className="text-foreground">{mockRental.exemplar.livro}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ID do Exemplar</Label>
                    <p className="text-foreground">{mockRental.exemplar.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ISBN</Label>
                    <p className="text-foreground">{mockRental.exemplar.isbn}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                    <EstadoBadge estado={mockRental.exemplar.estado as any} />
                  </div>
                  <div className="pt-2">
                    <Link to={`/exemplares/${mockRental.exemplar.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Exemplar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Dates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Datas da Locação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data de Retirada</Label>
                    <p className="text-foreground">{mockRental.datas.retirada}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data Prevista de Devolução</Label>
                    <p className={`${isOverdue ? "text-destructive font-medium" : "text-foreground"}`}>
                      {mockRental.datas.prevista}
                      {isOverdue && " (Em Atraso)"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data de Devolução</Label>
                    <p className="text-foreground">{mockRental.datas.devolucao || "Não devolvido"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Informações Adicionais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Bibliotecário Responsável</Label>
                    <p className="text-foreground">{mockRental.bibliotecario}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                    <p className="text-foreground">{mockRental.descricao}</p>
                  </div>
                  <div>
                    <Label htmlFor="observacoes" className="text-sm font-medium text-muted-foreground">
                      Observações
                    </Label>
                    <Textarea
                      id="observacoes"
                      placeholder="Adicione observações sobre esta locação..."
                      value={mockRental.observacoes}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
