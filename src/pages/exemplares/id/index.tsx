import { ArrowLeft, Edit, BookOpen } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { useViewExemplarId } from "./useViewExemplar"
import { ExemplaresProvider } from "../../../@shared/contexts/exemplares/ExemplaresProvider"
import { maskExemplarId } from "../../../utils/masks"

function Page() {
  const { id } = useParams<{ id: string }>();

  const {
    data
  } = useViewExemplarId(id ?? "")

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
              <Link to="/exemplares">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-foreground">Exemplar de {data.nome_livro}</h2>
                <p className="text-muted-foreground">ID: {maskExemplarId(data.id)}</p>
              </div>
              <Link to={`/exemplares/${data.id}/editar`}>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Exemplar Info */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Informações do Exemplar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 grid grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nome do Livro</Label>
                      <p className="text-foreground">{data.nome_livro}</p>
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
                      <Label className="text-sm font-medium text-muted-foreground">Biênio</Label>
                      <p className="text-foreground">{data.ano_aquisicao} - {data.ano_descarte}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                      <p className="text-foreground">{data.estado}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}

export default function ExemplarDetalhePage() {
  return (
    <ExemplaresProvider>
      <Page />
    </ExemplaresProvider>
  )
}