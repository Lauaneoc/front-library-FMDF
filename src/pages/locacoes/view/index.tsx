import { ArrowLeft, Edit, BookOpen, User, Calendar, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { StatusBadge } from "../../../components/status-badge";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { EstadoBadge } from "../../../components/estado-badge";
import { Textarea } from "../../../components/ui/textarea";
import { useViewLocacao } from "../view/useViewLocacao";
import { LocacoesProvider } from "../../../@shared/contexts/locacoes/LocacoesProvider";

function Page() {
  const { id } = useParams<{ id: string }>();
  const { data: rental, isLoadingLocacao } = useViewLocacao(id ?? "");

  if (isLoadingLocacao) return <div>Carregando...</div>;
  if (!rental) return <div>Locação não encontrada</div>;

  const isOverdue =
    rental.status === "Aberto" &&
    rental.data_prevista &&
    new Date() > new Date(rental.data_prevista);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
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
            <h2 className="text-3xl font-bold text-foreground">
              Locação #{rental.id}
            </h2>
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
            <Link to={`/locacoes/${rental.id}/editar`}>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ALUNO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do Aluno
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nome</Label>
                <p>{rental.nome_aluno || "N/A"}</p>
              </div>
              <div>
                <Label>Matrícula</Label>
                <p>{rental.matricula_aluno || "N/A"}</p>
              </div>
              <div className="pt-2">
                <Link to={`/alunos/${rental.matricula_aluno}`}>
                  <Button variant="outline" size="sm">
                    Ver Aluno
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* EXEMPLAR */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Informações do Exemplar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>ID do Exemplar</Label>
                <p>{rental.id_exemplar || rental.exemplar || "N/A"}</p>
              </div>
              <div>
                <Label>Título</Label>
                <p>{rental.nome_livro || "N/A"}</p>
              </div>
              <div>
                <Label>ISBN</Label>
                <p>{rental.isbn_livro || "N/A"}</p>
              </div>
              <div>
                <Label>Estado</Label>
                <EstadoBadge estado={rental.exemplar?.estado as any} />
              </div>
            </CardContent>
          </Card>

          {/* DATAS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Datas da Locação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Retirada</Label>
                <p>{formatDate(rental.data_emprestimo)}</p>
              </div>
              <div>
                <Label>Devolução Prevista</Label>
                <p className={isOverdue ? "text-destructive font-medium" : ""}>
                  {formatDate(rental.data_prevista)}
                </p>
              </div>
              <div>
                <Label>Devolução Real</Label>
                <p>{formatDate(rental.data_devolucao)}</p>
              </div>
            </CardContent>
          </Card>

          {/* INFO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Bibliotecário</Label>
                <p>{rental.bibliotecario || "N/A"}</p>
              </div>
              <div>
                <Label>Observações</Label>
                <Textarea
                  readOnly
                  value={rental.descricao || ""}
                  placeholder="Sem observações"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function LocacaoDetalhePage() {
  return (
    <LocacoesProvider>
      <Page />
    </LocacoesProvider>
  );
}
