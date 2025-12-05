import { ArrowLeft, Edit } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { useViewTurma } from "./useViewTurmas"
import { TurmasProvider } from "../../../@shared/contexts/turmas/TurmasProvider"

function Page() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoadingTurma } = useViewTurma(id ?? "")

  if (isLoadingTurma) {
    return <div>Carregando...</div>
  }

  if (!data) {
    return <div>Turma não encontrada.</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          <div className="flex items-center gap-4">
            <Link to="/turmas">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>

            <div className="flex-1">
              <h2 className="text-3xl font-bold">
                {data.curso} - {data.serie}
              </h2>
              <p className="text-muted-foreground">ID: {data.id}</p>
            </div>

            <Link to={`/turmas/${data.id}/editar`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações da Turma</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">

              <div>
                <Label>Curso</Label>
                <p>{data.curso}</p>
              </div>

              <div>
                <Label>Série</Label>
                <p>{data.serie}</p>
              </div>

              <div>
                <Label>Ano Letivo</Label>
                <p>{data.ano_letivo}</p>
              </div>

            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  )
}

export default function TurmaViewPage() {
  return (
    <TurmasProvider>
      <Page />
    </TurmasProvider>
  )
}
