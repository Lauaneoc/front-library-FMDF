import { ArrowLeft, Edit, BookOpen, User, Calendar, FileText } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { AppSidebar } from "../../../components/app-sidebar"
import { AppHeader } from "../../../components/app-header"
import { Button } from "../../../components/ui/button"
import { StatusBadge } from "../../../components/status-badge"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { EstadoBadge } from "../../../components/estado-badge"
import { Textarea } from "../../../components/ui/textarea"
import { locacaoService } from "../../../@shared/services/locacaoService"

export default function LocacaoDetalhePage() {
  const { id } = useParams()

  const { data: rental, isLoading } = useQuery({
    queryKey: ["locacao", id],
    queryFn: () => locacaoService.getById(id as string),
    enabled: !!id,
  })

  if (isLoading) return null

  if (!rental) return <div>Locação não encontrada</div>

  const isOverdue = rental.status === "Aberto" && rental.data_prevista && new Date() > new Date(rental.data_prevista)

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
                <h2 className="text-3xl font-bold text-foreground">Locação {rental.id}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={rental.status as any} />
                  {isOverdue && <Badge variant="destructive">Em Atraso</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                {rental.status === "Aberto" && (
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
                    <p className="text-foreground">{rental.aluno || rental.matricula_aluno}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Matrícula</Label>
                    <p className="text-foreground">{rental.matricula_aluno}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Turma</Label>
                    <p className="text-foreground">-</p>
                  </div>
                  <div className="pt-2">
                    <Link to={`/alunos/${rental.matricula_aluno}`}>
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
                    <p className="text-foreground">-</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ID do Exemplar</Label>
                    <p className="text-foreground">{rental.exemplar || rental.id_exemplar}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">ISBN</Label>
                    <p className="text-foreground">-</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                    <EstadoBadge estado={"—" as any} />
                  </div>
                  <div className="pt-2">
                    <Link to={`/exemplares/${rental.exemplar || rental.id_exemplar}`}>
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
                    <p className="text-foreground">{rental.data_emprestimo || "-"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data Prevista de Devolução</Label>
                    <p className={`${isOverdue ? "text-destructive font-medium" : "text-foreground"}`}>
                      {rental.data_prevista || "-"}
                      {isOverdue && " (Em Atraso)"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data de Devolução</Label>
                    <p className="text-foreground">{rental.data_devolucao || "Não devolvido"}</p>
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
                    <p className="text-foreground">{rental.bibliotecario}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                    <p className="text-foreground">{rental.descricao}</p>
                  </div>
                  <div>
                    <Label htmlFor="observacoes" className="text-sm font-medium text-muted-foreground">
                      Observações
                    </Label>
                    <Textarea id="observacoes" placeholder="Adicione observações sobre esta locação..." value={rental.descricao || ""} className="mt-1" />
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
