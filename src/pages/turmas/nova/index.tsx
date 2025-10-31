import { ArrowLeft, Save } from "lucide-react"
import { Link } from "react-router-dom"
import { AppSidebar } from "../../../components/app-sidebar"
import { AppHeader } from "../../../components/app-header"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { FormField } from "../../../components/form-field"

const cursoOptions = [
  { value: "ensino_medio", label: "Ensino Médio" },
  { value: "ensino_fundamental", label: "Ensino Fundamental" },
  { value: "tecnico", label: "Técnico" },
]

const serieOptions = [
  { value: "1ano", label: "1º Ano" },
  { value: "2ano", label: "2º Ano" },
  { value: "3ano", label: "3º Ano" },
  { value: "4ano", label: "4º Ano" },
]

const anoLetivoOptions = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
]

export default function NovaTurmaPage() {
  return (
    <div>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link to="/turmas">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Nova Turma</h2>
                <p className="text-muted-foreground">Cadastre uma nova turma no sistema</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dados da Turma</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField id="id" label="ID" value="T005" disabled description="Gerado automaticamente" />

                    <FormField
                      id="curso"
                      label="Curso"
                      type="select"
                      options={cursoOptions}
                      placeholder="Selecione o curso"
                      required
                    />

                    <FormField
                      id="serie"
                      label="Série"
                      type="select"
                      options={serieOptions}
                      placeholder="Selecione a série"
                      required
                    />

                    <FormField
                      id="anoLetivo"
                      label="Ano Letivo"
                      type="select"
                      options={anoLetivoOptions}
                      placeholder="Selecione o ano letivo"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Link to="/turmas">
                      <Button variant="outline">Cancelar</Button>
                    </Link>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Turma
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  )
}
